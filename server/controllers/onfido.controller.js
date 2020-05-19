import jwt from 'jsonwebtoken';
import {
  Onfido,
  Region,
  Applicant,
  OnfidoApiError,
  WebhookEventVerifier
} from '@onfido/api';
import ApplicantTemp from '../models/applicant.model';
import randomstring from 'randomstring';

const webhookToken = process.env.ONFIDO_WEBHOOK_SECRET_TOKEN;
const verifier = new WebhookEventVerifier(webhookToken);

const onfido = new Onfido({
  apiToken: process.env.ONFIDO_API_TOKEN,
  region: Region.US,
});

export async function createToken(req, res) {
  try {
    const first_name = 'John';
    const last_name = 'Doe';
    const email = 'janedoe@gmail.com';
    const token = randomstring.generate(50);

    await ApplicantTemp.forge({
      first_name,
      last_name,
      email,
      token,
    }).save();

    res.json({
      token,
    });
  } catch (e) {
    console.log(e);
  }
}

export async function init(req, res) {
  try {
    const applicantTemp = await ApplicantTemp.query({
      where: {
        token: req.params.token
      }
    }).fetch();

    if (applicantTemp) {
      const applicant = await onfido.applicant.create({
        firstName: applicantTemp.attributes.first_name,
        lastName: applicantTemp.attributes.last_name
      });
      
      const generateSdkToken = await onfido.sdkToken.generate({
        applicantId: applicant.id,
        // referrer: `https://2723bbf5.ngrok.io/process/${req.params.token}`,
        referrer: `http://${process.env.APP_HOST}:${process.env.APP_PORT}/process/${req.params.token}`
      });

      const email = applicantTemp.attributes.email;
      applicantTemp.destroy();

      res.json({
        email: email,
        applicant_id: applicant.id,
        sdk_token: generateSdkToken,
      });

    } else {
      res.status(HttpStatus.UNAUTHORIZED).json({
        success: false,
        message: 'Token was expired.',
      });
    }
    

  } catch (error) {
    if (error instanceof OnfidoApiError) {
      console.log(error.message);
      console.log(error.type);
      console.log(error.isClientError());
    } else {
      console.log(error.message);
    }
    res.json({
      error
    });
  }
}

export async function check(req, res) {
  try {
    const check = await onfido.check.create({
      applicantId: req.params.applicant_id,
      reportNames: ['document'],
    });

    res.json({
      check: check,
    });
  } catch (error) {
    if (error instanceof OnfidoApiError) {
      console.log(error.message);
      console.log(error.type);
      console.log(error.isClientError());
    } else {
      console.log(error.message);
    }
  }
}

export async function readWebhookEvent(req, res) {
  try {
    const payload = verifier.readPayload(req.rawBody, req.headers['x-sha2-signature']);
    if(payload.resourceType === 'report' && payload.action === 'report.completed'){
      res.io.sockets.emit(
        'handle result',
        {
          type: 'hook_response',
          _t: process.env.ONFIDO_API_TOKEN,
          _r: payload.object.href
        }
      );
    }
    res.send(200);
  } catch (error) {
    console.log(error);
  }
}
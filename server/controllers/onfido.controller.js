import { Onfido, Region, Applicant, OnfidoApiError } from "@onfido/api";

const onfido = new Onfido({
  apiToken: process.env.ONFIDO_API_TOKEN,
  region: Region.US
});

export async function init(req, res) {
  try {
    const applicant = await onfido.applicant.create({
      firstName: "Jane",
      lastName: "Doe"
    });

    const generateSdkToken = await onfido.sdkToken.generate({
      applicantId: applicant.id,
      // referrer: "https://77a196ae.ngrok.io/process"
      referrer: `http://${process.env.APP_HOST}:${process.env.APP_PORT}/process`
    });

    res.json({
      applicant_id: applicant.id,
      sdk_token: generateSdkToken
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
  
  res.send('onfi....');
}

export async function check(req, res){
  try{
    const check = await onfido.check.create({
      applicantId: applicant.id,
      reportNames: ["identity_enhanced"]
    });
  }catch(error){
    if (error instanceof OnfidoApiError) {
      console.log(error.message);
      console.log(error.type);
      console.log(error.isClientError());
    } else {
      console.log(error.message);
    }
  }
}

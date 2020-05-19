import express from 'express';
import * as onfido from '../controllers/onfido.controller';

const router = express.Router();

router.route('/').get((req, res) => {
  res.send('test api');
});

router.route('/create-token').get((req, res) => {
  onfido.createToken(req, res);
});

router.route('/onfido-init/:token').get((req, res) => {
  onfido.init(req, res);
});

router.route('/onfido-check/:applicant_id').get((req, res) => {
  onfido.check(req, res);
});

router.route('/onfido-hook').post((req, res) => {
  onfido.readWebhookEvent(req, res);
});

export default router;
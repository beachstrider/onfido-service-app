import express from 'express';
import * as onfido from '../controllers/onfido.controller';

const router = express.Router();

router.route('/').get((req, res) => {
  res.send('test api');
});

router.route('/onfido_init').get((req, res) => {
  onfido.init(req, res);
});

router.route('/onfido_check').get((req, res) => {
  onfido.check(req, res);
});

export default router;
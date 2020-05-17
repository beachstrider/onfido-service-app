import express from 'express';
import * as onfidoInit from '../controllers/onfidoInit.controller';

const router = express.Router();

router.route('/').get((req, res) => {
  res.send('test api');
});

router.route('/onfido_init').get((req, res) => {
  onfidoInit.init(req, res);
});

export default router;
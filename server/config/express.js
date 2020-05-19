import express from 'express';
import bodyParser from 'body-parser';
import morgan from 'morgan';
import cors from 'cors';
import helmet from 'helmet';
import compression from 'compression';
import methodOverride from 'method-override';
import constant from '../config/directory';

import http from 'http';
import socketIo from 'socket.io';

require('dotenv').config();

const app = express();

const server = http.createServer(app);
const io = socketIo(server);
server.listen(process.env.APP_PORT || 5000);

io.on('connection', socket => {
  console.log('User connected');
  socket.on('disconnect', () => {
    console.log('User disconnected');
  });
});


app.set('port', process.env.APP_PORT || 5000);
app.set('host', process.env.APP_HOST || 'localhost');

app.use(express.static(constant.distDir));

app.use(cors());
app.use(helmet());
app.use(compression());
app.use(methodOverride());

app.use((req, res, next) => {
  res.io = io;
  next();
});

app.use(
  bodyParser.json({
    verify: (req, res, buf, encoding) => {
      if (buf && buf.length) {
        req.rawBody = buf.toString(encoding || 'utf8');
      }
    },
  })
);

app.use(morgan('dev'));
app.use(express.static(constant.assetsDir));

export default app;

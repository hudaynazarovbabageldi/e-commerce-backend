const express = require('express');
const helmet = require('helmet');
const cors = require('cors');
const app = express();
const morgan = require('morgan');
const swaggerUI = require('swagger-ui-express');
const swaggerJsDoc = require('swagger-jsdoc');
const errorHandling = require('./utils/errorHandling');

const swaggerOptions = require('./swaggers/index.js');
const specs = swaggerJsDoc(swaggerOptions);
app.use('/api-docs', swaggerUI.serve, swaggerUI.setup(specs));

app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(morgan('dev'));
app.use(helmet());
app.use(cors({ credentials: true, origin: '*' }));
app.use('/static', express.static('public'));

app.use('/api/admin', require('./routes/admin/adminRouter'));
app.use('/api/public', require('./routes/public/publicRouter'));

app.all('*', (req, res) => {
  res.status(404).json({
    status: 'failed',
    message: `Can't find ${req.originalUrl ? req.originalUrl : 'Request'} on this server.`,
  });
});

app.use(errorHandling);

module.exports = app;

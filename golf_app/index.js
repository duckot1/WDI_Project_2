const express     = require('express');
const app         = express();
const morgan      = require('morgan');
const mongoose    = require('mongoose');
const bodyParser  = require('body-parser');
const cors        = require('cors');
const routes      = require('./config/routes');
const webRoutes   = require('./config/webRoutes');
const config      = require('./config/config');
const expressJWT  = require('express-jwt');

mongoose.connect(config.db);

app.use(express.static(`${__dirname}/public`));
app.use(morgan('dev'));
app.use(cors());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use('/api', expressJWT({ secret: config.secret })
  .unless({
    path: [
      { url: '/api/login', methods: ['POST'] },
      { url: '/api/register', methods: ['POST'] }
    ]
  }));
app.use('/api', routes);
app.use('/', webRoutes);

app.listen(config.port, console.log(`Server has stated on port: ${config.port}`));

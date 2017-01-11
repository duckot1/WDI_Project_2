const express     = require('express');
const app         = express();
const morgan      = require('morgan');
const mongoose    = require('mongoose');
const bodyParser  = require('body-parser');
const cors        = require('cors');
const routes      = require('./config/routes');
const webRoutes   = require('./config/webRoutes');
const port        = process.env.PORT || 3000;

const databaseURL = process.env.MONGOLAB_URL || 'mongodb://localhost:27017/golf-app';
mongoose.connect(databaseURL);

app.use(express.static(`${__dirname}/public`));
app.use(morgan('dev'));
app.use(cors());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use('/api', routes);
app.use('/', webRoutes);

app.listen(port, console.log(`Server has stated on port: ${port}`));

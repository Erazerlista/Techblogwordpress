//added debug feature
const express = require('express');
const session = require('express-session');
const exphbs = require('express-handlebars');
const helpers = require('./utils/helpers');
const path = require('path');
const routes = require('./controllers');
const sequelize = require('./config/connection');
const SequelizeStore = require('connect-session-sequelize')(session.Store);
const debug = require('debug')('app:server'); 

const app = express();
const PORT = process.env.PORT || 3306;

const sess = {
  secret: 'Secret',
  cookie: {},
  resave: false,
  saveUninitialized: true,
  store: new SequelizeStore({
    db: sequelize
  })
};

// Set up Handlebars.js engine with custom helpers
const hbs = exphbs.create({ helpers });

app.engine('handlebars', hbs.engine);
app.set('view engine', 'handlebars');

app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(express.static(path.join(__dirname, 'public')));
app.use(session(sess));
app.use(routes);

sequelize.sync().then(() => {
  app.listen(PORT, () => {
    debug(`Server is running on port ${PORT}.`);
  });
});

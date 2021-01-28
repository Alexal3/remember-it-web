const express = require('express');
const path = require('path');
const exphbs = require('express-handlebars');
const session = require('express-session');

const homeRouter = require('./routes/homeRouter');
const faqRouter = require('./routes/faqRouter');
const notesRouter = require('./routes/notesRouter');

const keys = require('./keys');

const app = express();

const hbs = exphbs.create({
  defaultLayout: 'main',
  extname: 'hbs'
});

app.engine('hbs', hbs.engine);
app.set('view engine', 'hbs');
app.set('views', 'views');

app.use(express.static(path.join(__dirname, 'public')));
app.use(session({
  secret: keys.SESSION_SECRET,
  saveUninitialized: false
}));

app.use((req, res, next) => {
  res.session.isAuthenticated = true;

  next();
});

app.use('/', homeRouter);
app.use('/faq', faqRouter);
app.use('/notes', notesRouter);

app.use((req, res, next) => {
  res.status(404).send("Not Found");
});

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
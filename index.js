const express = require('express');
const path = require('path');
const exphbs = require('express-handlebars');
// const session = require('express-session');

const indexRoutes = require('./routes/indexRouter');
// const faqRouter = require('./routes/faqRouter');
const notesRoutes = require('./routes/notesRouter');
const archiveRoutes = require('./routes/archiveRouter');
const binRoutes = require('./routes/binRouter');
const registerRoutes = require('./routes/registerRouter');
const addNoteRoutes = require('./routes/addNoteRouter');
const changeNoteRoutes = require('./routes/changeNoteRouter');

// const keys = require('./keys');

const app = express();

// hbs.create({
//   extname: 'hbs'
// });

const hbs = exphbs.create({
  defaultLayout: 'main',
  extname: 'hbs'
});

app.engine('hbs', hbs.engine);
app.set('view engine', 'hbs');
app.set('views', 'views');

app.use(express.static(path.join(__dirname, 'public')));
app.use(express.urlencoded({extended: true}));

app.use('/', indexRoutes);
app.use('/notes', notesRoutes);
app.use('/archive', archiveRoutes);
app.use('/bin', binRoutes);
app.use('/register', registerRoutes);
app.use('/add-note', addNoteRoutes);
app.use('/change-note', changeNoteRoutes);
// app.use(session({
//   secret: keys.SESSION_SECRET,
//   saveUninitialized: false
// }));

// app.use((req, res, next) => {
//   res.session.isAuthenticated = true;

//   next();
// });

// app.use((req, res, next) => {
//   res.status(404).send("Not Found");
// });

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
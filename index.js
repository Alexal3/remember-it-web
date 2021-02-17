const express = require('express');
const Handlebars = require('handlebars');
const path = require('path');
const mongoose = require('mongoose');
const exphbs = require('express-handlebars');
const {allowInsecurePrototypeAccess} = require('@handlebars/allow-prototype-access');
const User = require('./models/user');
// const session = require('express-session');

const indexRoutes = require('./routes/indexRouter');
// const faqRouter = require('./routes/faqRouter');
const notesRoutes = require('./routes/notesRouter');
const archiveRoutes = require('./routes/archiveRouter');
const binRoutes = require('./routes/binRouter');
const registerRoutes = require('./routes/registerRouter');
const addNoteRoutes = require('./routes/addNoteRouter');
const changeNoteRoutes = require('./routes/changeNoteRouter');
const archiveNoteRoutes = require('./routes/archiveNoteRouter');
const unarchiveNoteRoutes = require('./routes/unarchiveNoteRouter');
const deleteNoteRoutes = require('./routes/deleteNoteRouter');
const deleteForeverNoteRoutes = require('./routes/deleteForeverNoteRouter');
const restoreNoteRoutes = require('./routes/restoreNoteRouter');
const clearBinRoutes = require('./routes/clearBinRouter');

// const keys = require('./keys');

const app = express();

// hbs.create({
//   extname: 'hbs'
// });

const hbs = exphbs.create({
  defaultLayout: 'main',
  extname: 'hbs',
  handlebars: allowInsecurePrototypeAccess(Handlebars)
});

app.engine('hbs', hbs.engine);
app.set('view engine', 'hbs');
app.set('views', 'views');

app.use(async (req, res, next) => {
  try {
    const user = await User.findById('602d213d4870cd3b1cd88f03')
    req.user = user;
    next();
  } catch (err) {
    console.log(err);
  }
});

app.use(express.static(path.join(__dirname, 'public')));
app.use(express.urlencoded({extended: true}));

app.use('/', indexRoutes);
app.use('/notes', notesRoutes);
app.use('/archive', archiveRoutes);
app.use('/bin', binRoutes);
app.use('/register', registerRoutes);
app.use('/add-note', addNoteRoutes);
app.use('/change-note', changeNoteRoutes);
app.use('/archive-note', archiveNoteRoutes);
app.use('/unarchive-note', unarchiveNoteRoutes);
app.use('/delete-note', deleteNoteRoutes);
app.use('/delete-forever-note', deleteForeverNoteRoutes);
app.use('/restore-note', restoreNoteRoutes);
app.use('/clear-bin', clearBinRoutes);
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

async function start() {
  try {
    const url = 'mongodb+srv://user1:k6SANOBkaR3aG6MQ@cluster0.rbhru.mongodb.net/notes?retryWrites=true&w=majority';
    await mongoose.connect(url, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
      useFindAndModify: false
    });
    app.listen(PORT, () => {
      console.log(`Server is running on port ${PORT}`);
    });
  } catch (err) {
    console.log(err);
  }
}

start();
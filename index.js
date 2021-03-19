const compression = require('compression');
const express = require('express');
const Handlebars = require('handlebars');
const path = require('path');
const sequelize = require('./utils/database');
const csrf = require('csurf');
const exphbs = require('express-handlebars');
const {allowInsecurePrototypeAccess} = require('@handlebars/allow-prototype-access');
const session = require('express-session');
const MySQLStore = require('express-mysql-session')(session);
const User = require('./models/user');
const varMiddleware = require('./middleware/variables');
const userMiddleware = require('./middleware/user');
const error404Handler = require('./middleware/404');
const keys = require('./keys');

const indexRoutes = require('./routes/indexRouter');
// const faqRouter = require('./routes/faqRouter');
const notesRoutes = require('./routes/notesRouter');
const archiveRoutes = require('./routes/archiveRouter');
const binRoutes = require('./routes/binRouter');
const registerRoutes = require('./routes/registerRouter');
const loginRoutes = require('./routes/loginRouter');
const logoutRoutes = require('./routes/logoutRouter');
const addNoteRoutes = require('./routes/addNoteRouter');
const changeNoteRoutes = require('./routes/changeNoteRouter');
const archiveNoteRoutes = require('./routes/archiveNoteRouter');
const unarchiveNoteRoutes = require('./routes/unarchiveNoteRouter');
const deleteNoteRoutes = require('./routes/deleteNoteRouter');
const deleteForeverNoteRoutes = require('./routes/deleteForeverNoteRouter');
const restoreNoteRoutes = require('./routes/restoreNoteRouter');
const clearBinRoutes = require('./routes/clearBinRouter');
const resetPasswordRoutes = require('./routes/resetPasswordRouter');
const profileRoutes = require('./routes/profileRouter');

const app = express();
// hbs.create({
//   extname: 'hbs'
// });
const hbs = exphbs.create({
  defaultLayout: 'main',
  extname: 'hbs',
  handlebars: allowInsecurePrototypeAccess(Handlebars)
});

const sessionStore = new MySQLStore({
  host: keys.DB_HOST,
	port: keys.DB_PORT,
	user: keys.DB_USER_NAME,
	password: keys.DB_PASSWORD,
	database: keys.DB_NAME
});

app.engine('hbs', hbs.engine);
app.set('view engine', 'hbs');
app.set('views', 'views');

// app.use(async (req, res, next) => {
//   try {
//     const user = await User.findById('602d213d4870cd3b1cd88f03');
//     req.user = user;
//     next();
//   } catch (err) {
//     console.log(err);
//   }
// });

app.use(express.static(path.join(__dirname, 'public')));
app.use('/avatars', express.static(path.join(__dirname, 'avatars')));
app.use(express.urlencoded({extended: true}));
app.use(session({
  secret: keys.SESSION_SECRET,
  resave: false,
  saveUninitialized: false,
  store: sessionStore
}));
app.use(csrf());
app.disable("x-powered-by");
app.use(compression());
app.use(varMiddleware);
app.use(userMiddleware);

app.use('/', indexRoutes);
app.use('/notes', notesRoutes);
app.use('/archive', archiveRoutes);
app.use('/bin', binRoutes);
app.use('/register', registerRoutes);
app.use('/login', loginRoutes);
app.use('/logout', logoutRoutes);
app.use('/add-note', addNoteRoutes);
app.use('/change-note', changeNoteRoutes);
app.use('/archive-note', archiveNoteRoutes);
app.use('/unarchive-note', unarchiveNoteRoutes);
app.use('/delete-note', deleteNoteRoutes);
app.use('/delete-forever-note', deleteForeverNoteRoutes);
app.use('/restore-note', restoreNoteRoutes);
app.use('/clear-bin', clearBinRoutes);
app.use('/reset', resetPasswordRoutes);
app.use('/profile', profileRoutes);

app.use(error404Handler);

// app.use((req, res, next) => {
//   res.session.isAuthenticated = true;

//   next();
// });

const PORT = process.env.PORT || 3000;

async function start() {
  try {
    await sequelize.sync();
    app.listen(PORT, () => {
      console.log(`Server is running on port ${PORT}`);
    });
  } catch (err) {
    console.log(err);
  }
}

start();
const express = require('express');
const path = require('path');
// const session = require('express-session');

const indexRoutes = require('./routes/indexRouter');
// const faqRouter = require('./routes/faqRouter');
const notesRoutes = require('./routes/notesRouter');
const registerRoutes = require('./routes/registerRouter');

// const keys = require('./keys');

const app = express();

// hbs.create({
//   extname: 'hbs'
// });

app.use(express.static(path.join(__dirname, 'public')));
app.use(express.urlencoded({extended: true}));

app.use('/', indexRoutes);
app.use('/notes', notesRoutes);
app.use('/register', registerRoutes);
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
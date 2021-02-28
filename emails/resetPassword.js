const keys = require('../keys');

module.exports = function(email, token) {
  return {
    to: email,
    from: keys.EMAIL_FROM,
    subject: 'Сброс пароля',
    html: `
      <h1>Сброс пароля</h1>
      <p>Если вы не запрашивали сброс пароля, то просто проигнорируйте это письмо.</p>
      <p>Иначе нажмите на ссылку ниже:</p>
      <p><a href="${keys.BASE_URL}/reset/${token}">Сбросить пароль</a></p>
      <hr>
      <a href="${keys.BASE_URL}">Remember it!</a>
    `
  };
}
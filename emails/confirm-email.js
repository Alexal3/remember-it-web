const keys = require('../keys');

module.exports = function(email, token) {
  return {
    from: keys.EMAIL_FROM,
    to: email,
    subject: 'Подтвердите свою почту',
    html: `
      <h1>Подтвердите, пожалуйста, свою электронную почту</h1>
      <p>Вы получили это письмо, потому что вы или кто-то другой указал эту почту при регистрации на сервисе <a href="${keys.BASE_URL}">Remember it!</a></p>
      <p>Если это были не вы, то просто проигнорируйте это письмо.</p>
      <p>Иначе нажмите на ссылку ниже:</p>
      <p><a href="${keys.BASE_URL}/register/confirm-email/${token}">Подтвердить</a></p>
      <hr>
      <a href="${keys.BASE_URL}">Remember it!</a>
    `
  };
}
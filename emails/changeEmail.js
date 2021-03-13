const keys = require('../keys');

module.exports = function(newEmail, oldEmail, token) {
  return {
    to: newEmail,
    from: keys.EMAIL_FROM,
    subject: 'Смена адреса эл. почты',
    html: `
      <h1>Смена адреса электронной почты</h1>
      <p>Вы получили это письмо, потому что вы или кто-то другой пытается изменить адрес электронной почты аккаунта для веб-сервиса <a href="${keys.BASE_URL}">Remember it!</a></p>
      <p>Старый адрес электронной почты - ${oldEmail}.</p>
      <p>Если вы не зарегистрированы на этом сервисе или старый адрес не ваш, то письмо пришло к вам по ошибке. Просто проигнорируйте его.</p>
      <p>Иначе нажмите на ссылку ниже:</p>
      <p><a href="${keys.BASE_URL}/profile/new-email/${token}">Подтвердить новую почту</a></p>
      <p>Ссылка действительна 1 час.</p>
      <hr>
      <a href="${keys.BASE_URL}">Remember it!</a>
    `
  };
}
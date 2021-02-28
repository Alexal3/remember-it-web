const token = document.querySelector('meta[name="csrf-token"]').getAttribute('content');

document.querySelector('.btn-reg').addEventListener('click', () => {
  if (document.querySelector('#reg_password').value !== document.querySelector('#reg_password_confirm').value) {
    alert('Пароли не совпадают');
    return;
  }

  fetch('/register', {
    method: 'post',
    headers: {
      'Content-Type': 'application/json;charset=utf-8',
      'CSRF-Token': token
    },
    body: JSON.stringify({
      email: document.querySelector('#reg_email').value,
      password: document.querySelector('#reg_password').value
    })
  })
  .then(res => res.json())
  .then(result => {
    if (result.status === 'error') alert(`Ошибка: ${result.description}`);
    if (result.status === 'success') location.pathname = '/notes';
  })
  .catch(err => alert(`Ошибка: ${err}`));
});

document.querySelector('.btn-login').addEventListener('click', () => {
  fetch('/login', {
    method: 'post',
    headers: {
      'Content-Type': 'application/json;charset=utf-8',
      'CSRF-Token': token
    },
    body: JSON.stringify({
      email: document.querySelector('#login_email').value,
      password: document.querySelector('#login_password').value
    })
  })
  .then(res => res.json())
  .then(result => {
    if (result.status === 'error') alert(`Ошибка: ${result.description}`);
    if (result.status === 'success') location.pathname = '/notes';
  })
  .catch(err => alert(`Ошибка: ${err}`));
});

document.querySelector('.btn-reset-password').addEventListener('click', () => {
  fetch('/reset', {
    method: 'post',
    headers: {
      'Content-Type': 'application/json;charset=utf-8',
      'CSRF-Token': token
    },
    body: JSON.stringify({
      email: document.querySelector('#reset_password_email').value
    })
  })
  .then(res => res.json())
  .then(result => {
    if (result.status === 'error') alert(`Ошибка: ${result.description}`);
    if (result.status === 'success') alert('Письмо со ссылкой для изменения пароля отправлено на указанную почту.');
  })
  .catch(err => alert(`Ошибка: ${err}`));
});
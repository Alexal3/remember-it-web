const token = document.querySelector('meta[name="csrf-token"]').getAttribute('content');

const btnReg = document.querySelector('.btn-reg');

if (btnReg) {
  btnReg.addEventListener('click', () => {
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
        password: document.querySelector('#reg_password').value,
        passwordConfirm: document.querySelector('#reg_password_confirm').value
      })
    })
    .then(res => res.json())
    .then(result => {
      if (result.status === 'error') alert(`Ошибка: ${result.description}`);
      if (result.status === 'success') alert('На почту выслано письмо для подтверждения.');
    })
    .catch(err => alert(`Ошибка: ${err}`));
  });
}

const btnLogin = document.querySelector('.btn-login');

if (btnLogin) {
  btnLogin.addEventListener('click', () => {
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
      if (result.status === 'error') {
        alert(`Ошибка: ${result.description}`);
      }

      if (result.code === 'EMAIL_NOT_CONFIRMED') {
        let sendEmail = confirm('Выслать ссылку подтверждения на почту еще раз?');

        if (sendEmail) {
          fetch('/register/send-confirm-email', {
            method: 'post',
            headers: {
              'Content-Type': 'application/json;charset=utf-8',
              'CSRF-Token': token
            },
            body: JSON.stringify({
              email: document.querySelector('#login_email').value
            })
          })
          .then(res => res.json())
          .then(result => {
            if (result.status === 'error') {
              alert(`Ошибка: ${result.description}`);
            }

            if (result.status === 'success') {
              alert('Письмо успешно выслано');
            }
          })
          .catch(err => alert(`Ошибка: ${err}`));
        }
      }

      if (result.status === 'success') location.pathname = '/notes';
    })
    .catch(err => alert(`Ошибка: ${err}`));
  });
}

const btnResetPassword = document.querySelector('.btn-reset-password');

if (btnResetPassword) {
  btnResetPassword.addEventListener('click', () => {
    fetch('/reset', {
      method: 'put',
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
}

const btnResetPasswordDone = document.querySelector('.btn-reset-password-done');

if (btnResetPasswordDone) {
  btnResetPasswordDone.addEventListener('click', () => {
    fetch('/reset/set-new-password', {
      method: 'put',
      headers: {
        'Content-Type': 'application/json;charset=utf-8',
        'CSRF-Token': token
      },
      body: JSON.stringify({
        password: document.querySelector('#password').value,
        passwordConfirm: document.querySelector('#password_confirm').value,
        userId: document.querySelector('input[name="userId"]').value,
        token: document.querySelector('input[name="token"]').value
      })
    })
    .then(res => res.json())
    .then(result => {
      if (result.status === 'error') alert(`Ошибка: ${result.description}`);
      if (result.status === 'success') {
        alert('Пароль изменен! Можете авторизоваться.');
        location.pathname = '/';
      }
    })
    .catch(err => alert(`Ошибка: ${err}`));
  });
}
const tokenCSRF = document.querySelector('meta[name="csrf-token"]').getAttribute('content');

const btnSaveAvatar = document.querySelector('#btn_save_avatar');
const btnDeleteAvatar = document.querySelector('#btn_delete_avatar');
const btnSaveEmail = document.querySelector('#btn_save_email');
const btnSavePassword = document.querySelector('#btn_save_password');

btnSaveAvatar.addEventListener('click', () => {
  document.querySelector('#avatar_progress').classList.remove('hide');

  const formData = new FormData();
  formData.append('avatar', document.querySelector('#input_new_avatar').files[0]);

  fetch('/profile/new-avatar', {
    method: 'post',
    headers: {
      'CSRF-Token': tokenCSRF
    },
    body: formData
  })
  .then(res => res.json())
  .then(result => {
    if (result.status === 'error') {
      document.querySelector('#avatar_progress').classList.add('hide');
      alert(`Ошибка: ${result.description}`);
    }
    if (result.status === 'success') {
      document.querySelector('#avatar_progress').classList.add('hide');
      document.querySelector('#avatar_profile').src = result.avatarURL;
      document.querySelector('#avatar_sidenav').src = result.avatarURL;
      document.querySelector('#btn_delete_avatar').classList.remove('disabled');
    }
  })
  .catch(err => alert(`Ошибка: ${err}`));
});

btnDeleteAvatar.addEventListener('click', () => {
  document.querySelector('#avatar_progress').classList.remove('hide');

  fetch('/profile/delete-avatar', {
    method: 'delete',
    headers: {
      'Content-Type': 'application/json;charset=utf-8',
      'CSRF-Token': tokenCSRF
    },
    body: JSON.stringify({
      userId: document.querySelector('input[name="userId"]').value
    })
  })
  .then(res => res.json())
  .then(result => {
    if (result.status === 'error') {
      document.querySelector('#avatar_progress').classList.add('hide');
      alert(`Ошибка: ${result.description}`);
    }
    if (result.status === 'success') {
      document.querySelector('#avatar_progress').classList.add('hide');
      document.querySelector('#avatar_profile').src = '/male.png';
      document.querySelector('#avatar_sidenav').src = '/male.png';
      document.querySelector('#btn_delete_avatar').classList.add('disabled');
    };
  })
  .catch(err => alert(`Ошибка: ${err}`));
});

btnSaveEmail.addEventListener('click', () => {
  document.querySelector('#email_progress').classList.remove('hide');

  fetch('/profile/new-email', {
    method: 'post',
    headers: {
      'Content-Type': 'application/json;charset=utf-8',
      'CSRF-Token': tokenCSRF
    },
    body: JSON.stringify({
      userId: document.querySelector('input[name="userId"]').value,
      email: document.querySelector('#email').value
    })
  })
  .then(res => res.json())
  .then(result => {
    if (result.status === 'error') {
      document.querySelector('#email_progress').classList.add('hide');
      alert(`Ошибка: ${result.description}`);
    }
    if (result.status === 'success') {
      document.querySelector('#email_progress').classList.add('hide');
      alert('Письмо со ссылкой для подтверждения отправлено на указанную почту.');
    }
  })
  .catch(err => alert(`Ошибка: ${err}`));
});

btnSavePassword.addEventListener('click', () => {
  document.querySelector('#password_progress').classList.remove('hide');

  fetch('/profile/new-password', {
    method: 'post',
    headers: {
      'Content-Type': 'application/json;charset=utf-8',
      'CSRF-Token': tokenCSRF
    },
    body: JSON.stringify({
      userId: document.querySelector('input[name="userId"]').value,
      oldPassword: document.querySelector('#old_password').value,
      newPassword: document.querySelector('#new_password').value,
      confirmPassword: document.querySelector('#confirm_password').value
    })
  })
  .then(res => res.json())
  .then(result => {
    if (result.status === 'error') {
      document.querySelector('#password_progress').classList.add('hide');
      alert(`Ошибка: ${result.description}`);
    }
    if (result.status === 'success') {
      document.querySelector('#password_progress').classList.add('hide');
      alert('Пароль успешно изменен!');
      document.querySelector('#old_password').value = '';
      document.querySelector('#new_password').value = '';
      document.querySelector('#confirm_password').value = '';
      document.querySelector('#old_password').classList.remove('valid');
      document.querySelector('#new_password').classList.remove('valid');
      document.querySelector('#confirm_password').classList.remove('valid');
      document.querySelector('#old_password + label').classList.remove('active');
      document.querySelector('#new_password + label').classList.remove('active');
      document.querySelector('#confirm_password + label').classList.remove('active');
    }
  })
  .catch(err => alert(`Ошибка: ${err}`));
});
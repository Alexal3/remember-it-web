document.querySelector('#button_create_note_example').addEventListener('click', () => {
  // if (document.querySelector('#create_note').value === '') {
  //   document.querySelector('#create_note').classList.add('invalid');
  //   return;
  // }

  document.querySelector('#note_example .card-content .card-title').textContent = document.querySelector('#create_note_title').value;
  document.querySelector('#note_example .card-content p').textContent = document.querySelector('#create_note').value;
  document.querySelector('#note_example').classList.remove('hide');
  document.querySelector('#create_note_title').value = '';
  document.querySelector('#create_note_title + label').classList.remove('active');
  document.querySelector('#create_note').value = '';
  document.querySelector('#create_note + label').classList.remove('active');

  document.querySelector('#note_example_done').classList.add('hide');
  document.querySelector('#note_example_edit').classList.remove('hide');
  document.querySelector('#note_title_example').value = '';
  document.querySelector('#note_content_example').value = '';
  document.querySelectorAll('#note_example .card-content .input-field')[0].classList.add('hide');
  document.querySelectorAll('#note_example .card-content .input-field')[1].classList.add('hide');
  document.querySelector('#note_example .card-content .card-title').classList.remove('hide');
  document.querySelector('#note_example .card-content p').classList.remove('hide');

  if (document.querySelector('#note_example .card-content .card-title').textContent === '' && document.querySelector('#note_example .card-content p').textContent === '') {
    document.querySelector('#note_example .card-content .empty_note_text').classList.remove('hide');
  }
});

document.querySelector('#note_example_edit').addEventListener('click', () => {
  document.querySelector('#note_example .card-content .card-title').classList.add('hide');
  document.querySelector('#note_example .card-content p').classList.add('hide');
  document.querySelectorAll('#note_example .card-content .input-field')[0].classList.remove('hide');
  document.querySelectorAll('#note_example .card-content .input-field')[1].classList.remove('hide');
  document.querySelector('#note_title_example').value = document.querySelector('#note_example .card-content .card-title').innerHTML;
  document.querySelector('#note_content_example').value = document.querySelector('#note_example .card-content p').innerHTML;

  document.querySelector('#note_example .card-content .empty_note_text').classList.add('hide');
  document.querySelector('#note_example_edit').classList.add('hide');
  document.querySelector('#note_example_done').classList.remove('hide');
  document.querySelector('#note_example_cancel').classList.remove('hide');
});

document.querySelector('#note_example_delete').addEventListener('click', () => {
  document.querySelector('#note_example .card-content .card-title').textContent = '';
  document.querySelector('#note_example .card-content p').textContent = '';
  document.querySelector('#note_example_edit').classList.remove('hide');
  document.querySelector('#note_example_done').classList.add('hide');
  document.querySelector('#note_example .card-content .empty_note_text').classList.add('hide');
  document.querySelector('#note_example').classList.add('hide');
});


document.querySelector('#note_example_done').addEventListener('click', () => {
  document.querySelector('#note_example .card-content .card-title').textContent = document.querySelector('#note_title_example').value;
  document.querySelector('#note_example .card-content p').textContent = document.querySelector('#note_content_example').value;
  document.querySelector('#note_example .card-content .card-title').classList.remove('hide');
  document.querySelector('#note_example .card-content p').classList.remove('hide');

  if (document.querySelector('#note_title_example').value === '' && document.querySelector('#note_content_example').value === '') {
    document.querySelector('#note_example .card-content .empty_note_text').classList.remove('hide');
  }

  if (document.querySelector('#note_title_example').value !== '' && document.querySelector('#note_content_example').value !== '') {
    document.querySelector('#note_example .card-content .empty_note_text').classList.add('hide');
  }

  document.querySelector('#note_title_example').value = '';
  document.querySelector('#note_content_example').value = '';
  document.querySelectorAll('#note_example .card-content .input-field')[0].classList.add('hide');
  document.querySelectorAll('#note_example .card-content .input-field')[1].classList.add('hide');

  document.querySelector('#note_example_edit').classList.remove('hide');
  document.querySelector('#note_example_cancel').classList.add('hide');
  document.querySelector('#note_example_done').classList.add('hide');
});

document.querySelector('#note_example_cancel').addEventListener('click', () => {
  if (document.querySelector('#note_example .card-content .card-title').innerHTML === '' && document.querySelector('#note_example .card-content p').innerHTML === '') {
    document.querySelector('#note_example .card-content .empty_note_text').classList.remove('hide');
  } else {
    document.querySelector('#note_example .card-content .card-title').classList.remove('hide');
    document.querySelector('#note_example .card-content p').classList.remove('hide');
  }

  document.querySelectorAll('#note_example .card-content .input-field')[0].classList.add('hide');
  document.querySelectorAll('#note_example .card-content .input-field')[1].classList.add('hide');
  
  document.querySelector('#note_example_done').classList.add('hide');
  document.querySelector('#note_example_cancel').classList.add('hide');
  document.querySelector('#note_example_edit').classList.remove('hide');
});
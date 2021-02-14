function notesStartEdit(noteId) {
  let card = document.querySelector(`#card-id-${noteId}`);

  card.querySelector('.card-content .card-title').classList.add('hide');
  card.querySelector('.card-content p').classList.add('hide');

  card.querySelectorAll('.card-content .input-field')[0].classList.remove('hide');
  card.querySelectorAll('.card-content .input-field')[1].classList.remove('hide');

  // card.querySelector(`#note_title_edit_${noteId}`).value = card.querySelector('.card-content .card-title').innerHTML;
  // card.querySelector(`#note_content_edit_${noteId}`).value = card.querySelector('.card-content p').innerHTML;

  card.querySelector('.card-content .empty_note_text').classList.add('hide');

  card.querySelector('.btn-edit').classList.add('hide');
  card.querySelector('.btn-done').classList.remove('hide');
  card.querySelector('.btn-cancel').classList.remove('hide');
}

function notesCancelEdit(noteId) {
  let card = document.querySelector(`#card-id-${noteId}`);

  card.querySelector('.card-content .card-title').classList.remove('hide');
  card.querySelector('.card-content p').classList.remove('hide');

  card.querySelectorAll('.card-content .input-field')[0].classList.add('hide');
  card.querySelectorAll('.card-content .input-field')[1].classList.add('hide');

  // card.querySelector('.card-content .empty_note_text').classList.add('hide');

  card.querySelector('.btn-edit').classList.remove('hide');
  card.querySelector('.btn-done').classList.add('hide');
  card.querySelector('.btn-cancel').classList.add('hide');
}
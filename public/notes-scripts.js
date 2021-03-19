function notesStartEdit(noteId) {
  let card = document.querySelector(`#card-id-${noteId}`);

  card.querySelector('.card-content .card-title').classList.add('hide');
  card.querySelector('.card-content p').classList.add('hide');

  card.querySelectorAll('.card-content .input-field')[0].classList.remove('hide');
  card.querySelectorAll('.card-content .input-field')[1].classList.remove('hide');

  card.querySelector(`#note_title_edit_${noteId}`).value = card.querySelector('.card-content .card-title').innerHTML;
  card.querySelector(`#note_content_edit_${noteId}`).value = card.querySelector('.card-content p').innerHTML;

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

  if (card.querySelector('.card-content .card-title').innerHTML === '' && card.querySelector('.card-content p').innerHTML === '') {
    card.querySelector('.card-content .empty_note_text').classList.remove('hide');
  }

  card.querySelector('.btn-edit').classList.remove('hide');
  card.querySelector('.btn-done').classList.add('hide');
  card.querySelector('.btn-cancel').classList.add('hide');
}

document.addEventListener('DOMContentLoaded', () => {
  let notes = document.querySelectorAll('.note');

  for (const note of notes) {
    if (note.querySelector('.card-content .card-title').innerHTML === '' && note.querySelector('.card-content p').innerHTML === '') {
      note.querySelector('.empty_note_text').classList.remove('hide');
    }
  }
});

if (document.forms.formClearBin) {
  document.forms.formClearBin.addEventListener('submit', (event) => {
    if (!confirm('Вы уверены?')) event.preventDefault();
  });
}

if (document.forms.handleNotesInBin) {
  const form = document.forms.handleNotesInBin;

  form.addEventListener('submit', (event) => {
    if (event.submitter.name === 'toDeleteForever' && event.submitter.value === 'true') {
      if (!confirm('Вы уверены?')) event.preventDefault();
    }
  });
}

const token = document.querySelector('meta[name="csrf-token"]').getAttribute('content');

let $createNotePanel = document.querySelector('#create_note_panel');

if ($createNotePanel) {
  $createNotePanel.addEventListener('click', event => {
    if (event.target.closest('.btn-new-note-done')) {
      fetch('/add-note', {
        method: 'post',
        headers: {
          'Content-Type': 'application/json;charset=utf-8',
          'CSRF-Token': token
        },
        body: JSON.stringify({
          title: document.querySelector('#create_note_title').value,
          body: document.querySelector('#create_note').value
        })
      })
      .then(res => res.json())
      .then(note => {
        let cardWithTitleCreateFirstNote = document.querySelector('#card_with_title_create_first_note');
        if (cardWithTitleCreateFirstNote) cardWithTitleCreateFirstNote.classList.add('hide');
        document.querySelector('#create_note_title').value = '';
        document.querySelector('#create_note_title + label').classList.remove('active');
        document.querySelector('#create_note').value = '';
        document.querySelector('#create_note + label').classList.remove('active');

        document.querySelector('#notes-container').insertAdjacentHTML('afterbegin', `
          <div class="col xl6">
            <div class="note card hoverable" id="card-id-${note.id}">
              <div class="card-content">
                <span class="card-title">${note.title}</span>
                <p>${note.body}</p>
                <input type="hidden" name="id" value="${note.id}">
                <input type="hidden" name="page" value="notes">
                <div class="input-field hide">
                  <input name="title" id="note_title_edit_${note.id}" type="text" value="${note.title}">
                  <label for="note_title_edit_${note.id}"></label>
                </div>
                <div class="input-field hide">
                  <textarea name="body" id="note_content_edit_${note.id}" class="materialize-textarea">${note.body}</textarea>
                  <label for="note_content_edit_${note.id}"></label>
                </div>
                <span class="empty_note_text grey-text hide">Пустая заметка</span>
              </div>
              <div class="card-action">
                <button class="btn-done waves-effect btn-flat hide"><i class="material-icons blue-text text-accent-2">done</i></button>
                <button type="button" class="btn-cancel waves-effect btn-flat hide" onclick="notesCancelEdit('${note.id}')"><i class="material-icons blue-text text-accent-2">cancel</i></button>
                <button type="button" class="btn-edit waves-effect btn-flat" onclick="notesStartEdit('${note.id}')"><i class="material-icons blue-text text-accent-2">edit</i></button>
                <button name="toArchive" value="true" class="btn-archive waves-effect btn-flat"><i class="material-icons blue-text text-accent-2">archive</i></button>
                <button name="toDelete" value="true" class="btn-delete waves-effect btn-flat"><i class="material-icons blue-text text-accent-2">delete</i></button>
              </div>
            </div>
          </div>
        `);

        let $note = document.querySelector(`#card-id-${note.id}`);

        if (note.title === '' && note.body === '') {
          $note.querySelector('.empty_note_text').classList.remove('hide');
        }

        $note.addEventListener('click', (event) => {
          handleClickOnNote(event, $note);
        });
      })
      .catch(err => alert(`Ошибка: ${err}`));
    }
  });
}

let $clearBinPanel = document.querySelector('#clear_bin_panel');

if ($clearBinPanel) {
  $clearBinPanel.addEventListener('click', event => {
    if (event.target.closest('.btn-clear-bin')) {
      fetch('/clear-bin', {
        method: 'delete',
        headers: {
          'Content-Type': 'application/json;charset=utf-8',
          'CSRF-Token': token
        }
      })
      .then(() => {
        document.querySelectorAll('.note').forEach((note) => {
          note.remove();
        });
        if (!document.querySelector('.note')) document.querySelector('#card_with_title_bin_is_empty').classList.remove('hide');
      })
      .catch(err => alert(`Ошибка: ${err}`));
    }
  });
}

const notes = document.querySelectorAll('.note');

if (notes) {
  for (const note of notes) {
    note.addEventListener('click', (event) => {
      handleClickOnNote(event, note);
    });
  }
}

function handleClickOnNote(event, note) {
  if (event.target.closest('.btn-done')) {
    fetch('/change-note', {
      method: 'put',
      headers: {
        'Content-Type': 'application/json;charset=utf-8',
        'CSRF-Token': token
      },
      body: JSON.stringify({
        id: note.querySelector('input[name="id"]').value,
        title: note.querySelector('input[name="title"]').value,
        body: note.querySelector('textarea[name="body"]').value
      })
    })
    .then(() => {
      note.querySelector('.card-content .card-title').textContent = note.querySelector('input[name="title"]').value;
      note.querySelector('.card-content p').textContent = note.querySelector('textarea[name="body"]').value;
      note.querySelector('.card-content .card-title').classList.remove('hide');
      note.querySelector('.card-content p').classList.remove('hide');

      if (note.querySelector('input[name="title"]').value === '' && note.querySelector('textarea[name="body"]').value === '') {
        note.querySelector('.card-content .empty_note_text').classList.remove('hide');
      }
    
      if (note.querySelector('input[name="title"]').value !== '' && note.querySelector('textarea[name="body"]').value !== '') {
        note.querySelector('.card-content .empty_note_text').classList.add('hide');
      }
    
      note.querySelector('input[name="title"]').value = '';
      note.querySelector('textarea[name="body"]').value = '';
      note.querySelectorAll('.card-content .input-field')[0].classList.add('hide');
      note.querySelectorAll('.card-content .input-field')[1].classList.add('hide');
    
      note.querySelector('.btn-edit').classList.remove('hide');
      note.querySelector('.btn-done').classList.add('hide');
      note.querySelector('.btn-cancel').classList.add('hide');

    })
    .catch(err => alert(`Ошибка: ${err}`));
  }

  if (event.target.closest('.btn-archive')) {
    fetch('/archive-note', {
      method: 'put',
      headers: {
        'Content-Type': 'application/json;charset=utf-8',
        'CSRF-Token': token
      },
      body: JSON.stringify({
        id: note.querySelector('input[name="id"]').value
      })
    })
    .then(() => {
      note.remove();
      if (!document.querySelector('.note')) document.querySelector('#card_with_title_create_first_note').classList.remove('hide');
    })
    .catch(err => alert(`Ошибка: ${err}`));
  }

  if (event.target.closest('.btn-unarchive')) {
    fetch('/unarchive-note', {
      method: 'put',
      headers: {
        'Content-Type': 'application/json;charset=utf-8',
        'CSRF-Token': token
      },
      body: JSON.stringify({
        id: note.querySelector('input[name="id"]').value
      })
    })
    .then(() => {
      note.remove();
      if (!document.querySelector('.note')) document.querySelector('#card_with_title_archive_is_empty').classList.remove('hide');
    })
    .catch(err => alert(`Ошибка: ${err}`));
  }

  if (event.target.closest('.btn-delete')) {
    fetch('/delete-note', {
      method: 'put',
      headers: {
        'Content-Type': 'application/json;charset=utf-8',
        'CSRF-Token': token
      },
      body: JSON.stringify({
        id: note.querySelector('input[name="id"]').value
      })
    })
    .then(() => {
      note.remove();
      if (!document.querySelector('.note')) {
        let cardWithTitleArchiveIsEmpty = document.querySelector('#card_with_title_archive_is_empty');
        if (cardWithTitleArchiveIsEmpty) cardWithTitleArchiveIsEmpty.classList.remove('hide');
        let cardWithTitleCreateFirstNote = document.querySelector('#card_with_title_create_first_note');
        if (cardWithTitleCreateFirstNote) cardWithTitleCreateFirstNote.classList.remove('hide');
      }
    })
    .catch(err => alert(`Ошибка: ${err}`));
  }

  if (event.target.closest('.btn-delete-forever')) {
    fetch('/delete-forever-note', {
      method: 'delete',
      headers: {
        'Content-Type': 'application/json;charset=utf-8',
        'CSRF-Token': token
      },
      body: JSON.stringify({
        id: note.querySelector('input[name="id"]').value
      })
    })
    .then(() => {
      note.remove();
      if (!document.querySelector('.note')) document.querySelector('#card_with_title_bin_is_empty').classList.remove('hide');
    })
    .catch(err => alert(`Ошибка: ${err}`));
  }

  if (event.target.closest('.btn-restore')) {
    fetch('/restore-note', {
      method: 'put',
      headers: {
        'Content-Type': 'application/json;charset=utf-8',
        'CSRF-Token': token
      },
      body: JSON.stringify({
        id: note.querySelector('input[name="id"]').value
      })
    })
    .then(() => {
      note.remove();
      if (!document.querySelector('.note')) document.querySelector('#card_with_title_bin_is_empty').classList.remove('hide');
    })
    .catch(err => alert(`Ошибка: ${err}`));
  }
}
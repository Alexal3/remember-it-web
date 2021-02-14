const uuid = require('uuid');
const fs = require('fs');
const path = require('path');

class Note {
  constructor (title, body) {
    this.title = title;
    this.body = body;
    this.id = uuid.v4();
    this.archived = false;
    this.deleted = false;
  }

  static async update(note) {
    const notes = await Note.getAll();

    const idx = notes.findIndex(n => n.id === note.id);
    notes[idx] = note;

    return new Promise((resolve, reject) => {
      fs.writeFile(
        path.join(__dirname, '..', 'data', 'notes.json'),
        JSON.stringify(notes),
        (err) => {
          if (err) {
            reject(err);
          } else {
            resolve();
          }
        }
      );
    });
  }

  static async delete(id) {
    const notes = await Note.getAll();

    const idx = notes.findIndex(n => n.id === id);
    notes.splice(idx, 1);

    return new Promise((resolve, reject) => {
      fs.writeFile(
        path.join(__dirname, '..', 'data', 'notes.json'),
        JSON.stringify(notes),
        (err) => {
          if (err) {
            reject(err);
          } else {
            resolve();
          }
        }
      );
    });
  }

  static async deleteForeverDeletedNotes() {
    let notes = await Note.getAll();

    notes = notes.filter((note) => {
      if (note.deleted === false) {
        return true;
      }
    });

    return new Promise((resovle, reject) => {
      fs.writeFile(
        path.join(__dirname, '..', 'data', 'notes.json'),
        JSON.stringify(notes),
        (err) => {
          if (err) {
            reject(err);
          } else {
            resovle();
          }
        }
      );
    });
  }

  async add() {
    const notes = await Note.getAll();
    notes.push({
      title: this.title,
      body: this.body,
      id: this.id,
      archived: this.archived,
      deleted: this.deleted
    });

    return new Promise((resovle, reject) => {
      fs.writeFile(
        path.join(__dirname, '..', 'data', 'notes.json'),
        JSON.stringify(notes),
        (err) => {
          if (err) {
            reject(err);
          } else {
            resovle();
          }
        }
      );
    });
  }

  static getAll() {
    return new Promise((resovle, reject) => {
      fs.readFile(
        path.join(__dirname, '..', 'data', 'notes.json'),
        'utf-8',
        (err, content) => {
          if (err) {
            reject(err);
          } else {
            resovle(JSON.parse(content));
          }
        }
      );
    });
  }
}

module.exports = Note;
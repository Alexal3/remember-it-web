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
const {Schema, model} = require('mongoose');

const user = new Schema({
  email: {
    type: String,
    required: true
  },
  password: {
    type: String,
    required: true
  },
  resetToken: String,
  resetTokenExp: Date,
  notes: [
    {
      noteId: {
        type: Schema.Types.ObjectId,
        ref: 'Note',
        required: true
      }
    }
  ]
});

module.exports = model('User', user);

// const uuid = require('uuid');
// const fs = require('fs');
// const path = require('path');

// class User {
//   constructor (email, password) {
//     this.email = email;
//     this.password = password;
//     this.id = uuid.v4();
//   }

//   async register() {
//     const users = await User.getAll();
//     users.push({
//       email: this.email,
//       password: this.password,
//       id: this.id
//     });

//     return new Promise((resovle, reject) => {
//       fs.writeFile(
//         path.join(__dirname, '..', 'data', 'users.json'),
//         JSON.stringify(users),
//         (err) => {
//           if (err) {
//             reject(err);
//           } else {
//             resovle();
//           }
//         }
//       );
//     });
//   }

//   static getAll() {
//     return new Promise((resovle, reject) => {
//       fs.readFile(
//         path.join(__dirname, '..', 'data', 'users.json'),
//         'utf-8',
//         (err, content) => {
//           if (err) {
//             reject(err);
//           } else {
//             resovle(JSON.parse(content));
//           }
//         }
//       );
//     });
//   }
// }

// module.exports = User;
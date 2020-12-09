const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const ObjectId = require("mongoose").Types.ObjectId;

const UserSchema = new mongoose.Schema({
    username: String,
    password: String,
});
const User = mongoose.model("user", UserSchema);
  
const ItemsSchema = new mongoose.Schema({
    userId: mongoose.Schema.ObjectId,
    items: [
      {
        // checked: Boolean,
        text: String,
        id: String,
      },
    ],
});
const Items = mongoose.model("items", ItemsSchema);
// export { User, Items };
// module.exports = User;
module.exports = {
    User: User,
    Items: Items
}

// const UserSchema = new Schema({
//     username: {
//         type: String,
//         required: true
//     },
//     password: {
//         type: Date,
//         required: true,
//     },
//     items: [
//         {
//             name: {
//                 type: String,
//                 required: true
//             },
//             date: {
//                 type: Date,
//                 default: Date.now
//             }
//         }
//     ]
// });

// module.exports = User = mongoose.model('user', UserSchema);

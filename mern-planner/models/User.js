const mongoose = require('mongoose');
const Schema = mongoose.Schema;
// const ObjectId = require("mongoose").Types.ObjectId;

const UserSchema = new mongoose.Schema({
    username: String,
    password: String,
    items: [
        {
            name: {
                type: String,
                required: true
            },
            date: {
                type: Date,
                default: Date.now
            }
        }
    ],
});
const User = mongoose.model("user", UserSchema);
module.exports = User;

// const UserSchema = new mongoose.Schema({
//     username: String,
//     password: String,
// });
// const User = mongoose.model("user", UserSchema);
  
// const ItemsSchema = new mongoose.Schema({
//     userId: mongoose.Schema.ObjectId,
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
//     ],
// });
// const Items = mongoose.model("userItems", ItemsSchema, "userItems");
// export { User, Items };
// module.exports = User;
// module.exports = {
//     User: User,
//     Items: Items
// }

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

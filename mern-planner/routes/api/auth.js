// citation: https://www.youtube.com/watch?v=5yTazHkDR4o&list=PLillGF-RfqbbiTGgA77tGO426V3hRF9iE&index=2
const express = require('express');
const router = express.Router();

// User Model
// import { User, Items } from '../../models/User'; // new schema
// !! SyntaxError: Cannot use import statement outside a module

// Item Model
const User = require('../../models/User');

// insert to Items where userId = userId from req.body
// router.post('/insert', (req, res) => {
//     const { userId } = req.body;
//     const newItem = new Item({
//         name: req.body.name
//     });
// });

router.get('/', (req, res) => {
    res.send("inside auth.js");
});

// login
// POST request to api/login
router.post('/login', (req, res) => {
    const username = req.body.loginUsername;
    const password = req.body.loginPassword;
    User.findOne({username: username, password: password})
    .then(user => {
        if(user == null) {
            res.json({success: false});
        } else {
            res.json({success: true});
        }
    });


    console.log("username: " + req.body.loginUsername);
    console.log("pw: " + req.body.loginPassword);
    // res.send({message: "inside /login"});
    // const { username, password } = req.body;
    // User.findOne({username: username, password: password})
    // .then(user => {
    //     if(user == null) {
    //         // redirect to planner page
    //         console.log("user not found");
    //     } else {
    //         // refresh auth page
    //         console.log("login success");
    //     }
    //     // res.json(user)
    // })
    // .catch(err => res.status(404).json({success: false}));
});

// signup
// POST request to api/auth
router.post('/signup', (req, res) => {

});

// POST request to api/items
// Create an item
// router.post('/insert', (req, res) => { // Amy: changed '/' --> '/insert'
//     const newItem = new Item({
//         name: req.body.name // name comes from the body of the request
//     });

//     newItem.save().then(item => res.json(item));
// });

// DELETE request to api/items/:id
// Delete an item
// router.delete('/delete/:id', (req, res) => { // Amy : changed '/:id' --> '/delete/:id'
//     Item.findById(req.params.id)
//     .then(item => item.remove().then(() => res.json({success: true})))
//     .catch(err => res.status(404).json({success: false})); // try to delete id that doesn't exist
// });

module.exports = router;
// end of citation
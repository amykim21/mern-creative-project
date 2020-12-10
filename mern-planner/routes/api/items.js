// citation: https://www.youtube.com/watch?v=5yTazHkDR4o&list=PLillGF-RfqbbiTGgA77tGO426V3hRF9iE&index=2
const express = require('express');
const router = express.Router();
const User = require('../../models/User');

// const { User, Items } = require('../../models/User');

router.post('/insert', (req, res) => {
    const newItems = req.body.newItems;
    // const user;
    console.log("here: " + req.body.username);
    User.findOne({username: req.body.username })
    .then(user => {
        user.items = newItems;
        user.save().then(oldItems => res.json(oldItems));
        // Items.findOne({userId: user._id })
        // .then(oldItems => {
        //     if(oldItems == null) {
        //         // first time that this user is inserting an item
        //         Items.create({
        //             userId: user._id,
        //             items: newItems
        //         });
        //     } else {
        //         oldItems.items = newItems;
        //         oldItems.save().then(items => res.json(items));
        //     }
        // })
        // .catch(err => res.status(404).json({success: false}));
        // res.json(newItems);    
    })
    .catch(err => res.status(404).json({success: false}));
});

router.get('/', (req, res) => {
    User.findOne({username: req.headers.username })
    .then(user => {
        res.json(user.items);
    })
    .catch(err => res.status(404).json({success: false}));
});
// router.post('/', (req, res) => {
//     User.findOne({username: req.body.username })
//     .then(user => {
//         res.json(user.items);
//     })
//     .catch(err => res.status(404).json({success: false}));
// });


// User Model
// import { User, Items } from '../../models/User'; // new schema
// !! SyntaxError: Cannot use import statement outside a module

// Item Model
// const Item = require('../../models/Item');

// insert to Items where userId = userId from req.body
// router.post('/insert', (req, res) => {
//     const { userId } = req.body;
//     const newItem = new Item({
//         name: req.body.name
//     });
// });

// GET request to api/items
// Get All Items
// router.get('/', (req, res) => {
//     Item.find()
//     .sort({ date: -1 })
//     .then(items => res.json(items))
// });

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
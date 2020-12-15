// citation: https://www.youtube.com/watch?v=5yTazHkDR4o&list=PLillGF-RfqbbiTGgA77tGO426V3hRF9iE&index=2
const express = require('express');
const router = express.Router();
const User = require('../../models/User');

// const { User, Items } = require('../../models/User');

router.post('/insert', (req, res) => {
    // const newItems = req.body.newItems;
    console.log("INSERT USERNAME: " + req.body.username);
    User.findOne({username: req.body.username })
    .then(user => {
        req.body.newItem._id = require('mongoose').Types.ObjectId();
        console.log("_id: " + req.body.newItem._id);
        console.log("INSERT date: " + req.body.newItem.date);
        user.items.push(req.body.newItem);
        // user.items = newItems; // wah
        user.save().then(oldItems => res.json(oldItems.items));
    })
    .catch(err => res.status(404).json({success: false}));
});

router.post('/update', (req, res) => {
    console.log("UPDATE id: " + req.body._id);
    console.log("UPDATE name: " + req.body.name);
    console.log("UPDATE answer: " + req.body.answer);

    User.findOne({username: req.body.username })
    .then(user => {
        let item = user.items.find(i => (i._id.equals(req.body._id)));
        console.log("item: " + item);
        if(req.body.answer != "" && req.body.answer != undefined) {
            item.answer = req.body.answer;
            console.log("inside change answer");
        }
        if(req.body.name != "" && req.body.name != undefined) item.name = req.body.name;
        user.save().then(newUser => res.json(newUser.items));
    })
    .catch(err => res.status(404).json({success: false}));
});

router.post('/delete', (req, res) => {
    console.log("DELETE id: " + req.body._id);

    User.findOne({username: req.body.username })
    .then(user => {
        const index = user.items.findIndex((i) => i._id.equals(req.body._id));
        user.items.splice(index, 1);
        console.log("index: " + index);
        console.log("DELETE user items: " + user.items);
        // let item = user.items.find(i => (i._id.equals(req.body._id)));        
        user.save().then(newUser => res.json(newUser.items));
    })
    .catch(err => res.status(404).json({success: false}));
});

router.get('/', (req, res) => {
    console.log("req item: " + req.headers.username);
    // User.findOne({username: req.headers.username })
    User.findOne({username: req.headers.username })
    .then(user => {
        console.log(user.toString());
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
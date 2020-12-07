// citation: https://www.youtube.com/watch?v=5yTazHkDR4o&list=PLillGF-RfqbbiTGgA77tGO426V3hRF9iE&index=2
const express = require('express');
const router = express.Router();

// Item Model
const Item = require('../../models/Item');

// GET request to api/items
// Get All Items
router.get('/', (req, res) => {
    Item.find()
    .sort({ date: -1 })
    .then(items => res.json(items))
});

// POST request to api/items
// Create an item
router.post('/insert', (req, res) => { // Amy: changed '/' --> '/insert'
    const newItem = new Item({
        name: req.body.name // name comes from the body of the request
    });

    newItem.save().then(item => res.json(item));
});

// DELETE request to api/items/:id
// Delete an item
router.delete('/delete/:id', (req, res) => { // Amy : changed '/:id' --> '/delete/:id'
    Item.findById(req.params.id)
    .then(item => item.remove().then(() => res.json({success: true})))
    .catch(err => res.status(404).json({success: false})); // try to delete id that doesn't exist
});

module.exports = router;
// end of citation
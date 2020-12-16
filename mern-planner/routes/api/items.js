const express = require('express');
const router = express.Router();
const User = require('../../models/User');


router.post('/insert', (req, res) => {
    User.findOne({username: req.body.username })
    .then(user => {
        req.body.newItem._id = require('mongoose').Types.ObjectId();
        user.items.push(req.body.newItem);

        // handle repeats
        let ogDate = new Date(req.body.newItem.date);
        const repeatNum = req.body.repeatNum;
        const repeatDays = req.body.repeatDays;
        let j;
        for(j = 1; j <= repeatNum; j++) {
            let repeatItem = {...req.body.newItem};
            repeatItem._id = require('mongoose').Types.ObjectId();
            repeatItem.date = new Date(ogDate.getFullYear(), ogDate.getMonth(), ogDate.getDate()+j*repeatDays);
            user.items.push(repeatItem);
        }
    
        user.save().then(user => {
            res.json(user.items);
        });
    })
    .catch(err => res.status(404).json({success: false}));
});

router.post('/update', (req, res) => {

    User.findOne({username: req.body.username })
    .then(user => {
        let item = user.items.find(i => (i._id.equals(req.body._id)));
        if(req.body.answer != "" && req.body.answer != undefined) {
            item.answer = req.body.answer;
        }
        if(req.body.name != "" && req.body.name != undefined) item.name = req.body.name;
        user.save().then(newUser => res.json(newUser.items));
    })
    .catch(err => res.status(404).json({success: false}));
});

router.post('/delete', (req, res) => {

    User.findOne({username: req.body.username })
    .then(user => {
        const index = user.items.findIndex((i) => i._id.equals(req.body._id));
        user.items.splice(index, 1);
        user.save().then(newUser => res.json(newUser.items));
    })
    .catch(err => res.status(404).json({success: false}));
});

router.post('/complete', (req, res) => {
    console.log("COMPLETE id: " + req.body._id);

    User.findOne({username: req.body.username })
    .then(user => {
        let item = user.items.find(i => (i._id.equals(req.body._id)));
        console.log("item: " + item);
        item.completed = true;
        user.save().then(newUser => res.json(newUser.items));
    })
    .catch(err => res.status(404).json({success: false}));
});

router.get('/', (req, res) => {
    console.log("req item: " + req.headers.username);
    User.findOne({username: req.headers.username })
    .then(user => {
        console.log(user.toString());
        res.json(user.items);
    })
    .catch(err => res.status(404).json({success: false}));
});

module.exports = router;

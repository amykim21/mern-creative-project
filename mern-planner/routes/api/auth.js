// modified from citation: https://www.youtube.com/watch?v=5yTazHkDR4o&list=PLillGF-RfqbbiTGgA77tGO426V3hRF9iE&index=2
const express = require('express');
const router = express.Router();
const User = require('../../models/User');

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
    })
    .catch(err => res.status(404).json({success: false}));


    console.log("username: " + req.body.loginUsername);
    console.log("pw: " + req.body.loginPassword);
});

// signup
// POST request to api/auth
router.post('/signup', (req, res) => {
    const newUser = new User({
        username: req.body.signupUsername,
        password: req.body.signupPassword
    });

    newUser.save().then(user => res.json(user));
});

module.exports = router;
// end of citation
const express = require('express');
const jwt = require('jsonwebtoken');

const router = express.Router();

const secret = 'secret'

const mockUser = {
    username: 'authguy',
    password: 'mypassword',
    profile: {
        firstName: 'Chris',
        lastName: 'Wolstenholme',
        age: 43
    }
};

router.post('/login', (req, res) => {
    if (req.body.username===mockUser.username && req.body.password === mockUser.password) {
        const payload = {
            username: mockUser.username,
            age: mockUser.profile.age,
            fred: 'bob'
        }
        const token = jwt.sign(payload, secret)
        res.json({token})
    } 
    else {
        res.status(400)
        res.json({error:'invalid credentials'})
    } 
});

router.get('/profile', (req, res) => {
    console.log(req.headers)

    const authorization = req.headers['authorization']

    const parts = authorization.split(' ')

    const token = parts[1]

    try {
        const payload = jwt.verify(token, secret)
        console.log("token is valid, payload:", payload)
        res.json({profile:mockUser.profile})
    }
    catch(e) {
        console.log("token is not valid!")
        res.status(401)
        res.json({error: 'token is not valid'})
    }
});

module.exports = router;

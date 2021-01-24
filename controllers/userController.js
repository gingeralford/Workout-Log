
const router = require('express').Router();
const User = require('../workoutDb').import('../models/user');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');

//REGISTER ROUTE
router.post('/register', function(req, res) {

    User.create({
        username: req.body.user.username,
        passwordhash: bcrypt.hashSync(req.body.user.passwordhash, 13)//changing to 42 cause why not?
    })
    .then(
        function createSuccess(user) {
            let token = jwt.sign({id: user.id}, process.env.JWT_SECRET, { expiresIn: 60 * 60 * 24});

            res.json({
                user: user,
                message: "User successfully created!",
                sessionToken: token
            });
        }
    )
    .catch(err => res.status(500).json({ error: err }))

});

//LOGIN ROUTE
router.post('/login', function(req, res) {
    User.findOne({
        where: {
            username: req.body.user.username
            //req from parameters, body like body we type in postman, object user, object username
        }
    })
    .then (function loginSuccess(user){
        if(user){
            bcrypt.compare(req.body.user.passwordhash, user.passwordhash, function (err, matches) {
                if (matches) {

                    let token = jwt.sign({id: user.id}, process.env.JWT_SECRET, { expiresIn: 60 * 60 * 24})

                    res.status(200).json({
                        user : user,
                        message: "User successfully logged in!",
                        sessionToken: token
                    })

                } else {
                    res.status(502).send({ error: "Login Failed" });
                }
            });
        } else {
            res.status(500).json({ error: "User does not exist." })
        }
        }) 
        .catch(function (err) {
        res.status(500).json({ error: err});
    });

});

module.exports = router;
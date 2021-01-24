let express = require('express');
//import the express framework and store it inside the variable express. This instance becomes our gateway to using express methods

let router = express.Router();
//create a new variable, and use the express.Router() property we gained access to by calling express - it will return a router object for us
let validateSession = require("../middleware/validateSession");
const Log = require('../workoutDb').import('../models/log');

//ALLOWS USER TO CREATE A WORKOUT LOG
router.post('/', validateSession, (req, res) => {
    const logEntry = {
        description: req.body.log.description,
        definition: req.body.log.definition,
        result: req.body.log.result,
        owner_id: req.user.id
        //grabs the owner_id from the info contained in the login token, not from the Json info
    };

    Log.create(logEntry)
        .then(logs => res.status(200).json(logs))
        .catch(err => res.status(500).json({ error: err }))
});

//GET ALL LOGS FOR AN INDIVIDUAL USER -OK!
router.get('/', validateSession, (req, res) => {
    let id = req.user.id;
    Log.findAll({
        where: ( { owner_id: id} )
    })
        .then(logs => res.status(200).json(logs))
        .catch(err => res.status(500).json({ error: err }))
});


//	Gets individual logs by id for an individual user.
router.get('/:id', validateSession, (req, res) => {
    let id = req.params.id;
    //gets id from token
    Log.findOne({
        where: ( { id: req.params.id, owner_id: req.user.id} )

    })
    .then(function (logs) {
        if (!logs) {
            res.status(200).json({ "message": "No entry found"})
        } else {
        res.status(200).json(logs)}}) 
    .catch(err => res.status(500).json( { error: err}))
});


//ALLOWS INDIVIDUAL LOGS TO BE UPDATED BY USER
router.put("/:id", validateSession, function (req, res) {

    const updateLog = {
        description: req.body.log.description,
        definition: req.body.log.definition,
        result: req.body.log.result,
        owner_id: req.user.id
    };

    const query = { where: { id: req.params.id, owner_id: req.user.id } };

    Log.update(updateLog, query)
        .then((logs) => res.status(200).json(logs))
        .catch((err) => res.status(500).json({ error: err }));
});

//ALLOWS INDIVIDUAL LOGS TO BE DELETED BY USER
router.delete("/:id", validateSession, function (req, res) {
    const query = { where: { id: req.params.id, owner_id: req.user.id } };

    Log.destroy(query) //basically builds a SQL query to search for item
        .then(() => res.status(200).json({ message: "Log Entry Removed" }))
        .catch((err) => res.status(500).json( { error: err }));
});

module.exports = router;
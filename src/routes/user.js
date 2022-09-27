const express = require('express');
const userSchema = require('../models/user');

const router = express.Router();

//Add new user
router.post('/add', (req, res) => {
    const newUser = userSchema(req.body);

    newUser.save()
    .then((data) => res.json(data))
    .catch((e) => res.json({ message: e }));
});

//List all users
router.get('/users', (req, res) => {
    userSchema.find()
    .then((data) => res.json(data))
    .catch((e) => res.json({ message: e }));
});

//List user by Id
router.get('/user/:id', (req, res) => {
    const { id } = req.params;

    userSchema.findById(id)
    .then((data) => res.json(data))
    .catch((e) => res.json({ message: e }));
});

//Edit user
router.put('/modify/:id', (req, res) => {
    const { id } = req.params;
    const { ci, fullName, age} = req.body;

    userSchema.updateOne({_id: id}, {$set: {ci, fullName, age}})
    .then((data) => res.json(data))
    .catch((e) => res.json({ message: e }));
});

//Delete user
router.delete('/kill/:id', (req, res) => {
    const { id } = req.params;

    userSchema.deleteOne({_id: id})
    .then((data) => res.json(data))
    .catch((e) => res.json({ message: e }));
});

module.exports = router;
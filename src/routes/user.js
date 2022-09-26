const express = require('express');
const user = require('../models/user');
const userSchema = require('../models/user');

const router = express.Router();

//Add new user
router.post('/add', (req, res) => {
    const newUser = userSchema(req.body);

    newUser.save()
    .then(() => console.log('Usuario guardado con exito'))
    .catch((e) => res.json({ message: e }));
});

//List all users
router.get('/users', (req, res) => {
    userSchema.find()
    .then(() => console.log('Usuarios listados'))
    .catch((e) => res.json({ message: e }));
});

//List user by Id
router.get('/user/:id', (req, res) => {
    const { id } = req.params;

    userSchema.findById(id)
    .then(() => console.log('Usuario listado'))
    .catch((e) => res.json({ message: e }));
});

//Edit user
router.put('/modify/:id', (req, res) => {
    const { id } = req.params;
    const { ci, fullName, age} = req.body;

    userSchema.updateOne({_id: id}, {$set: {ci, fullName, age}})
    .then(() => console.log('Usuario modificado'))
    .catch((e) => res.json({ message: e }));
});

//Delete user
router.delete('/kill/:id', (req, res) => {
    const { id } = req.params;

    userSchema.deleteOne({_id: id})
    .then(() => console.log('Usuario eliminado'))
    .catch((e) => res.json({ message: e }));
});

module.exports = router;
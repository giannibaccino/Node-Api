const express = require('express');
const userSchema = require('../models/user');
const fetch = (...args) => import('node-fetch').then(({default: fetch}) => fetch(...args));

const router = express.Router();

//Add new user
router.post('/add', (req, res) => {
    const newUser = userSchema(req.body);

    newUser
    .save()
    .then((data) => res.json(data))
    .catch((e) => res.json({ message: e }));
});

//List all users
router.get('/users', async (req, res) => {
    userSchema
    .find()
    .then((data) => res.json(data))
    .catch((e) => res.json({ message: e }));
});

//List user by Id
router.get('/user/:id', (req, res) => {
    const { id } = req.params;

    userSchema
    .findById(id)
    .then(async (data) => {
        const fetchApi = await fetch("http://localhost:9000/acapi/ac/" + data.account);
        const account = await fetchApi.json();
        
        let fullUser = new Object();
        fullUser.user = data;
        fullUser.account = account;
        
        return res.json(fullUser);
    })
    .catch((e) => res.json({ message: e }));
});

//Edit user
router.put('/modify/:id', (req, res) => {
    const { id } = req.params;
    const { ci, fullName, age} = req.body;

    userSchema
    .updateOne({_id: id}, {$set: {ci, fullName, age}})
    .then((data) => res.json(data))
    .catch((e) => res.json({ message: e }));
});

//Delete user
router.delete('/kill/:id', (req, res) => {
    const { id } = req.params;

    userSchema
    .findById(id)
    .then(async (data) => {
        const del = await fetch("http://localhost:9000/acapi/del/" + data.account, {method: "DELETE"});
        data.delete();
        return res.send("Usuario y cuenta borrados con exito");
    })
    .catch((e) => res.json({ message: e }));
});

module.exports = router;
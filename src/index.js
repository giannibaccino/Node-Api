const express = require('express');
const mongoose = require('mongoose');
require('dotenv').config();
const userRoutes = require('./routes/user')

const app = express();
const port = process.env.PORT || 4200;

//Middleware
app.use(express.json());
app.use('/api', userRoutes);

//Routing
app.get('/', (req, res) => {
    res.send("Api de usuarios");
})

//Connection with MongoDB
mongoose
.connect(process.env.MONGODB_DIR)
.then(() => console.log("Connected to MongoDB"))
.catch((e) => console.log(e));

app.listen(port, () => console.log('Server listening to port: ', port));
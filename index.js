const express = require('express');
const mongoose = require('mongoose');
require('dotenv').config();
const userRoutes = require('./routes/user')
const hbs = require('express-handlebars');

const app = express();
const port = process.env.PORT || 4200;

//Middleware
app.use(express.json());
app.use('/api', userRoutes);
app.engine('.hbs', hbs.engine({
    defaultLayout: 'default',
    extname: '.hbs'
}));
app.set('view engine', '.hbs');

//Routing
app.get('/', (req,res) => {
    res.redirect('https://node-api-6mtr.vercel.app/crear');
  });
app.get('/crear', (req, res) => {
    res.render('crear');
});
app.get('/lista', (req, res) => {
    res.render('listado');
});
app.get('/user', (req, res) => {
    res.render('ver-uno');
});

//Connection with MongoDB
mongoose
.connect(process.env.MONGODB_DIR)
.then(() => console.log("Connected to MongoDB"))
.catch((e) => console.log(e));

app.listen(port, () => console.log('Server listening to port: ', port));
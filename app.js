const express = require("express");
const path = require("path");
const app = express();
const mongoose = require('mongoose');
mongoose.connect('mongodb://localhost/gymContact', { useNewUrlParser: true });
const port = 80;

var contactSchema = new mongoose.Schema({
    name: String,
    email: String,
    phone: String,
    address: String,
    context: String
});

var Contact = mongoose.model('Contact', contactSchema);

app.use('/public', express.static('public'))
app.use(express.urlencoded())

app.set('view engine', 'pug')
app.set('views', path.join(__dirname, 'views'))

app.get('/', (req, res) => {
    const params = {}
    res.status(200).render('home.pug', params);
})

app.get('/contact', (req, res) => {
    const params = {}
    res.status(200).render('contact.pug', params);
})

app.post('/contact', (req, res) => {
    var contactData = new Contact(req.body);
    contactData.save().then(() => {
        res.send("This data has been saved to the database")
    }).catch(() => {
        res.status(400).send("Data has not been saved to the database")
    });
})

app.listen(port, () => {
    console.log(`The app started on port ${port}`);
})

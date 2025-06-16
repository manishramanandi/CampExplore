const express = require ('express');
const app = express()
const path = require('path');
const mongoose = require('mongoose');
const campground = require('./models/campground')

// local database 
mongoose.connect('mongodb://localhost:27017/camp-explore');

const db = mongoose.connection;
db.on("error", console.error.bind(console, "connection error:"));
db.once("open", () => {
    console.log("Database connected");
})


app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'))

app.get('/', (req, res) => {
    res.send('')
})
app.get('/makecampground', async(req, res)=> {
    const camp = new campground({ title: 'My Backyard', description: 'cheap camping'});
    await camp.save();
    res.send(camp)
})

app.listen(3000, () => {
    console.log('Serving on port 3000')
})
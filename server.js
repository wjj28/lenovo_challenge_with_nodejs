//packages installed
const express = require('express');
// const axios = require('axios');
// const cheerio = require('cheerio');

const new_links = require(__dirname + "/extracting_and_sorting_data.js");


// port
const port = process.env.PORT || 3000;

const app = express();


// Static files
app.use(express.static('frontend/public'))
app.use('/css', express.static(__dirname + './css'));


// Set views
app.set('views', './frontend/views');
app.set('views engine', 'ejs')


app.get('/', (req, res) => {
    res.render('index.ejs', {text: 'Lenovo'});
});


app.get('/lenovo', async (req, res) => {
    await new_links;
    res.json(new_links);
});

//


app.listen(port, () => {
    console.log(`Server running on port ${port}`);
});






// create a new router object
const htmlRoutes = require('express').Router();
const path = require('path');

// GET '/notes' to return notes.html.
htmlRoutes.get('/notes', (req, res) => {
    res.sendFile(path.join(__dirname, '../public/notes.html'));
});

// GET '*' (any routes) to return index.html.
htmlRoutes.get('*', (req, res) => {
    res.sendFile(path.join(__dirname, '../public/index.html'));
})

module.exports = htmlRoutes;
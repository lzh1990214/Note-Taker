// import express dependency
const express = require('express');

// assign express() function to a new variable name: app
const app = express();
const PORT = 3001;

// import HTML and API routes files
const apiRouter = require('./routes/apiRoutes');
const htmlRouter = require('./routes/htmlRoutes');
app.use('/api', apiRouter);
app.use('/', htmlRouter);

// middleware to make 'public' folder static and accessible to front-end users
app.use(express.static('public'));

// middleware for parsing application/json and urlencoded data
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// app listener 
app.listen(PORT, () => {
    console.log(`App listening at http://localhost:${PORT}`);
});

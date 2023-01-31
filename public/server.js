// import dependency: express
const express = require('express');

// assign express() function to a new variable name: app
const app = express();

const PORT = 3001;

// Middleware to make 'public' folder static and accessible to front-end users
app.use(express.static('public'));

// Middleware for parsing application/json and urlencoded data
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// routes to route files
require('./routes/apiRoutes')(app);
require('./routes/htmlRoutes')(app);

// app listener - starts the server
app.listen(PORT, () => {
    console.log(`App listening at http://localhost:${PORT}`);
});

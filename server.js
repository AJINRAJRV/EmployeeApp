const express = require('express'); // Import Express
const morgan = require('morgan'); // Import Morgan

const app = express(); // Create an instance of Express

// Use Morgan for logging
app.use(morgan('dev'));

// Set EJS as the view engine
app.set('view engine', 'ejs');
app.set('views', __dirname + '/views'); // Path to EJS files

// Serve static files from 'public' directory
app.use(express.static('public'));

// Navigation bar links
const navbar = [
    { link: '/routing/home', name: 'Home' },
    { link: '/routing/form', name: 'Add Employee' }
];

// Use the routing module
const homeRouter = require('./routes/routing')(navbar);
app.use('/routing', homeRouter);

// Start the server
app.listen(3000, () => {
    console.log("Server is listening on PORT 3000");
});

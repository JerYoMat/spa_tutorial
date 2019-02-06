/* Before we start writing our front-end code, we need to implement a server–client base to work from. That means a basic HTML view being served from an Express server. For performance and reliability reasons, we’ll inject front-end dependencies straight from the node_modules folder.*/

require('dotenv').config(); // read .env files
const { getRates } = require('./lib/fixer-service'); //Added later
const express = require('express');

const app = express();
const port = process.env.PORT || 3000;

// Set public folder as root
app.use(express.static('public'));

// Allow front-end access to node_modules folder
app.use('/scripts', express.static(`${__dirname}/node_modules/`));

// Express Error handler
const errorHandler = (err, req, res) => {
    if (err.response) {
      // The request was made and the server responded with a status code
      // that falls out of the range of 2xx
      res.status(403).send({ title: 'Server responded with an error', message: err.message });
    } else if (err.request) {
      // The request was made but no response was received
      res.status(503).send({ title: 'Unable to communicate with server', message: err.message });
    } else {
      // Something happened in setting up the request that triggered an Error
      res.status(500).send({ title: 'An unexpected error occurred', message: err.message });
    }
  };
  
  // Fetch Latest Currency Rates
  app.get('/api/rates', async (req, res) => {
    try {
      const data = await getRates();
      res.setHeader('Content-Type', 'application/json');
      res.send(data);
    } catch (error) {
      errorHandler(error, req, res);
    }
  });

// Redirect all traffic to index.html
app.use((req, res) => res.sendFile(`${__dirname}/public/index.html`));

// Listen for HTTP requests on port 3000
app.listen(port, () => {
  console.log('listening on %d', port);
});


/*
// Test to verify getRates() is working
const test = async() => {
    const data = await getRates();
    console.log(data);
  }
  
  test();
  */
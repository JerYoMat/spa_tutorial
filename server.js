/* Before we start writing our front-end code, we need to implement a server–client base to work from. That means a basic HTML view being served from an Express server. For performance and reliability reasons, we’ll inject front-end dependencies straight from the node_modules folder.*/

require('dotenv').config(); // read .env files
const express = require('express');

const app = express();
const port = process.env.PORT || 3000;

// Set public folder as root
app.use(express.static('public'));

// Allow front-end access to node_modules folder
app.use('/scripts', express.static(`${__dirname}/node_modules/`));

// Listen for HTTP requests on port 3000
app.listen(port, () => {
  console.log('listening on %d', port);
});
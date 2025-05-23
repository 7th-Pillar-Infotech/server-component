const path = require('path');
const express = require('express');
const router = require('./server/router');

const { PORT = 3001 } = process.env;
const HOST = '127.0.0.1';

const app = express();

// Middleware that parses json and looks at requests where the Content-Type header matches the type option.
app.use(express.json());

// Serve API requests from the router
app.use('/api', router);

// Serve app production bundle
// app.use(express.static('dist/app'));

app.use(express.static(path.resolve(__dirname, '../public')));

// Handle client routing, return all requests to the app
app.get('*', (_req, res) => {
  res.sendFile(path.join(__dirname, 'app/index.html'));
});

app.listen(PORT, HOST, () => {
  console.log(`Server listening at http://${HOST}:${PORT}`);
});

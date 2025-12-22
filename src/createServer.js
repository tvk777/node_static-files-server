/* eslint-disable no-console */

'use strict';

const http = require('http');
const fsp = require('fs/promises');
const path = require('path');
const { validateRequest } = require('./validateRequest');

function createServer() {
  const server = http.createServer(async (req, res) => {
    res.setHeader('Content-Type', 'text/plain');

    const filePath = req.url.slice(1);
    const { code, message } = validateRequest(filePath);

    if (code) {
      res.statusCode = code;
      res.end(message);

      return;
    }

    try {
      const safePath = path.join(
        'public',
        filePath.replace(/^file\/?/, '') || 'index.html',
      );

      const file = await fsp.readFile(safePath, 'utf-8');

      res.statusCode = 200;
      res.setHeader('Content-Type', 'text/html');
      res.end(file);
    } catch (error) {
      res.statusCode = 404;
      res.end(`File ${filePath} is Not Found'`);
    }
  });

  return server;
}

module.exports = {
  createServer,
};

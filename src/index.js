const express = require('express');
const app     = express();

const config = require('@zero65/config');

const writeToDisk = require('./write-to-disk/');

// (async () => {
// console.log(await require('./write-to-disk/').unzip());
// })();

app.get('/_env', async (req, res) => {
  res.send(process.env);
});

app.get('/write-to-disk/stats', (req, res) => {
  res.send({ files:writeToDisk.list(), memory:writeToDisk.getMemoryUsage() });
});

app.get('/write-to-disk/unzip', async (req, res) => {
  await writeToDisk.unzip();
  res.send({ files:writeToDisk.list(), memory:writeToDisk.getMemoryUsage() });
});



app.listen(process.env.PORT || 8080, console.log(`index: Server is up and listening at ${ process.env.PORT || 8080 } port.`));

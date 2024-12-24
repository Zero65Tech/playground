const express = require('express');
const app     = express();

const config = require('@zero65/config');

(async () => {
console.log(await require('./write-to-disk/').unzip());
})();

app.get('/write-to-disk/list', async (req, res) => {
  res.send(await require('./write-to-disk/').list());
});

app.get('/_env', async (req, res) => {
  res.send(process.env);
});



app.listen(process.env.PORT || 8080, console.log(`index: Server is up and listening at ${ process.env.PORT || 8080 } port.`));

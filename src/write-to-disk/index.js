const express = require('express');
const fs = require('fs');
const path = require('path');

const unzipper = require('unzipper');

exports.list = async () => {
  const files = await fs.promises.readdir(__dirname);
  return files.map(file => path.join(__dirname, file));
}

exports.unzip = async () => {
  const input = path.join(__dirname, 'data.csv.zip');
  const output = path.join(__dirname, `data-${ new Date().toISOString() }.csv`);
  await new Promise((resolve, reject) => {
    fs.createReadStream(input).pipe(unzipper.ParseOne()).pipe(fs.createWriteStream(output))
      .on('close', resolve)
      .on('error', reject);
  });
  return await exports.list();
}

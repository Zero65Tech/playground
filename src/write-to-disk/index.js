const express = require('express');
const fs = require('fs');
const path = require('path');

const unzipper = require('unzipper');

exports.list = () => {
  const files = fs.readdirSync(__dirname);
  return files.map(file => path.join(__dirname, file));
}

exports.getMemoryUsage = () => {
  const memoryUsage = process.memoryUsage();
  return [
    { label: 'RSS', value: (memoryUsage.rss / 1024 / 1024).toFixed(2) + ' MB' },
    { label: 'Heap Total', value: (memoryUsage.heapTotal / 1024 / 1024).toFixed(2) + ' MB' },
    { label: 'Heap Used', value: (memoryUsage.heapUsed / 1024 / 1024).toFixed(2) + ' MB' },
    { label: 'External', value: (memoryUsage.external / 1024 / 1024).toFixed(2) + ' MB' },
    { label: 'Array Buffers', value: (memoryUsage.arrayBuffers / 1024 / 1024).toFixed(2) + ' MB' },
  ];
};

exports.unzip = async () => {
  const input = path.join(__dirname, 'data.csv.zip');
  const output = path.join(__dirname, `data-${ new Date().toISOString() }.csv`);
  await new Promise((resolve, reject) => {
    fs.createReadStream(input).pipe(unzipper.ParseOne()).pipe(fs.createWriteStream(output))
      .on('close', resolve)
      .on('error', reject);
  });
}

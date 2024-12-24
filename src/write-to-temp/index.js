const fs = require('fs');
const path = require('path');

const unzipper = require('unzipper');

exports.list = async () => {
  const files = await fs.promises.readdir('/tmp');
  const fileDetails = {};
  for (const file of files) {
    const filePath = path.join('/tmp/', file);
    const stats = await fs.promises.lstat(filePath);
    if (!stats.isDirectory())
      fileDetails[file] = `${(stats.size / 1024 / 1024).toFixed(2)} MB`;
  }
  return fileDetails;
}

exports.getMemoryUsage = () => {
  const memoryUsage = process.memoryUsage();
  return {
    'RSS'           : (memoryUsage.rss / 1024 / 1024).toFixed(2) + ' MB',
    'Heap Total'    : (memoryUsage.heapTotal / 1024 / 1024).toFixed(2) + ' MB',
    'Heap Used'     : (memoryUsage.heapUsed / 1024 / 1024).toFixed(2) + ' MB',
    'External'      : (memoryUsage.external / 1024 / 1024).toFixed(2) + ' MB',
    'Array Buffers' : (memoryUsage.arrayBuffers / 1024 / 1024).toFixed(2) + ' MB',
  };
};

exports.unzip = async () => {
  const input = path.join(__dirname, 'data.csv.zip');
  const output = path.join(`/tmp/data-${ new Date().toISOString() }.csv`);
  await new Promise((resolve, reject) => {
    fs.createReadStream(input).pipe(unzipper.ParseOne()).pipe(fs.createWriteStream(output))
      .on('close', resolve)
      .on('error', reject);
  });
}

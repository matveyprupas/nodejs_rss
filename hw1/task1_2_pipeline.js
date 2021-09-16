const fs = require('fs');
const csv=require('csvtojson');
const { pipeline } = require('stream');

const csvFilePath='./hw1/csv/task1_2/csv_in.csv';

const readStream=fs.createReadStream(csvFilePath);
const writeStream=fs.createWriteStream('./hw1/csv/task1_2/text_out_pipe.txt');

readStream
.pipe(csv({
    output: "json",
    delimiter: ';'
}))
.pipe(writeStream)
.on('error', err => console.log(err));

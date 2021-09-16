import fs from 'fs';
import csv from 'csvtojson';

const csvFilePath='./hw1_babel/data/csv_in.csv';

const readStream=fs.createReadStream(csvFilePath);
const writeStream=fs.createWriteStream('./hw1_babel/data/text_out_pipe.txt');

readStream
.pipe(csv({
    output: "json",
    delimiter: ';'
}))
.pipe(writeStream)
.on('error', err => console.log(err));

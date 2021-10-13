import fs from 'fs';
import csv from 'csvtojson';
const csvFilePath = './hw1_babel/data/csv_in.csv';
csv({
  output: 'json',
  delimiter: ';'
}).fromFile(csvFilePath).then(jsonObj => {
  let res = jsonObj.map(el => {
    return JSON.stringify(el);
  });
  return res.join("\n");
}).then(res => {
  fs.writeFile('./hw1_babel/data/text_out.txt', res, err => {
    if (err) throw err;
    console.log("Saved!");
  });
}).catch(err => console.log(err));
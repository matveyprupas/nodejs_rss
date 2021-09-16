const fs = require('fs');
const csv=require('csvtojson');

const csvFilePath='./hw1/csv/task1_2/csv_in.csv';

csv({
    output: 'json',
    delimiter: ';'
})
.fromFile(csvFilePath)
.then((jsonObj)=>{

    let res = jsonObj.map(el => {
        return JSON.stringify(el);
    });

    return res.join("\n");
})
.then((res) => {
    fs.writeFile('./hw1/csv/task1_2/text_out.txt', res, (err)=>{
        if (err) throw err;
        console.log("Saved!")
    });
})
.catch((err) => console.log(err));
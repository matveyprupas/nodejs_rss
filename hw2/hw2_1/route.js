const express = require('express');
const users = require('./users');
var readline = require('readline');

let router = express.Router();

router.get('/:id', (req, res) => {

    console.log(id);
    
    res
        .status(200)
        .send( `User data:
                login: ${users[req.params.id].login}
                age: ${users[req.params.id].age}` )
        .end("Get ended");

});

var rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout,
    terminal: false
  });

rl.on('line', (line) => {
    console.log(line.toUpperCase());
});

router.post('/:id', (req, res) => {
    let id = req.params.id;

    for (let key in users) {
        if(id === users[key]["id"]) {
            res
                .status(200)
                .send( `User with this ID (${id}) already has been created:
                        login: ${users[req.params.id].login}
                        age: ${users[req.params.id].age}` );
        } else {
            res.status(201).send(`Create item with ID ${id}!`);
        }
        // console.log(users[key]["id"]);
    }

});

router.put('/:id', (req, res) => {
    res.status(200).send(`update item by ID ${req.params.id}!`);
});

router.delete('/:id', (req, res) => {
    let id = req.params.id;

    for (let key in users) {
        if(id === users[key]["id"]) {
            // console.log(users[key]['isDeleted']);
            users[key]['isDeleted'] = true;
            // console.log(users[key]['isDeleted']);

            res
                .status(200)
                .send( `User with this ID (${id}) deleted!` );
        } else {
            res.status(200).send(`Cannot find user with ID: ${id}!`);
        }
        // console.log(users[key]["id"]);
    }
});

module.exports ={
    rout: router
};
const express = require('express')
const fs = require("fs");

let app = express();
const jsonParser = express.json();

let port = 8080;

app.use(express.static("public"));
    
const filePath = "hw2/hw2_1/users.json";

app.get("/api/users", (req, res) => {
    const content = fs.readFileSync(filePath, 'utf8');
    const users = JSON.parse(content);
    res.send(users);
});

app.get("/api/users/:id", (req, res) => {
    const myId = req.params.id;
    const content = fs.readFileSync(filePath, 'utf8');
    const users = JSON.parse(content);
    var user;

    for (let key in users) {

        if (users[key]["id"] === myId) {
            user = (users[key]);
            break;
        }
    }
    if (user) {
        res
            .status(200)    
            .send(user);
    } else {
        res
            .status(404)
            .end("Oops... User is absent");
    }
});

app.post("/api/users/", jsonParser, function (req, res) {
    if(!req.body) return res.status(400).end("Oops...");
    
    const userID = req.body.id;
    const userLogin = req.body.login;
    const userPassword = req.body.password;
    const userAge = req.body.age;
    const isUserDeleted = req.body.isDeleted;

    let user = {id: userID, login: userLogin, password: userPassword, age: userAge, isDeleted: isUserDeleted};

    let dataJSON = fs.readFileSync(filePath, "utf8");
    let users = JSON.parse(dataJSON);

    if (users[userID]) return res.status(400).end("Oops... User with this ID already exist");

    dataJSON = JSON.stringify({...users, [userID]: user});
    fs.writeFileSync(filePath, dataJSON);

    res.status(200).send(JSON.parse(dataJSON));
});

app.put("/api/users/", jsonParser, function (req, res) {
    if(!req.body) return res.status(400).end("Oops...");
    
    const userID = req.body.id;
    const userLogin = req.body.login;
    const userPassword = req.body.password;
    const userAge = req.body.age;
    const isUserDeleted = req.body.isDeleted;

    let user = {id: userID, login: userLogin, password: userPassword, age: userAge, isDeleted: isUserDeleted};

    let dataJSON = fs.readFileSync(filePath, "utf8");
    let users = JSON.parse(dataJSON);

    if (!users[userID]) return res.status(400).end("Oops... User with this ID didn't find");

    dataJSON = JSON.stringify({...users, [userID]: user});
    fs.writeFileSync(filePath, dataJSON);

    res.status(200).send(JSON.parse(dataJSON));
});

app.delete("/api/users/:id", function (req, res) {
    
    const userID = req.params.id;
    
    let dataJSON = fs.readFileSync(filePath, "utf8");
    let users = JSON.parse(dataJSON);
    let deletingUser = users[userID];

    if (!deletingUser) return res.status(404).end("Oops... I cannot DELETE user with this ID. I couldn't find him");

    deletingUser.isDeleted = true;

    dataJSON = JSON.stringify({...users, [userID]: deletingUser});
    fs.writeFileSync(filePath, dataJSON);

    res.status(200).send(JSON.parse(dataJSON));
});

app.listen(port, function(){
    console.log(`Server running on port ${port}`);
});
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
    console.log(req);

    if(!req.body) return res.status(400).end("Oops...");

    const userName = req.body.name;
    const userAge = req.body.age;
    let user = {name: userName, age: userAge};

    let data = fs.readFileSync(filePath, "utf8");
    let users = JSON.parse(data);
    // console.log(user);

    // находим максимальный id
    // const id = Math.max.apply(Math,users.map(function(o){return o.id;}))
    // // // увеличиваем его на единицу
    // user.id = id+1;
    // // // добавляем пользователя в массив
    // users.push(user);
    data = JSON.stringify({...users, user});
    // // // перезаписываем файл с новыми данными
    fs.writeFileSync("users.json", data);
    res.send(user);
});


app.listen(port, function(){
    console.log(`Server running on port ${port}`);
});
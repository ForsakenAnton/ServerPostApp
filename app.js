// const { response } = require("express");
const { request } = require("express");
const express = require("express");
const app = express();

const fs = require("fs");

const jsonParser = express.json();

app.use(function(request, responce, next) {
    responce.header('Access-Control-Allow-Origin', '*');
    responce.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept');
    responce.header('Access-Control-Allow-Methods', 'GET, PATCH, PUT, POST, DELETE, OPTIONS');
    
    next();
});

//http://localhost:3000/postuser?login=qwerty&password=123
app.post("/postuser", jsonParser, (req, res) => {
    if(!req.body)
        return res.sendStatus(400);

    let login = req.body.login;
    let password = req.body.password;

    console.log(login + " : " + password);

    // message = "Данные приняты";
    // res.send(message);

    fs.appendFileSync("users.txt", "login: " + login + ", password: " + password + "\n");
    res.json({"message" : "Данные приняты и успешно записаны, " + login + ". Ваш логин и пароль(" + password + ", ага) будут успешно использованы в наших целях"});
});

app.listen(3000, () => {
    console.log("Server start");
})
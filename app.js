//Importing nodejs libraries
const express = require('express');
const cookieParser = require('cookie-parser');
const sessions = require('express-session');

const PORT = 3000;

//initializing express
const app = express();

//Middleware

//creating 24 hours in milliseconds
const oneDay = 1000 * 60 * 60 * 24;

//Session middleware
app.use(sessions({
    secret: "thisismysecrctekeyfhrgfgrfrty84fwir767",
    saveUninitialized:true,
    cookie: { maxAge: oneDay },
    resave: false
}));

app.use(express.json());
app.use(express.urlencoded({extended: true}));

app.use(express.static(__dirname));

//cookie-parser middleware
app.use(cookieParser());

const username = "user1";
const password = "myPassword";

// var session;

app.get('/', (req, res) => {
    session = req.session;
    if (session.userId) {
        res.send("Welcome User <a href = \'/logout'> Click To Logout </a>");
    } else 
        res.sendFile('views/index.html', {root: __dirname});
});

app.post('/user',(req,res) => {
    if(req.body.username == username && req.body.password == password){
        session=req.session;
        session.userId=req.body.username;
        console.log(req.session)
        res.send(`Hey there, welcome <a href=\'/logout'>click to logout</a>`);
    }
    else{
        res.send('Invalid username or password');
    }
});

app.get('/logout',(req,res) => {
    req.session.destroy();
    res.redirect('/');
});

app.listen(PORT, () => {
    console.log(`Server is started at port ${PORT}`);
});
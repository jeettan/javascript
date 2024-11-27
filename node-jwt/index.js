const express = require('express');
const path = require('path');
const cookieParser = require('cookie-parser');
const jwt = require('jsonwebtoken');

const app = express()

app.use(
    express.urlencoded({
        extended: true,
    })
);

app.use(cookieParser());

console.log("Hello world");


app.get("/", (req,res) => {

    const token = req.cookies.token;
    try {

        const user = jwt.verify(token, 'secretkey123');
        return res.redirect('/login');
    } catch(err){

        return res.redirect('/front')
    }
})

app.get('/front', (req, res) => {

    res.sendFile(path.join(__dirname, './front.html'));

})

app.post('/add', (req,res) => {

    const {user, pwd} = req.body

    if(user == 'jeet' && pwd == '3475') {

        console.log("Login successful!")

        const payload = {
            name: user
        }

        const token = jwt.sign(payload, 'secretkey123', {
            expiresIn: '1h'
        })  

        res.cookie("token", token, {
            httpOnly: true
        })

        return res.redirect('/login');

 
    } else {

        console.log("Incorrect username or pwd")
        return res.redirect('/');
    }

})
app.get('/login', (req, res) => {

    res.sendFile(path.join(__dirname, './back.html'));

})

app.post('/clear', (req,res) => {

    res.clearCookie("token");
    return res.redirect('/')


})


app.listen(3000, () => {

    console.log("Server started at port 3000");
})
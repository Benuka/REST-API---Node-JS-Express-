//load app server using express
const express = require('express')
const app = express()
const morgan = require('morgan')
const mysql = require('mysql')


app.use(express.static('./public'))

app.use(morgan('short'))

const router = require('./routes/user.js')
app.use(router)





app.get("/", (req,res) => {
    console.log("Responding to root route")
    res.send("Hello World..!!!")
})

app.get("/users", (req,res) => {
    var user1 = {firstname : "Benuka", lastname: "Withanage" }
    res.json(user1)
   // res.send("nodemon auto")
})

//localhost:3030
app.listen(3003,() => {
    console.log("Server Up and Running on 3003...")
})


//contain all user related routes
const express = require('express')
const mysql = require('mysql')
const bodyParser = require('body-parser')

const router = express.Router()
router.use(bodyParser.urlencoded({extended: false}))

const pool = mysql.createPool({
    connectionLimit: 10,
    host: 'localhost',
    user: 'root',
    password: 'root',
    database: 'Nodejs'
})

function getConnection() {
    return pool
}

router.post('/user_create', (req,res) => {
    console.log("Trying to create new User")

    const firstName = req.body.firstname
    const lastName = req.body.lastname

    const querystring = "INSERT INTO users (fname,lname) VALUES (?,?)"
    getConnection().query(querystring, [firstName, lastName], (err,results,fields) => {
        if(err){
            console.log("Failed to save User" + err)
            res.sendStatus(500)
            return
        }
        console.log("Inserted a new user with id ", results.insertId);
        res.end()
    })
    res.end()
})


router.get('/user/:id', (req,res) =>{
    console.log("Fetching user with id: " + req.params.id)
    //fetch data from mysql
    const connection  = getConnection()

    const userId = req.params.id
    const querystring = "SELECT * FROM users WHERE id = ?"
    connection.query(querystring, [userId],(err,rows,fields) => {
        if (err){ 
            console.log("****Error :  " + err)
            res.sendStatus(500)
            return
        }
        console.log("successfully user fetched ")
        const users = rows.map((row) => {
            return {ID: row.id, firstName: row.fname, lastName: row.lname}
        })
        res.json(users);
    })

})

router.get('/user', (req,res) =>{
    console.log("Fetching all users ")
    //fetch data from mysql
    const connection  = getConnection()

    const userId = req.params.id
    const querystring = "SELECT * FROM users"
    connection.query(querystring,(err,rows,fields) => {
        if (err){ 
            console.log("****Error :  " + err)
            res.sendStatus(500)
            return
        }
        console.log("successfully user fetched ")
        const users = rows.map((row) => {
            return {ID: row.id, firstName: row.fname, lastName: row.lname}
        })
        res.json(users);
    })

})

module.exports = router
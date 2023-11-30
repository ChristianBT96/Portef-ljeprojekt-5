const express = require("express");
const mysql = require("mysql2");
const cors = require("cors");

const app = express();
const port = 3000;

app.use(cors());
//Host, user, password database
const connection = mysql.createConnection({
    host: 'localhost',
    port: 3306,
    user: 'root',
    password: '',
    database: 'pokemon'
})

app.listen(port, () =>{
    console.log(`Application is now running on port ${port}`);
});


//  Assignment -- Portfolio 5

//  DATABASE //
// Using three tables in the database
// Three tables cafes, users, favorites //
// The favorites table is a join table between cafes and users

// Table -- cafes //
// cafe_id -- int
// name -- varchar
// city -- varchar
// size -- varchar
// atmosphere -- varchar
// wifi -- boolean
// music -- boolean
// coffee_quality -- varchar
// food_price -- varchar

// Table -- users //
// user_id -- int
// username -- varchar
// password -- varchar
// email -- varchar
// first_name -- varchar
// last_name -- varchar
// date_of_birth -- date

// Table -- favorites //
// favorite_id -- int
// user_id -- int
// cafe_id -- int
// FOREIGN KEY (user_id) REFERENCES users(user_id)
// FOREIGN KEY (cafe_id) REFERENCES cafes(cafe_id)




// Need endpoint for all the data of the cafes and users
// Need endpoint for all the data of the favorites

// Specific endpoint for the data of a specific cafe/user/favorite








app.get('/all',(req, res)=>{
    connection.query('SELECT * FROM ',(error,results)=>{
        res.send(results);
    });
});


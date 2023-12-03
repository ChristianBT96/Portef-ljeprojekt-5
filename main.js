// Loading the required modules
const express = require("express");
const mysql = require("mysql2");
const cors = require("cors");
// Creating the application
const app = express();
// Setting the port
const port = 3000;
// Using cors and express.json
app.use(express.json());
app.use(cors());

//Host, user, password database
const connection = mysql.createConnection({
    host: 'localhost',
    port: 3306,
    user: 'root',
    password: 'Espergærde30602',
    database: 'portefølje_5'
})
// Starting the application
app.listen(port, () =>{
    console.log(`Application is now running on port ${port}`);
});


//  Assignment -- Portfolio 5

//  DATABASE //
// Using three tables in the database

// Three tables cafes, users, favorites //
// The favorites table is a join table between cafes and users

    // Table -- cafes //
// cafe_id -- int (primary key)
// name -- varchar
// city -- varchar
// size -- varchar
// atmosphere -- varchar
// wifi -- boolean
// music -- boolean
// coffee_quality -- varchar
// food_price -- varchar

    // Table -- users //
// user_id -- int (primary key)
// username -- varchar
// password -- varchar
// email -- varchar
// first_name -- varchar
// last_name -- varchar
// date_of_birth -- date

    // Table -- favorites //
// user_id -- int
// cafe_id -- int
// comment -- varchar
// PRIMARY KEY (user_id, cafe_id) // Using the two primary keys from the other tables to create a composite key
// FOREIGN KEY (user_id) REFERENCES users(user_id)
// FOREIGN KEY (cafe_id) REFERENCES cafes(cafe_id)




// Need endpoint for all the data of the cafes and users
// Need endpoint for all the data of the favorites

// Specific endpoint for the data of a specific cafe/user/favorite




        // // // // // // // // // //
            // GET ENDPOINTS //
        // // // // // // // // // //


// // // // // // // // // // // // // // // //
    // GET ENDPOINTS FOR THE CAFES TABLE //
// // // // // // // // // // // // // // // //

// Endpoint for all the data of the cafes
// /cafes
app.get('/cafes/all',(req, res)=>{
    connection.query('SELECT * FROM cafes',(error,results)=>{
        res.send(results);
    });
});

// Endpoint for a specific cafe
// /cafes/:cafe_id
app.get('/cafes/:cafe_id',(req, res)=>{
    // Get the cafe_id from the request parameters
    const cafe_id = req.params.cafe_id;
    // Query the database for the cafe with the cafe_id
    connection.query('SELECT * FROM cafes WHERE cafe_id = ?',
        [cafe_id]
        ,(error,results)=>{
            if(results.length === 0) {
                res.status(404).send("Cafe not found in database");
            } else {
                res.send(results);
            }
        });
});

// Endpoint for all the cafes in a specific city
// /cafes/city/:city

app.get('/cafes/city/:city',(req, res)=>{
    // Get the city from the request parameters
    const city = req.params.city;
    // Query the database for the cafes in the city
    connection.query('SELECT * FROM cafes WHERE city = ?',
        [city]
        ,(error,results)=>{
            if(results.length === 0) {
                res.status(404).send("No cafes found in city");
            } else {
                res.send(results);
            }
        });
});

// Endpoint for all the cafes with a specific size
// /cafes/size/:size

app.get('/cafes/size/:size',(req, res)=>{
    // Get the size from the request parameters
    const size = req.params.size;
    // Query the database for the cafes with the size
    connection.query('SELECT * FROM cafes WHERE size = ?',
        [size]
        ,(error,results)=>{
            if(results.length === 0) {
                res.status(404).send("No cafes found with size");
            } else {
                res.send(results);
            }
        });
});


// Dynamic query endpoint for cafes
// /cafes?key=value
app.get('/cafes', (req, res) => {

    // Get the query parameters from the request
    const queryParameters = req.query;
    // Get the keys from the query parameters
    const whereClauseKeys = Object.keys(queryParameters)
    // Create an array of usable sql clauses
    const usableSqlKeyClausesArray = whereClauseKeys.map(key => {
        return `${key} = ?`
    })

    // If no parameters are provided, send an error message
    if (usableSqlKeyClausesArray.length === 0) {
        res.status(400).send("No parameters provided");
    } else {
        // Get the values from the query parameters
        const queryValueArray = Object.values(queryParameters);
        // Query the database for the cafes with the query parameters
        connection.query(`SELECT * FROM cafes WHERE ${usableSqlKeyClausesArray.join(' AND ')}`, queryValueArray, (error, results) => {
            if (results.length === 0) {
                res.status(404).send("No cafe(s) found");
            } else {
                res.send(results);
            }
        });
    }

});



// // // // // // // // // // // // // // // //
    // GET ENDPOINTS FOR THE USERS TABLE //
// // // // // // // // // // // // // // // //

// Endpoint for all the data of the users
app.get('/users/all',(req, res)=>{
    connection.query('SELECT * FROM users',(error,results)=>{
        res.send(results);
    });
});

// Endpoint for a specific user
// /users/:user_id
app.get('/users/:user_id',(req, res)=>{
    const user_id = req.params.user_id;

    connection.query('SELECT * FROM users WHERE user_id = ?',
        [user_id]
        ,(error,results)=>{
            if(results.length === 0) {
                res.status(404).send("User not found in database");
            } else {
                res.send(results);
            }
        });
});

// Dynamic query endpoint for users
// /users?key=value
app.get('/users', (req, res) => {

        // Get the query parameters from the request
        const queryParameters = req.query;
        // Get the keys from the query parameters
        const whereClauseKeys = Object.keys(queryParameters)
        // Create an array of usable sql clauses
        const usableSqlKeyClausesArray = whereClauseKeys.map(key => {
            return `${key} = ?`
        })

        // If no parameters are provided, send an error message
        if (usableSqlKeyClausesArray.length === 0) {
            res.status(400).send("No parameters provided");
        } else {
            // Get the values from the query parameters
            const queryValueArray = Object.values(queryParameters);
            // Query the database for the users with the query parameters
            connection.query(`SELECT * FROM users WHERE ${usableSqlKeyClausesArray.join(' AND ')}`, queryValueArray, (error, results) => {
                if (results.length === 0) {
                    res.status(404).send("No user(s) found");
                } else {
                    res.send(results);
                }
            });
        }

});

// // // // // // // // // // // // // // // // //
    // GET ENDPOINTS FOR THE FAVORITES TABLE //
// // // // // // // // // // // // // // // // //

// Endpoint for all the data of the favorites
app.get('/favorites/all', (req, res) => {
    connection.query('SELECT * FROM favorites', (error, results) => {
        res.send(results);
    });
})

// Endpoint for all the favorites of a specific user
// /favorites/:user_id
app.get('/favorites/:user_id', (req, res) => {
    const user_id = req.params.user_id;

    connection.query('SELECT * FROM favorites WHERE user_id = ?',
        [user_id]
        , (error, results) => {
            if (results.length === 0) {
                res.status(404).send("User not found in database");
            } else {
                res.send(results);
            }
        });
});


// Dynamic query endpoint for favorites
// /favorites?key=value

app.get('/favorites', (req, res) => {
    // Get the query parameters from the request
    const queryParameters = req.query;
    // Get the keys from the query parameters
    const whereClauseKeys = Object.keys(queryParameters)
    // Create an array of usable sql clauses
    const usableSqlKeyClausesArray = whereClauseKeys.map(key => {
        return `${key} = ?`
    })

    // If no parameters are provided, send an error message
    if (usableSqlKeyClausesArray.length === 0) {
        res.status(400).send("No parameters provided");
    } else {
        // Get the values from the query parameters
        const queryValueArray = Object.values(queryParameters);
        // Query the database for the users with the query parameters
        connection.query(`SELECT * FROM favorites WHERE ${usableSqlKeyClausesArray.join(' AND ')}`, queryValueArray, (error, results) => {
            if (results.length === 0) {
                res.status(404).send("No favorite found");
            } else {
                res.send(results);
            }
        });
    }
});





        // // // // // // // // // //
            // POST ENDPOINTS //
        // // // // // // // // // //


// // // // // // // // // // // // // // // // //
    // POST ENDPOINTS FOR THE CAFES TABLE //
// // // // // // // // // // // // // // // // //

// Endpoint for a new cafe
// /cafes/new
app.post('/cafes/new',(req,res)=>{
    const name = req.body.name;
    const city = req.body.city;
    const size = req.body.size;
    const atmosphere = req.body.atmosphere;
    const wifi = req.body.wifi;
    const music = req.body.music;
    const coffee_quality = req.body.coffee_quality;
    const food_price = req.body.food_price;

    // First check if the cafe already exists in the database
    connection.query('SELECT * FROM cafes WHERE name = ? and city = ?',
        [name, city],
        (error, results) => {
            if (results.length === 0) {
                // If it doesn't exist, add the cafe to the database
                connection.query('INSERT INTO cafes (name, city, size, atmosphere, wifi, music, coffee_quality, food_price) VALUES (?,?,?,?,?,?,?,?)',
                    [name, city, size, atmosphere, wifi, music, coffee_quality, food_price],
                    (error, results) => {
                        res.send("Cafe added to database");
                    });
            } else {
                // If it does exist, send an error message
                res.status(418).send("Cafe already exists in database");
            }
        });
});


// // // // // // // // // // // // // // // // //
    // POST ENDPOINTS FOR THE USERS TABLE //
// // // // // // // // // // // // // // // // //

// Endpoint for a new user
// /users/new
app.post('/users/new',(req,res)=>{
    const username = req.body.username;
    const password = req.body.password;
    const email = req.body.email;
    const first_name = req.body.first_name;
    const last_name = req.body.last_name;
    const date_of_birth = req.body.date_of_birth;

    // First check if the username or email already exists in the database
    connection.query('SELECT * FROM users WHERE username = ? or email = ?',
        [username, email],
        (error, results) => {
            if (results.length === 0) {
                // If it doesn't exist, add the user to the database
                connection.query('INSERT INTO users (username, password, email, first_name, last_name, date_of_birth) VALUES (?,?,?,?,?,?)',
                    [username, password, email, first_name, last_name, date_of_birth],
                    (error, results) => {
                        res.send(results + "User added to database");
                    });
            } else {
                // If it does exist, send an error message
                res.status(418).send("Username or email already exists in database");
            }
        });
});



// // // // // // // // // // // // // // // // // //
    // POST ENDPOINTS FOR THE FAVORITES TABLE //
// // // // // // // // // // // // // // // // // //

// Endpoint for a user to add a cafe to their favorites
// /users/:user_id/favorites/new
app.post('/favorites/new',(req,res)=>{

    const user_id = req.body.user_id;
    const cafe_id = req.body.cafe_id;
    const comment = req.body.comment;


    // First check if the user already has the cafe in their favorites
    connection.query('SELECT * FROM favorites WHERE user_id = ? and cafe_id = ?',
        [user_id, cafe_id],
        (error, results) => {
            if (results.length === 0) {
                // If it doesn't exist, add the favorite to the database
                connection.query('INSERT INTO favorites (user_id, cafe_id, comment) VALUES (?,?,?)',
                    [user_id, cafe_id, comment],
                    (error, results) => {
                        res.send("Favorite added to database");
                    });
            } else {
                // If it does exist, send an error message
                res.status(418).send("Favorite already exists in database");
            }
        });

});





        // // // // // // // // // //
            // MISC ENDPOINTS //
        // // // // // // // // // //

// Endpoint for a list of all endpoints
app.get('/endpoints', (req, res) => {
   res.send('WIP'); // Make a list of all endpoints, when all endpoints have been made.
});

// Catch all endpoint if the user tries to access a non-existing endpoint
app.get('*', (req, res) => {
    res.status(404).send("Endpoint does not exist and could try the '/endpoints' for a list of valid endpoints");
});




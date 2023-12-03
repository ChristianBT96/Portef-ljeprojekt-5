-- Creating the database
create database portefølje_5;
-- Using the database
use portefølje_5;

-- Creating Cafes Table
CREATE TABLE cafes (
    cafe_id INT PRIMARY KEY AUTO_INCREMENT,
    name VARCHAR(255) NOT NULL,
    city VARCHAR(100) NOT NULL,
    size VARCHAR(50),
    atmosphere VARCHAR(50),
    wifi BOOLEAN,
    music BOOLEAN,
    coffee_quality VARCHAR(50),
    food_price VARCHAR(50)
);

-- Creating Users Table
CREATE TABLE users (
    user_id INT PRIMARY KEY AUTO_INCREMENT,
    username VARCHAR(50) NOT NULL,
    password VARCHAR(255) NOT NULL,
    email VARCHAR(100) NOT NULL,
    first_name VARCHAR(100) NOT NULL,
    last_name VARCHAR(100) NOT NULL,
    date_of_birth DATE NOT NULL
);

-- Creating Favorites Table
CREATE TABLE favorites (
    user_id INT,
    cafe_id INT,
    comment VARCHAR(255),
    PRIMARY KEY (user_id, cafe_id),
    FOREIGN KEY (user_id) REFERENCES users(user_id) ON DELETE CASCADE,
    FOREIGN KEY (cafe_id) REFERENCES cafes(cafe_id) ON DELETE CASCADE
);

-- Inserting test cafes
INSERT INTO cafes (name, city, size, atmosphere, wifi, music, coffee_quality, food_price)
VALUES
    ('Cafe Copenhagen', 'Copenhagen', 'Medium', 'Cozy', true, true, 'High', 'Moderate'),
    ('Nordic Brews', 'Aalborg', 'Small', 'Relaxed', true, false, 'Medium', 'Affordable'),
    ('Aarhus Beans', 'Aarhus', 'Large', 'Energetic', true, true, 'High', 'Expensive');

-- Inserting test users
INSERT INTO users (username, password, email, first_name, last_name, date_of_birth)
VALUES
    ('user1', 'password1', 'user1@example.com', 'John', 'Doe', '1990-01-01'),
    ('user2', 'password2', 'user2@example.com', 'Jane', 'Smith', '1985-05-15'),
    ('user3', 'password3', 'user3@example.com', 'Alice', 'Johnson', '1995-08-20');

-- Inserting test favorites
INSERT INTO favorites (user_id, cafe_id, comment)
VALUES
    (1, 2, "Great atmosphere"),
    (2, 3, "Lovely staff"),
    (3, 1, "The wait time is very low");

select * from cafes;
select * from users;
select * from favorites;

SET SQL_SAFE_UPDATES = 0;

delete from favorites where user_id = 2;

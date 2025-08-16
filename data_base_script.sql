-- Drop tables if they already exist to ensure a clean start (useful for testing)
DROP TABLE IF EXISTS cumplenda.birthdays;
DROP TABLE IF EXISTS cumplenda.users;

-- Creates the 'users' table with improved conventions
CREATE TABLE cumplenda.users (
    id INT AUTO_INCREMENT PRIMARY KEY,
    email VARCHAR(60) NOT NULL UNIQUE,
    password VARCHAR(255) NOT NULL,
    first_name VARCHAR(45) NOT NULL,
    last_name VARCHAR(45), -- Correctly nullable for optional last names
    -- Timestamps managed automatically by MySQL
    created_at DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    updated_at DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
);

-- Creates the 'birthdays' table with improved conventions and performance index
CREATE TABLE cumplenda.birthdays (
    id INT AUTO_INCREMENT PRIMARY KEY,
    first_name VARCHAR(45) NOT NULL,
    last_name VARCHAR(45), -- Correctly nullable for optional last names
    birthday_date DATE NOT NULL,
    notify TINYINT(1) NOT NULL DEFAULT 1,
    notes VARCHAR(200),
    user_id INT NOT NULL,

    -- Timestamps managed automatically by MySQL
    created_at DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    updated_at DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    
    -- Foreign key constraint for data integrity
    FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE,
    
    -- Index for faster sorting and filtering by birthday date
    INDEX idx_birthday_date (birthday_date)
);



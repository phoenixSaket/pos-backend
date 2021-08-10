const sqlite3 = require('sqlite3').verbose();

const DBSOURCE = "db.sqlite";

let db = new sqlite3.Database(DBSOURCE, (err) => {
    if (err) {
        console.log("ERROR : " + err.message);
        throw err;
    } else {
        console.log('Connected to the SQLite database.')

    }
})


// User Table
db.run(`CREATE TABLE user (
    user_id INTEGER PRIMARY KEY AUTOINCREMENT,
    profile_id INTEGER, 
    contact_id INTEGER,
    account_id INTEGER,
    purchase_id INTEGER,
    username TEXT NOT NULL,
    password NOT NULL,
    FOREIGN KEY(profile_id) REFERENCES profile (profile_id),
    FOREIGN KEY(contact_id) REFERENCES contact (contact_id), 
    FOREIGN KEY(account_id) REFERENCES account (account_id), 
    FOREIGN KEY(purchase_id) REFERENCES purchase (purchase_id)
    )`,
    (err) => {
        if (err) {
            // Table already created
            // console.log("Table found : user")
        } else {
            // Table just created, creating some rows
            // console.log("Table created : user")
        }
    });

// Profile Table
db.run(`CREATE TABLE profile (
        profile_id INTEGER PRIMARY KEY AUTOINCREMENT,
        profile_fname TEXT NOT NULL,
        profile_lname TEXT,
        profile_gender TEXT,
        profile_age INTEGER,
        profile_photo TEXT
        )`,
    (err) => {
        if (err) {
            // Table already created
            // console.log("Table found : profile")
        } else {
            // Table just created, creating some rows
            // console.log("Table created : profile")
        }
    });

// Contact Table
db.run(`CREATE TABLE contact (
        contact_id INTEGER PRIMARY KEY AUTOINCREMENT,
        contact_mobile TEXT,
        contact_landline TEXT,
        contact_email TEXT
        )`,
    (err) => {
        if (err) {
            // Table already created
            // console.log("Table found : contact")
        } else {
            // Table just created, creating some rows
            // console.log("Table created : contact")
        }
    });

// Account Table
db.run(`CREATE TABLE account (
    account_id INTEGER PRIMARY KEY AUTOINCREMENT,
    account_to_receive INTEGER,
    account_received INTEGER,
    account_to_receive_date TEXT,
    account_received_date TEXT
    )`,
    (err) => {
        if (err) {
            // Table already created
            // console.log("Table found : account")
        } else {
            // Table just created, creating some rows
            // console.log("Table created : account")
        }
    });

// Purchase Table
db.run(`CREATE TABLE purchase (
    purchase_id INTEGER PRIMARY KEY AUTOINCREMENT,
    purchase_date TEXT,
    purchase_type TEXT,
    transaction_id INTEGER,
    FOREIGN KEY (transaction_id) REFERENCES trans (transaction_id)
    )`,
    (err) => {
        if (err) {
            // Table already created
            // console.log("Table found : purchase")
        } else {
            // Table just created, creating some rows
            // console.log("Table created : purchase")
        }
    });

// Product Table
db.run(`CREATE TABLE product (
    product_id INTEGER PRIMARY KEY AUTOINCREMENT,
    product_profile_id INTEGER,
    product_sold_unit INTEGER,
    product_in_stock_unit INTEGER,
    product_remaining_unit INTEGER,
    product_last_stocked_on TEXT,
    FOREIGN KEY (product_profile_id) REFERENCES product_profile (product_profile_id)
    )`,
    (err) => {
        if (err) {
            // Table already created
            // console.log("Table found : product")
        } else {
            // Table just created, creating some rows
            // console.log("Table created : product")
        }
    });

// Product Profile Table
db.run(`CREATE TABLE product_profile (
    product_profile_id INTEGER PRIMARY KEY AUTOINCREMENT,
    product_profile_name TEXT,
    product_profile_type TEXT,
    product_profile_description TEXT,
    product_profile_retail_price INTEGER,
    product_profile_wholesale_price INTEGER,
    product_profile_cost_price INTEGER,
    product_profile_photo TEXT
    )`,
    (err) => {
        if (err) {
            // Table already created
            // console.log("Table found : product_profile")
        } else {
            // Table just created, creating some rows
            // console.log("Table created : product_profile")
        }
    });

// Transaction Table
db.run(`CREATE TABLE trans (
    transaction_id INTEGER PRIMARY KEY AUTOINCREMENT,
    user_id INTEGER,
    product_id INTEGER,
    transaction_date TEXT,
    FOREIGN KEY (user_id) REFERENCES user (user_id),
    FOREIGN KEY (product_id) REFERENCES product (product_id)
    )`,
    (err) => {
        if (err) {
            // Table already created
            // console.log("Table found : transaction")
        } else {
            // Table just created, creating some rows
            // console.log("Table created : transaction")
        }
    });


module.exports = db;
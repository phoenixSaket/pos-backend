const express = require('express');
const path = require('path');
const db = require("./database.js")
const md5 = require("md5")
const bodyParser = require("body-parser");
const app = express();

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());


app.get('/', function(req, res) {
    res.send('POS BACKEND SERVER RUNNING !');
});

app.get("/user/data/:id", (req, res, next) => {
    let sql = "SELECT * from user WHERE user_id = ?";
    let params = [req.params.id];

    db.get(sql, params, (err, row) => {
        console.log(row);
        if (err) {
            res.status(400).json({ "error": err.message });
            return;
        }
        res.json({
            "message": "success",
            "data": row
        })
    })
});

app.post("/user/create/", (req, res, next) => {

    let serviceCallErrors = [];
    let sqlProfile = "";
    let sqlContact = "";
    let sqlAccount = "";

    let columnsMain = "";
    let valuesMain = "";

    {
        let columns = [];
        let values = [];
        if (req.body.profile.fname) {
            columns.push("profile_fname");
            values.push(JSON.stringify(req.body.profile.fname));
        }
        if (req.body.profile.lname) {
            columns.push("profile_lname");
            values.push(JSON.stringify(req.body.profile.lname));
        }
        if (req.body.profile.gender) {
            columns.push("profile_gender");
            values.push(JSON.stringify(req.body.profile.gender));
        }
        if (req.body.profile.age) {
            columns.push("profile_age");
            values.push(JSON.stringify(req.body.profile.age));
        }
        if (req.body.profile.photo) {
            columns.push("profile_photo");
            values.push(JSON.stringify(req.body.profile.photo));
        }

        let strColumns = columns.join(",");
        let strValues = values.join(",");

        // strValues = JSON.stringify(strValues);
        sqlProfile = "INSERT INTO profile (" + strColumns + ") VALUES (" + strValues + ")";
        console.log(sqlProfile);
        db.run(sqlProfile, (err, result, lastID) => {

            console.log(lastID);
            console.log(result);
            if (err) {
                res.status(400).json({ "Error : ": err.message });
                serviceCallErrors.push(err.message);
                return;
            }
            res.json({
                "message": "success",
                "profile_id": this.lastID,
            })
        });
        // db.close();
    }

    // {
    //     let columns = [];
    //     let values = [];
    //     if (req.body.contact.mobile) {
    //         columns.push("contact_mobile");
    //         values.push(JSON.stringify(req.body.contact.mobile));
    //     }
    //     if (req.body.contact.landline) {
    //         columns.push("contact_landline");
    //         values.push(JSON.stringify(req.body.contact.landline));
    //     }
    //     if (req.body.contact.email) {
    //         columns.push("contact_email");
    //         values.push(JSON.stringify(req.body.contact.email));
    //     } else {
    //         serviceCallErrors.push("Email not found [contact]");
    //         return;
    //     }

    //     let strColumns = columns.join(",");
    //     columnsMain = columnsMain + strColumns;
    //     let strValues = values.join(",");
    //     valuesMain = valuesMain + strValues;
    //     // strValues = JSON.stringify(strValues);
    //     // sqlContact = "INSERT INTO profile contact (" + strColumns + ") VALUES (" + strValues + ")";
    //     // db.run(sqlContact, (err, result) => {
    //     //     if (err) {
    //     //         res.status(400).json({ "Error : ": err.message });
    //     //         serviceCallErrors.push(err.message);
    //     //         return;
    //     //     }
    //     //     res.json({
    //     //         "message": "success",
    //     //         "contact_id": this.lastID
    //     //     })
    //     // });
    // }

    // {
    //     let columns = [];
    //     let values = [];
    //     if (req.body.account.to_receive) {
    //         columns.push("account_to_receive");
    //         values.push(JSON.stringify(req.body.account.to_receive));
    //     }
    //     if (req.body.account.received) {
    //         columns.push("account_received");
    //         values.push(JSON.stringify(req.body.account.received));
    //     }

    //     let strColumns = columns.join(",");
    //     columnsMain = columnsMain + strColumns;
    //     let strValues = values.join(",");
    //     valuesMain = valuesMain + strValues;

    //     sqlAccount = "INSERT INTO profile INNER JOIN contact INNER JOIN account (" + strColumns + ") VALUES (" + strValues + ")";

    //     db.run(sqlAccount, (err, result) => {
    //         if (err) {
    //             res.status(400).json({ "Error : ": err.message });
    //             serviceCallErrors.push(err.message);
    //             return;
    //         }
    //         res.json({
    //             "message": "success",
    //             "account_id": this.lastID
    //         })
    //     });
    // }

    if (serviceCallErrors.length == 0) {

    }
})



let server = app.listen(8080, function() {
    const port = server.address().port;
    console.log("Server started at http://localhost:" + port)
});

app.use(function(req, res) {
    res.status(404);
});


module.exports = app;
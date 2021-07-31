const mysql = require('mysql');
const express = require('express');
const bodyparser = require('body-parser');

var app = express();
//Configuring express server
app.use(bodyparser.json());
app.use(bodyparser.urlencoded({ extended: true }));


var mysqlConnection = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: '',
    database: 'learners',
    multipleStatements: true
})


mysqlConnection.connect((err) => {
    if (!err)
        console.log('Connection Established Successfully');
    else
        console.log('Connection Failed!' + JSON.stringify(err, undefined, 2));
});

app.get('/learners', (req, res) => {
    mysqlConnection.query('SELECT * FROM students', (err, rows, fields) => {
        if (!err)
            res.send(rows);
        else
            console.log(err);
    })
});

app.get('/learners/:id', (req, res) => {
    mysqlConnection.query('SELECT * FROM students WHERE id = ?', [req.params.id], (err, rows, fields) => {
        if (!err)
            res.send(rows);
        else
            console.log(err);
    })
});

app.post('/learners', (req, res) => {

    mysqlConnection.query('INSERT INTO `students` (`name`, `email`) VALUES( ? , ? )', [name, email], (err, rows, fields) => {
        if (!err)
            rows.forEach(element => {
                if (element.constructor == Array)
                    res.send('New Learner ID : ' + element[0].id);
            });
        else
            console.log(err);
    })
});

app.delete('/learners/:id', (req, res) => {
    mysqlConnection.query('DELETE FROM students WHERE id = ?', [req.params.id], (err, rows, fields) => {
        if (!err)
            res.send('Learner Record deleted successfully.');
        else
            console.log(err);
    })
});

app.put('/learners', (req, res) => {
    let learner = req.body;
    var sql = "UPDATE `students` SET `name`=?,`email`=? WHERE ?";

    mysqlConnection.query(sql, [learner.learner_id, learner.learner_name, learner.learner_email, learner.course_Id], (err, rows, fields) => {
        if (!err)
            res.send('Learner Details Updated Successfully');
        else
            console.log(err);
    })
});



app.listen(3000, () => console.log(`Listening on port 3000..`));
const express = require('express');
var nodemailer = require('nodemailer');
var path = require('path');
require('dotenv').config();
var billing_email = require('express-email')(__dirname + '/email/billing');
const app = express();
const multer = require("multer");
const bodyParser = require('body-parser');
const cors = require('cors');
const mongoose = require('mongoose');
const todoRoutes = express.Router();
const PORT = process.env.PORT || 4000;
let User = require('./User.model');
let Beds = require('./Beds.model');
let Customer = require('./Customer.model');
let Star = require('./Star.model');
app.use(cors());
app.use(bodyParser.json());
app.use('/static', express.static('public'))
mongoose.connect('mongodb://127.0.0.1:27017/RUNWELL', { useNewUrlParser: true });
const connection = mongoose.connection;
connection.once('open', function () {
    console.log("MongoDB database connection established successfully");
})

var date;
var inputDate;
const storage = multer.diskStorage({
    destination: "./frontend_React/build/static/media/",
    filename(req, file, cb) {
        date = new Date();
        inputDate = date.getFullYear() + "-" + date.getMonth() + "-" + date.getDate() + "-" + date.getDay() + "-" + date.getHours()
        console.log(file);
        cb(null, inputDate + "-" + file.originalname);
    }
});

const upload = multer({ storage });

app.post('/addBeds', upload.single('file1'), function (req, res) {
    console.log(req.body);
    console.log("file name:", inputDate + "-");
    console.log(req.files);

    if (req.body.address1 != null && req.body.address2 != null && req.body.managername != null && req.body.manageremail != null && req.body.managerphoneNumber != null && req.body.stars != null && req.body.bedcount != null && req.body.mainimage != null && req.body.bedimage1 != null && req.body.bedimage2 != null) {
        let beds = new Beds(req.body);
        beds.save()
            .then(todo => {
                res.status(200).json({
                    'status': 200,
                    'message': 'todo added successfully',
                    'data': 'successfully'
                });
            })
            .catch(err => {
                res.status(401).json({
                    'status': 401,
                    'message': 'todo added failed',
                    'data': 'flase'
                });
            });

    } else {
        res.status(400).json({
            'status': 400,
            'message': 'please input all field or correct value',
            'data': 'flase'
        });
    }
});

app.post('/editBeds', upload.single('editFile1'), function (req, res) {
    console.log(req.body);
    console.log("file name:", inputDate + "-");
    console.log(req.files);

    let id = req.body.editID
    console.log("req :", id)

    Beds.findById(id, function (err, beds) {
        if (err) console.log("err ; ", err)
        console.log("doc : ", beds)

        beds.address1 = req.body.address1;
        beds.address2 = req.body.address2;
        beds.description = req.body.description;
        beds.mainimage = req.body.mainimage;
        beds.bedimage1 = req.body.bedimage1;
        beds.bedimage2 = req.body.bedimage2;
        beds.save(() => {
            res.send("sccesss")
        });
    });


});

todoRoutes.route('/start').post(function (req, res) {
    let newUser = new User(req.body);
    User.find(function (err, user) {
        console.log("user start  ;", err, user);
        if (err) {
            console.log("error : ", err)
            res.status(200).json({ 'todo': 'failed' });
        } else {
            if (user.length == 0) {
                console.log("here length is", user.length);
                newUser.save()
                    .then(todo => {
                        res.status(200).json({ 'todo': 'todo added successfully' });
                    })
                    .catch(err => {
                        res.status(400).send('adding new todo failed');
                    });
            } else {
                res.status(200).json({ 'todo': 'todo added successfully' });
            }
        }
    });
});

todoRoutes.route('/login').post(function (req, res) {
    User.findOne({ email: req.body.email, password: req.body.password }, function (err, user) {
        if (err) {
            res.status(401).json({
                'status': 401,
                'message': 'failed',
                'data': err
            });
            console.log("err->", err);
        } else {
            res.status(200).json({
                'status': 200,
                'message': 'success',
                'data': user
            });
            console.log("err->", user);

        }
    });
});

todoRoutes.route('/signup').post(function (req, res) {
    console.log("request : ", req.body)
    if (req.body.firstName != null && req.body.lastName != null && req.body.email != null && req.body.password != null && req.body.phoneNumber != null && req.body.flag != null) {
        let user = new User(req.body);
        user.save()
            .then(todo => {
                res.status(200).json({
                    'status': 200,
                    'message': 'todo added successfully',
                    'data': 'successfully'
                });
            })
            .catch(err => {
                res.status(401).json({
                    'status': 401,
                    'message': 'todo added failed',
                    'data': 'flase'
                });
            });
    } else {
        res.status(400).json({
            'status': 400,
            'message': 'please input all field or correct value',
            'data': 'flase'
        });
    }
});

todoRoutes.route('/addMember').post(function (req, res) {
    if (req.body.address1 != null && req.body.address2 != null && req.body.managername != null && req.body.firstName != null && req.body.lastName != null && req.body.AdmitDate != null) {
        let customers = new Customer(req.body);
        customers.save()
            .then(todo => {
                res.status(200).json({
                    'status': 200,
                    'message': 'todo added successfully',
                    'data': 'successfully'
                });
                console.log("request : ", req.body)
            })
            .catch(err => {
                res.status(401).json({
                    'status': 401,
                    'message': 'todo added failed',
                    'data': 'flase'
                });
            });
    } else {
        res.status(400).json({
            'status': 400,
            'message': 'please input all field or correct value',
            'data': 'flase'
        });
    }
});

todoRoutes.route('/addStar').post(function (req, res) {
    if (req.body.address1 != null && req.body.address2 != null && req.body.manageremail != null && req.body.rating != null && req.body.username != null) {
        let star = new Star(req.body);
        star.save()
            .then(todo => {
                res.status(200).json({
                    'status': 200,
                    'message': 'todo added successfully',
                    'data': 'successfully'
                });
                console.log("request : ", req.body)
            })
            .catch(err => {
                res.status(401).json({
                    'status': 401,
                    'message': 'todo added failed',
                    'data': 'flase'
                });
            });
    } else {
        res.status(400).json({
            'status': 400,
            'message': 'please input all field or correct value',
            'data': 'flase'
        });
    }
});

todoRoutes.route('/Starshow').post(function (req, res) {
    Star.find(function (err, star) {
        console.log(star.manageremail);
        if (err) {
            console.log("err->", err);
        } else {
            res.json(star);

        }
    });
});

todoRoutes.route('/Usershow').post(function (req, res) {
    User.find(function (err, user) {
        console.log(user.name);
        if (err) {
            console.log("err->", err);
        } else {
            res.json(user);

        }
    });
});

todoRoutes.route('/Bedshow').post(function (req, res) {
    Beds.find(function (err, beds) {
        console.log(beds.address1);
        if (err) {
            console.log("err->", err);
        } else {
            res.json(beds);

        }
    });
});

todoRoutes.route('/CustomerShow').post(function (req, res) {
    Customer.find(function (err, customer) {
        console.log(customer.address1);
        if (err) {
            console.log("err->", err);
        } else {
            res.json(customer);

        }
    });
});

todoRoutes.route('/BedCustomerDel/:id').delete(
    function (req, res) {
        let id = req.params.id;
        console.log(id);
        Customer.deleteOne({ _id: id }, function (err, customer) {
            res.json(customer);
        })
    }
);

todoRoutes.route('/BedsUpdateIncrease/:id').post(function (req, res) {
    let id = req.url.split('/')[2]
    console.log("req :", id)

    Beds.findById(id, function (err, beds) {
        if (err) console.log("err ; ", err)
        console.log("doc : ", beds)
        beds.realcount = eval(beds.realcount) + 1.0;
        beds.freecount = beds.freecount - 1;
        beds.save(() => {
            res.send("sccesss")
        });
    });
});

todoRoutes.route('/BedsUpdateDiscrease/:id').post(function (req, res) {
    let id = req.url.split('/')[2]
    console.log("req :", id)

    Beds.findById(id, function (err, beds) {
        if (err) console.log("err ; ", err)
        console.log("doc : ", beds)
        beds.realcount = beds.realcount - 1;
        beds.freecount = eval(beds.freecount) + 1.0;
        beds.save(() => {
            res.send("sccesss")
        });
    });
});



app.use('/todos', todoRoutes);

if (process.env.NODE_ENV === 'production') {
    // Serve any static files
    app.use(express.static(path.join(__dirname, 'frontend_React/build')));

    // Handle React routing, return all requests to React app
    app.get('*', function (req, res) {
        res.sendFile(path.join(__dirname, 'frontend_React/build', 'index.html'));
    });
}

app.listen(PORT, function () {
    console.log("Server is running on Port: " + PORT);
});

const express = require('express'),
fs = require('fs'),
bodyparser = require('body-parser');
let hospital = require('./controllers/Hospital');
let staff = require('./controllers/Staff');
let doctor = require('./controllers/Doctor');

let app = express();
app.use(bodyparser.json());
app.use(bodyparser.urlencoded({extended: true}));

app.set('view engine', 'pug');

// routes

app.get('/', (req, res) => {
	res.status(200).render('index');
});

app.post('/signup', (req, res) => {
	new hospital(req, res, fs).addHospital();
});

app.get('/u/add-staff', (req, res) => {
	new staff(req, res).addStaff();
});

app.get('/u/add-doctor', (req, res) => {
	new doctor(req, res).addDoctor();
});

app.listen(process.env.PORT || 3000, () => {
	console.log('Server started');
});
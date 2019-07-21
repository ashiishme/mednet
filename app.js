
const express = require('express'),
fs = require('fs'),
bodyparser = require('body-parser');
let hospital = require('./controllers/Hospital'),
staff = require('./controllers/Staff'),
doctor = require('./controllers/Doctor'),
app = express();
app.use(bodyparser.json());
app.use(bodyparser.urlencoded({extended: true}));

app.set('view engine', 'pug');

// routes

app.get('/', (req, res) => {
	res.status(200).render('index');
});

// Hospital
app.post('/signup', (req, res) => {
	new hospital(req, res, fs).addHospital();
});

app.get('/u/hospitals', (req, res) => {
	new hospital(req, res, fs).getHospitals();
});

app.get('/u/hospital/:id', (req, res) => {
	new hospital(req, res, fs).getSingleHospital(req.params.id);
});

// Doctors
app.post('/u/doctor/add-doctor', (req, res) => {
	new doctor(req, res, fs).addDoctor();
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
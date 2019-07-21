
const express = require('express'),
path = require('path'),
fs = require('fs'),
bodyparser = require('body-parser');
let hospital = require('./controllers/Hospital'),
staff = require('./controllers/Staff'),
doctor = require('./controllers/Doctor'),
login = require('./controllers/Login');
app = express();
app.use(bodyparser.json());
app.use(bodyparser.urlencoded({extended: true}));

app.set('view engine', 'pug');
app.set('views', 'views');

app.use(express.static(path.join(path.dirname(process.mainModule.filename), '/assets')));

// routes

app.get('/', (req, res) => {
	res.status(200).render('index');
});

// login

app.get('/login', (req, res) => {
	res.status(200).render('login');
});

app.post('/login', (req, res) => {
	 
});

// signup

app.get('/signup', (req, res) => {
	res.status(200).render('signup');
});

// Hospital
app.post('/add-hospital', (req, res) => {
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
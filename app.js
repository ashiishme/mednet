
const express = require('express'),
path = require('path'),
fs = require('fs'),
bodyparser = require('body-parser');
let hospital = require('./controllers/Hospital'),
staff = require('./controllers/Staff'),
doctor = require('./controllers/Doctor'),
login = require('./controllers/Login'),
patient = require('./controllers/Patient');

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
	 new login(req, res, fs).login();
});

// signup

app.get('/signup', (req, res) => {
	res.status(200).render('signup');
});

// admin

app.get('/u/admin', (req, res) => {
	res.status(200).render('admindash');
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
app.get('/u/add-doctor', (req, res) => {
	res.status(200).render('drdata');
});

app.post('/u/add-doctor', (req, res) => {
	new doctor(req, res, fs).addDoctor();
});

// Staffs

app.get("/u/staff", (req, res) => {
	new doctor(req, res, fs).getDoctors();
});

app.get('/u/add-staff', (req, res) => {
	res.status(200).render('staff');
});

app.post('/u/add-staff', (req, res) => {
	new staff(req, res, fs).addStaff();
});

// Patient

app.post('/u/add-patient', (req, res) => {
	new patient(req, res, fs).addPatient();
});

app.get('/u/patient/', (req, res) => {
	res.status(200).render('patient');
});

app.post('/u/patient/data', (req, res) => {
	new patient(req, res, fs).getSinglePatient();
});

app.listen(process.env.PORT || 3000, () => {
	console.log('Server started');
});
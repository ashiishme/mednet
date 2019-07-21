
class Doctor {

	constructor(req, res, fs) {
		this.req = req;
		this.res = res;
		this.fs = fs;
	}

	getDoctors() {
		this.fs.readFile('./database/doctors.json', 'utf8', (err, data) => {
			if(err) throw err;
			return this.res.json(JSON.parse(data));
		});
	}

	getSingleDoctor(id) {
		if(id != '') {
			this.fs.readFile('./database/doctors.json', 'utf8', (err, data) => {
				if(err) throw err;

				let obj = JSON.parse(data);
				let len = Object.keys(obj.doctors).length;

				for(let i = 0; i < len; i++) {
					if(id == obj.doctors[i].id) {
						this.res.json(obj.doctors[i].id);
					} else {
						this.res.json('not found');
					}
				}
			});
		}
	}

	addDoctor() {
		let object = {doctors: []};
		this.fs.readFile('./database/doctors.json', 'utf8', (err, data) => {
			if(err) throw err;
			if(data) {
				object = JSON.parse(data);
			}
			object.doctors.push({
				nmc: this.req.body.doctor_nmc,
				name: this.req.body.doctor_name,
				qualification: this.req.body.doctor_qualification,
				specialist: this.req.body.doctor_specialist,
				address: this.req.body.doctor_address,
				email: this.req.body.doctor_email,
				number: this.req.body.doctor_number
			});
			let string = JSON.stringify(object, null, 2);
			this.fs.writeFile('./database/doctors.json', string, 'utf8', (err) => {
			if(err) throw err;
			this.res.json('success');
			});
		});
		
	}	

}

module.exports = Doctor;
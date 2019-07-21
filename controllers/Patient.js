
class Patient {

	constructor(req, res, fs) {
		this.req = req;
		this.res = res;
		this.fs = fs;
	}

	getPatient() {
		this.fs.readFile('./database/patients.json', 'utf8', (err, data) => {
			if(err) throw err;
			return this.res.json(JSON.parse(data));
		});
	}

	getSinglePatient(id) {
		if(id != '') {
			this.fs.readFile('./database/patients.json', 'utf8', (err, data) => {
				if(err) throw err;

				let obj = JSON.parse(data);
				let len = Object.keys(obj.patients).length;

				for(let i = 0; i < len; i++) {
					if(id == obj.patients[i].id) {
						this.res.json(obj.patients[i].id);
					} else {
						this.res.json('not found');
					}
				}
			});
		}
	}

	addPatient() {
		let object = {patients: []};
		this.fs.readFile('./database/patients.json', 'utf8', (err, data) => {
			if(err) throw err;
			let _id;
			if(data) {
				object = JSON.parse(data);
				let len = Object.keys(object.patients).length;
				_id = object.patients[len - 1].id + 1;
			}
			object.patients.push({
				id: this.req.body.patient_finger_print,
				name: this.req.body.patient_name,
				gender: this.req.body.patient_gender,
				address: this.req.body.patient_addr,
				dob: this.req.body.patient_dob,
				sickness: this.req.body.patient_sickness,
				assigned_doc: this.req.body.patient_assigned_doctor,
			});
			
			let string = JSON.stringify(object, null, 2);
			this.fs.writeFile('./database/patients.json', string, 'utf8', (err) => {
			if(err) throw err;
			this.res.json('success');
			});
		});
		
	}	

}

module.exports = Patient;
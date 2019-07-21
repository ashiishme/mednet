
class Hospital {

	constructor(req, res, fs) {
		this.req = req;
		this.res = res;
		this.fs = fs;
	}

	getHospitals() {
		this.fs.readFile('./database/hospitals.json', 'utf8', (err, data) => {
			if(err) throw err;
			return this.res.json(JSON.parse(data));
		});
	}

	getSingleHospital(id) {
		if(id != '') {
			this.fs.readFile('./database/hospitals.json', 'utf8', (err, data) => {
				if(err) throw err;

				let obj = JSON.parse(data);
				let len = Object.keys(obj.hospital).length;

				for(let i = 0; i < len; i++) {
					if(id == obj.hospital[i].id) {
						this.res.json(obj.hospital[i].id);
					} else {
						this.res.json('not found');
					}
				}
			});
		}
	}

	addHospital() {
		let object = {hospital: []};
		this.fs.readFile('./database/hospitals.json', 'utf8', (err, data) => {
			if(err) throw err;
			if(data) {
				object = JSON.parse(data);
			}
			object.hospital.push({
				id: this.req.body.hospital_reg_no,
				reg: this.req.body.hospital_reg_no,
				name: this.req.body.hospital_name,
				address: this.req.body.hospital_addr,
				email: this.req.body.hospital_email,
				password: this.req.body.hospital_pass,
				number: this.req.body.hospital_number
			});
			let string = JSON.stringify(object, null, 2);
			this.fs.writeFile('./database/hospitals.json', string, 'utf8', (err) => {
			if(err) throw err;
			this.res.json('success');
			});
		});
		
	}	

}

module.exports = Hospital;
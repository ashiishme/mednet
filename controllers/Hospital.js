
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
		let hospitals = {hospital: []};
		let users = {user: []};
		this.fs.readFile('./database/hospitals.json', 'utf8', (err, data) => {
			if(err) throw err;
			if(data) {
				hospitals = JSON.parse(data);
			}
			hospitals.hospital.push({
				id: this.req.body.hospital_reg_no,
				reg: this.req.body.hospital_reg_no,
				name: this.req.body.hospital_name,
				address: this.req.body.hospital_addr,
				number: this.req.body.hospital_number
			});
			let string = JSON.stringify(hospitals, null, 2);
			this.fs.writeFile('./database/hospitals.json', string, 'utf8', (err) => {
				if(err) throw err;
				this.res.redirect("/u/admin");
			});
		});
		
		this.fs.readFile('./database/users.json', 'utf8', (err, data) => {
			if(err) throw err;
			let _id = 1;
			if(data) {
				users = JSON.parse(data);
				let len = Object.keys(users.user).length;
				_id = users.user[len - 1].id + 1;
			}
			users.user.push({
				id: _id,
				email: this.req.body.user_email,
				password: this.req.body.user_pass,
				type: "admin"
			});
			let string = JSON.stringify(users, null, 2);
			this.fs.writeFile('./database/users.json', string, 'utf8', (err) => {
				if(err) throw err;
				//this.res.json("success");
			});
		});
	}	

}

module.exports = Hospital;
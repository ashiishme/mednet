
class Staff {

	constructor(req, res, fs) {
		this.req = req;
		this.res = res;
		this.fs = fs;
	}

	getStaffs() {
		this.fs.readFile('./database/staffs.json', 'utf8', (err, data) => {
			if(err) throw err;
			return this.res.json(JSON.parse(data));
		});
	}

	getSingleDoctor(id) {
		if(id != '') {
			this.fs.readFile('./database/staffs.json', 'utf8', (err, data) => {
				if(err) throw err;

				let obj = JSON.parse(data);
				let len = Object.keys(obj.staffs).length;

				for(let i = 0; i < len; i++) {
					if(id == obj.staffs[i].id) {
						this.res.json(obj.staffs[i].id);
					} else {
						this.res.json('not found');
					}
				}
			});
		}
	}

	addDoctor() {
		let object = {staffs: []};
		this.fs.readFile('./database/staffs.json', 'utf8', (err, data) => {
			if(err) throw err;
			if(data) {
				object = JSON.parse(data);
			}
			object.staffs.push({
				id: this.req.body.staff_id,
				name: this.req.body.staff_name,
				email: this.req.body.staff_email,
				password: this.req.body.staff_password
			});
			let string = JSON.stringify(object, null, 2);
			this.fs.writeFile('./database/staffs.json', string, 'utf8', (err) => {
			if(err) throw err;
			this.res.json('success');
			});
		});
		
	}	

}

module.exports = Staff;
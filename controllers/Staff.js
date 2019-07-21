
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

	getSingleStaff(id) {
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

	addStaff() {
		let object = {users: []};
		this.fs.readFile('./database/users.json', 'utf8', (err, data) => {
			if(err) throw err;
			let _id;
			if(data) {
				object = JSON.parse(data);
				let len = Object.keys(object.user).length;
				_id = object.user[len - 1].id + 1;
			}
			object.user.push({
				id: _id,
				name: this.req.body.staff_name,
				address: this.req.body.staff_address,
				email: this.req.body.staff_email,
				password: this.req.body.staff_password,
				type: "staff"
			});
			let string = JSON.stringify(object, null, 2);
			this.fs.writeFile('./database/users.json', string, 'utf8', (err) => {
			if(err) throw err;
			return this.res.status(200).render('staff', {success: "Staff added successfully." });
			});
		});
		
	}	

}

module.exports = Staff;
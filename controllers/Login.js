
class Login {

	constructor(req, res, fs) {
		this.req = req;
		this.res = res;
		this.fs = fs;
	}

	login() {
		let email = this.req.body.email;
		let pass = this.req.body.password;
		this.fs.readFile('./database/users.json', 'utf8', (err, data) => {
			if(err) throw err;
			let login_data = JSON.parse(data);
			let len = Object.keys(login_data.user).length;
			for(let i = 0; i < len; i++) {
				if(email === login_data.user[i].email && pass === login_data.user[i].password) {
					if(login_data.user[i].type === "admin") {
						this.res.redirect("/u/admin");
					} else if(login_data.user[i].type === "staff") {
						this.res.redirect("/u/staff");
					} else {
						this.res.json("failed");
					}
				}
			}
		});
	}
	
}

module.exports = Login;
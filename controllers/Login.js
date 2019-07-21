
class Login {

	constructor(req, res, fs) {
		this.req = req;
		this.res = res;
		this.fs = fs;
	}

	login(email, pass) {
		this.fs.readFile('./database/users.json', 'utf8', (err, data) => {
			if(err) throw err;
			let login_data = JSON.parse(data);
			let len = Object.keys(login_data.user).length;
			for(let i = 0; i < len; i++) {
				if(email === login_data.user[i].email && pass === login_data.user[i].password) {
					console.log(email, pass);
					this.res.json("logged in");
				}
			}
		});
	}
	
}
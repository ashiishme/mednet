
class Hospital {

	constructor(req, res, fs) {
		this.req = req;
		this.res = res;
		this.fs = fs;
	}

	getHospital() {
		console.log("get hospital");
	}

	addHospital() {
		let data = {};
		//data.push({id: this.query.reg})
		// this.fs.readFile('./database/hospital', 'utf8', (err, data) => {
		// 	if(err) throw err;
		// 	console.log(data);
		// 	console.log('add');
		// 	this.res.send(200);
		// });
		console.log(this.req);
		this.res.json('posted');
	}	

}

module.exports = Hospital;
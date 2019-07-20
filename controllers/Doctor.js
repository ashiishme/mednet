
class Doctor {

	constructor(req, res) {
		this.req = req;
		this.res = res;
	}

	getDoctor() {
		console.log("get doctor");
	}

	addDoctor() {
		console.log("add doctor");
	}	

}

module.exports = Doctor;
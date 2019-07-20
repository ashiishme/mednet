
class Staff {

	constructor(req, res) {
		this.req = req;
		this.res = res;
	}

	getStaff() {
		console.log("get staff");
	}

	addStaff() {
		console.log("add staff");
	}	

}

module.exports = Staff;
const prompt = require('prompt');

module.exports = (properties) => {
	return new Promise((resolve,reject) => {
		prompt.start();
		prompt.get({ properties: properties }, (err, result) => {
			if(err && err instanceof Error && err.message == 'canceled') {
				process.exit();
			} else if(err) {
				reject(err);
			} else {
				resolve(result);
			}
		});
	});
}
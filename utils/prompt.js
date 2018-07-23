const prompt = require('prompt');

const properties = {
	id: {
		description: "id (default: previous+1)",
		pattern: /^(0|[1-9][0-9]*)$/g,
		required: false
	},
	name: {
		description: "name (default: hostname of url)",
		required: false
	},
	url: {
		pattern: /(http(s?))\:\/\//gi,
		message: "Please enter a valid URL (http:// or https://)",
		required: true
	},
	category: {
		required: false
	},
	subcategory: {
		required: false
	},
	addresses: {
		description: "addresses (for multiple values use commas)",
		required: false
	}
}

module.exports = () => {
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
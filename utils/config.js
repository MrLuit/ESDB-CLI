const fs = require('fs-extra');

if (!fs.existsSync('./config/config.js')) {
    fs.copySync('./config/config.example.js', './config/config.js');
    console.error('Config file was copied. Please enter your personal github access token in the config.js file (./config/config.js)\n\n(see https://github.com/settings/tokens)');
    process.exit();
} else {
	try {
		const config = require.main.require('./config/config.js');
		if(config.github.token == '') {
			console.error("Please enter your personal github access token in the config.js file (./config/config.js)\n\n(see https://github.com/settings/tokens)");
			process.exit();
		} else {
			module.exports = config;
		}
	} catch(e) {
		console.error(e);
		console.error("(This likely means your config.js file contains invalid syntax)");
		process.exit();
	}
}
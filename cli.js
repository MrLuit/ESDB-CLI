#!/usr/bin/env node

const fs = require('fs');
const Github = require('./utils/github');
const {safeDump} = require('js-yaml');
const {parse} = require('url');
const prompt = require('./utils/prompt');
const sha1 = require('sha1-regex');
const open = require('open');

if(process.argv[2] && process.argv[2].startsWith('--token=')) {
	const token = process.argv[2].replace('--token=','');
	if(sha1.test(token)) {
		fs.writeFileSync('token.json',JSON.stringify({token: token}));
		console.log("Updated token succesfully!");
	} else {
		console.error("Invalid access token\n\nYou can create a new one at https://github.com/settings/tokens");
	}
} else if(!fs.existsSync('token.json')) {
	console.error("No access token set. Please set one using `esdb --token=<token>`\n\nYou can create an access token at https://github.com/settings/tokens");
} else {
	(async() => {
		const {token} = require('./token.json');
		const github = new Github(token);
		const details = await prompt();
		const fork = await github.fork("MrLuit/EtherScamDB");
		const content = await fork.contents("_data/scams.yaml");
		const yaml = content.parseYAML();
	
		const entry = {
			id: yaml[yaml.length-1].id+1,
			name: parse(details.url).hostname,
			url: details.url
		}
	
		if(details.id) entry.id = parseInt(details.id);
		if(details.name) entry.name = details.name
		if(details.category) entry.category = details.category;
		if(details.subcategory) entry.subcategory = details.subcategory;
		if(details.addresses) entry.addresses = details.addresses.replace(/\s/g, '').split(',');
	
		await content.update("_data/scams.yaml",'Added ' + entry.name,safeDump(yaml.concat(entry),{ lineWidth: 99999999, indent: 4 }));
	
		const pr = await github.pr("MrLuit/EtherScamDB",{
			title: "Added " + entry.name,
			body: "Added " + entry.name,
			head: fork.getOwner() + ":" + fork.getBranch(),
			base: "master"
		});
	
		open(pr.html_url);
		console.log('Success! (' + pr.html_url + ')');
	})();
}
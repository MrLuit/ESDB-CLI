#!/usr/bin/env node

const Github = require('./utils/github');
const fs = require('fs');
const {safeDump} = require('js-yaml');
const {parse} = require('url');

module.exports = (async (access_token,entry) => {
	const github = new Github(access_token);
	const fork = await github.fork("MrLuit/EtherScamDB");
	const content = await fork.contents("_data/scams.yaml");
	const yaml = content.parseYAML();
	
	await content.update("_data/scams.yaml",'Added ' + entry.name,safeDump(yaml.concat(entry),{ lineWidth: 99999999, indent: 4 }));
	
	const pr = await github.pr("MrLuit/EtherScamDB",{
		title: "Added " + entry.name,
		body: "Added " + entry.name,
		head: fork.getOwner() + ":" + fork.getBranch(),
		base: "master"
	});
	
	return pr;
});
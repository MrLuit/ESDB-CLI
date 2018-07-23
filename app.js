const config = require('./utils/config');
const prompt = require('./utils/prompt');
const Github = require('./utils/github');

const open = require('open');
const {safeDump} = require('js-yaml');
const {parse} = require('url');

(async () => {
	const github = new Github(config.github.token);
	const details = await prompt(config.prompt);
	const fork = await github.fork(config.github.repo);
	const content = await fork.contents(config.github.path);
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
	
	await content.update(config.github.path,'Added ' + entry.name,safeDump(yaml.concat(entry),config.yaml));
	
	const pr = await github.pr(config.github.repo,{
		title: "Added " + entry.name,
		body: "Added " + entry.name,
		head: fork.getOwner() + ":" + fork.getBranch(),
		base: config.github.branch
	});
	
	open(pr.html_url);
	console.log('Success!');
})();
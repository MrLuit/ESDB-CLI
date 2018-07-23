const github = require('octonode');
const yaml = require('js-yaml');

const Content = class Content {
	constructor(repo,content) {
		this.repo = repo;
		this.parent = content;
	}
	
	toString() {
		return Buffer.from(this.parent.content,'base64').toString();
	}
	
	parseYAML() {
		return yaml.safeLoad(this.toString());
	}
	
	update(path,message,content) {
		return new Promise((resolve,reject) => {
			this.repo.updateContents(path,message,content,this.parent.sha,(err,result) => {
				if(err) {
					reject(err);
				} else {
					resolve(result);
				}
			});
		});
	}
}

const Repo = class Repo {
	constructor(client,repo) {
		this.client = client;
		this.parent = repo;
		this.repo = client.repo(repo.full_name);
	}
	
	getOwner() {
		return this.parent.owner.login;
	}
	
	getBranch() {
		return this.parent.default_branch;
	}
	
	contents(path) {
		return new Promise((resolve,reject) => {
			this.repo.contents(path, (err,result) => {
				if(err) {
					reject(err);
				} else {
					resolve(new Content(this.repo,result));
				}
			});
		});
	}
}

const Github = class Github {
	constructor(access_token) {
		this.client = github.client(access_token);
	}
	
	fork(repo) {
		return new Promise((resolve,reject) => {
			this.client.me().fork(repo, (err,result) => {
				if(err) {
					reject(err);
				} else {
					resolve(new Repo(this.client,result));
				}
			});
		});
	}
	
	pr(repo,options) {
		return new Promise((resolve,reject) => {
			this.client.repo(repo).pr(options,(err,result) => {
				if(err) {
					reject(err);
				} else {
					resolve(result);
				}
			});
		});
	}
}

module.exports = Github;
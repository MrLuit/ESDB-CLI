module.exports = {
	github: {
		token: "",
		repo: "MrLuit/EtherScamDB",
		branch: "master",
		path: "_data/scams.yaml"
	},
	prompt: {
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
	},
	yaml: {
		lineWidth: 99999999,
		indent: 4
	}
}
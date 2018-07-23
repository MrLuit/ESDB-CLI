# ESDB-CLI

Use this tool to create pull requests for new blacklist entries on [EtherScamDB](https://github.com/MrLuit/EtherScamDB).

## CLI Usage

> npm install esdb-cli -g

(Create a new github access token at https://github.com/settings/tokens)

> esdb --token=<token>

> esdb

That's it :tada:

## API

You can also add new entries through an API:

> npm install esdb-cli --save

```
const esdb = require('esdb-cli');

(async () => {
	await esdb(access_token, entry_object);
})();
```

(esdb returns a Promise, so either use async + await or `.then()`)
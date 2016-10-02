require('dotenv').config({
	silent : true,
});

var GitHubApi = require("github");
var github = new GitHubApi({});

github.authenticate({
    type: "oauth",
    token: process.env.GITHUB_OAUTH_TOKEN
});

var repos = github.search.repos({
    q: "node js  created:>2014-01-01 language:JavaScript stars:>1000 pushed:>2016-01-01",
    sort: "stars",
    order: "desc"
}, function(err, res) {
    for (var itemKey in res['items']) {
        var item = res['items'][itemKey];
        var url = item['html_url'];
        var star_count = item['stargazers_count'];
        console.log(url + " (" + star_count + ")");
    }
});

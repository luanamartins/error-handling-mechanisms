require('dotenv').config({
	silent : true,
});

var fs = require('fs');
var GitHubApi = require("github");
var github = new GitHubApi({});

github.authenticate({
    type: "oauth",
    token: process.env.GITHUB_OAUTH_TOKEN
});
/*
var access = fs.createWriteStream('./node.access.log');
process.stdout.write = process.stderr.write = access.write.bind(access);
*/

github.search.repos({
    q: "node language:JavaScript stars:>2000 pushed:>2016-01-01",
    sort: "stars",
    order: "desc"
}, function(err, res) {
    getProjects(res);
	var projectsByPage = parseInt(res.meta['x-ratelimit-limit']);
	var projects = res.total_count;
	var pages = Math.floor(projects / projectsByPage);
	
	for(i = 0; i < pages; i++){
		getNextPage(res);
	}
	
	//console.log(res);
});

function getProjects(res){
	for (var itemKey in res['items']) {
        var item = res['items'][itemKey];
        var url = item['html_url'];
        var star_count = item['stargazers_count'];
        console.log(url + " (" + star_count + ")");
    }
}

function getNextPage(res){
	if (github.hasNextPage(res)) {
		github.getNextPage(res, function(err, res) {
			if(err) console.log(err);
			else
				getProjects(res);
        });
	}
}

//debugger;
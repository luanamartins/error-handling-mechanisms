require('dotenv').config({
  silent: true,
});


function getRepo(author, project) {
	const GitHub = require('github-api');
	const github = new GitHub({
	  token: process.env.GITHUB_OAUTH_TOKEN,
	});

	const remoteRepo = github.getRepo(author, project);
	return remoteRepo;
}

function getPairsFromCommits(datum) {
	const getProductionTestPairsFromCommits = require('./src/get-production-test-pairs-from-commits');
	
	var credentials = getCredentials(datum.gh_project_name);
	const remoteRepo = getRepo(credentials.author, credentials.projectName);

	const gitCommit = datum.git_commit;
	
	const gitCommits = datum.git_commits;
	
	getProductionTestPairsFromCommits(remoteRepo, gitCommit, gitCommits)
	  .then(productionTestPairs => console.log(productionTestPairs))
	  .catch(error => console.log(error));
}

function getCredentials(fullProjectName){
	return {
		author : fullProjectName.split('/')[0],
		projectName:  fullProjectName.split('/')[1] 
	};
}

var mysql = require('mysql');
var connection = mysql.createConnection({
   host : process.env.DATABASE_HOST,
  user : process.env.DATABASE_USER,
  password : process.env.DATABASE_PASSWORD,
  database : process.env.DATABASE_SCHEMA_NAME
});

connection.connect();

var javaProjectsQuery = 'SELECT * from travistorrent_7_9_2016 WHERE gh_test_churn > 0 AND gh_lang LIKE  \"java\" LIMIT 50';
var rubyProjectsQuery = 'SELECT * from travistorrent_7_9_2016 WHERE gh_test_churn > 0 AND gh_lang LIKE  \"ruby\" LIMIT 10';
var countJavaProjects = 'SELECT COUNT(*) from  travistorrent_7_9_2016 WHERE gh_test_churn > 0 AND gh_lang LIKE  \"java\"';

connection.query(javaProjectsQuery,  function(err, rows, fields) {
  if (!err) {
    //console.log('The solution is: funfou!');
	rows.forEach(getPairsFromCommits//console.log(entry);
	);
  } else {
    console.log('Error while performing Query.');
  }
});

/*connection.query(countJavaProjects,  function(err, rows, fields) {
  if (!err) {
		console.log(rows);
	);
  } else {
    console.log('Error while performing Query.');
  }
});
*/

connection.end();
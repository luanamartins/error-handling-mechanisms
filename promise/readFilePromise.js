var Promise = require('bluebird');  
var fs = require('fs'); 

Promise.promisifyAll(fs);

var myFile = '/tmp/test';  
fs.readFileAsync(myFile, 'utf8')
	.then(function(txt) {  
		txt = txt + '\nAppended something!';
		fs.writeFile(myFile, txt);
	})
	.then(function() {
		console.log('Appended text!');
	})
	.catch(function(err) {
		console.log(err);
	});
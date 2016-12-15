var Promise = require('bluebird');  
var fs = require('fs'); 

Promise.promisifyAll(fs);

var myFile = 'test.txt';  
fs.readFileAsync(myFile, 'utf8')
	.then(function(txt) {  
		txt = txt + '\nAppended something!';
		fs.writeFile(myFile, txt);
	})
	.then(function() {
		console.log('Appended text!');
		throw new Error("Hello! I'm an Error!");
	});
var fs = require("fs");


function myReadfile () {
	  try
	  {
			const file = fs.readFile('test.txt');
			console.log(file);
	  }
	  catch (err)
	  {
			console.error(err);
	  }
}

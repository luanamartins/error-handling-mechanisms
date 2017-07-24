var fs = require('fs');

var myFile = '/tmp/test';  
fs.readFile(myFile, 'utf8', function(err, txt) {  
    if (err) return console.log(err);

    txt = txt + '\nAppended something!';
    fs.writeFile(myFile, txt, function(err) {
        if(err) return console.log(err);
        console.log('Appended text!');
    });
});




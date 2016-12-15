var domain = require('domain').create();

domain.on('error', function(err){
    console.log(err);
	console.log("-------------------");
	console.log(err.domain);
});

domain.on('event1', function(){
	console.log("event1 fired");
});
 
domain.run(function(){
	domain2.emit('fired');
    throw new Error('thwump');
});

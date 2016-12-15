var req = require('events');

var myEE = new req.EventEmitter();

myEE.on('event', (a, b) => {
  setImmediate(() => {
    console.log('this happens asynchronously');
  });
  console.log("papel");
});
myEE.emit('event', 'a', 'b');
for(var i = 0; i < 2; i++){
	console.log("Olá");
}

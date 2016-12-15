var req = require('events');

var myEE = new req.EventEmitter();

console.log("'--------------------");
console.log(myEE);
console.log("'--------------------");

myEE.on('event', (a, b) => {
  setImmediate(() => {
    console.log('this happens asynchronously');
  });
  console.log("papel");
});

console.log("'--------------------");
console.log(myEE);
console.log("'--------------------");

myEE.emit('event', 'a', 'b');

for(var i = 0; i < 2; i++){
	console.log("Olá");
}

process.on('uncaughtException', () => {
	console.log("An error occurred!");
});

console.log("'--------------------");
console.log(myEE);
console.log("'--------------------");

console.log("'--------------------");
console.log(process);
console.log("'--------------------");

//myEE.emit('error');
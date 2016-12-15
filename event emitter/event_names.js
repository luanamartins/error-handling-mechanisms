var req = require('events');

var dom = require('domain');
var myDom = dom.create();

myDom.on('error', function(err){
	console.log('deu erro, myDom!');
});

var myEE = new req.EventEmitter();

myEE.on('foo', () => {});
myEE.on('bar', () => {});

const sym = Symbol('symbol');
myEE.on(sym, () => {});

myEE.on('error', () => {
	console.log("deu erro, myEE!");
});

myEE.maxListeners = 4;
myEE.domain = myDom;

console.log(myEE);

myEE.emit('error');

//console.log("finished");
//console.log(myEE.eventNames());
  // Prints [ 'foo', 'bar', Symbol(symbol) ]
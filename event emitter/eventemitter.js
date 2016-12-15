// const EventEmitter = require('events');
  //const myEE = new EventEmitter();
  //myEE.on('foo', () => {});
  //myEE.on('bar', () => {});

  //const sym = Symbol('symbol');
  //myEE.on(sym, () => {});

  //console.log(myEE.eventNames());
  // Prints [ 'foo', 'bar', Symbol(symbol) ]
  
const myEmitter =  new require('events').EventEmitter;

process.on('uncaughtException', (err) => {
  console.log('whoops! there was an error');
  console.log(err);
});

myEmitter.emit('error', new Error('whoops!'));
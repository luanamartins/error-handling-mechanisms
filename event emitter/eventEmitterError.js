
const myEmitter = new (require('events').EventEmitter);

myEmitter.on('error', (err) => {
  console.log('whoops! there was an error');
});
myEmitter.emit('error', new Error('whoops!'));
  // Prints: whoops! there was an error

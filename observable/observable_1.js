var Rx = require('rxjs/Rx');

var source1 = Rx.Observable.throw(new Error('error 1'));
var source2 = Rx.Observable.throw(new Error('error 2'));
console.log(Rx.Observable);
var source3 = Rx.Observable.of(42); //  I had to replace "return" to "of"

var source = Rx.Observable.onErrorResumeNext(source1, source2, source3);

var subscription = source.subscribe(
  function (x) {
      console.log('Next: ' + x);
  },
  function (err) {
      console.log('Error: ' + err);
  },
  function () {
      console.log('Completed');
  }
);

	// Next: 42
	// Completed

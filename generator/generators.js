function* generatorFn () {
  console.log('I was suspended');
}
var generator = generatorFn() // [1]
setTimeout(function () {
  generator.next() // [2]
}, 2000);

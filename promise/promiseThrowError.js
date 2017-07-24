Promise.resolve('promised value').then(function() {
    throw new Error('error');
});

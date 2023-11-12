process.on('tick', function(count) {
    console.log('tick event: %s', count);
});

setTimeout(function() {
    console.log('after 2 seconds, trying exit...');
    
    process.emit('tick', '2');
}, 2000);
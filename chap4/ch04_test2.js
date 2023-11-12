process.on('exit', function() {
    console.log('exit event!!!');
});

setTimeout(function() {
    console.log('after 2 seconds, trying exit...');
    process.exit();
}, 2000);
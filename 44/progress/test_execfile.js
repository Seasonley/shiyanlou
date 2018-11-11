// test_execfile.js
var child_process = require('child_process');

// exec: spawns a shell
child_process.exec('ls -lh /usr', function(error, stdout, stderr) {
    console.log(stdout);
    console.log('******************');
});

// execFile: executes a file with the specified arguments
child_process.execFile('/bin/ls', ['-lh', '/usr'], function(error, stdout, stderr) {
    console.log(stdout);
});
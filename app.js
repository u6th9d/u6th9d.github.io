let cp = require('child_process');

let worker;

function spawn(args) {
    worker = cp.spawn('hexo', args);
    console.log('cmd: hexo', args);
    console.log('server start at', Date());
    worker.on('exit', function (code) {
        if (code !== 0) {
            console.error('server restart at', Date());
            spawn(args);
        }
    });
}

function main(args) {
    spawn(args);
    process.on('SIGTERM', function () {
        worker.kill();
        process.exit(0);
    });
}

main(process.argv.slice(2));

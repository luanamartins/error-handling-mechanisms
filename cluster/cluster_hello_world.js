const cluster = require('cluster');
const http = require('http');
const numCPUs = require('os').cpus().length;

if (cluster.isMaster) {
  // Fork workers.
  console.log("number of CPUs: " + numCPUs);
  for (var i = 0; i < numCPUs; i++) {
	var worker = cluster.fork();
	//console.log("Launched a new worker with PID=", { pid: worker.pid });
	console.log("Launched a new worker with PID=", worker.pid);
  }

  cluster.on('exit', (worker, code, signal) => {
    console.log(`'worker ${worker.process.pid} died`);
  });
} else {
  // Workers can share any TCP connection
  // In this case it is an HTTP server
  http.createServer((req, res) => {
    res.writeHead(200);
    res.end('hello world\n');
  }).listen(8000);
}
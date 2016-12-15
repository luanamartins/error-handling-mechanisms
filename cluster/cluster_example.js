var cluster = require('cluster');
var PORT = +process.env.PORT || 1337;

if(cluster.isMaster) 
{
	
	//console.log('---------- Cluster --------------');
	//console.log(cluster);
	//console.log('--------------------------------');
	
	cluster.fork();
	var worker = cluster.fork();
	//console.log('---------- Worker --------------');
	//console.log(worker);
	//console.log('--------------------------------');
	cluster.fork();
	//console.log(cluster.workers);

   cluster.on('disconnect', function(worker) 
   {
		console.error('disconnect!');
		var worker = cluster.fork();
		console.log('---------- Worker --------------');
		console.log(worker);
		console.log('--------------------------------');
   });
} 
else 
{
    var domain = require('domain');
    var server = require('http').createServer(function(req, res) 
    {
        var d = domain.create();
        d.on('error', function(er) 
        {
            //something unexpected occurred
            console.error('error', er.stack);
            try 
            {
               //make sure we close down within 30 seconds
               var killtimer = setTimeout(function() 
               {
                   process.exit(1);
               }, 30000);
               // But don't keep the process open just for that!
               killtimer.unref();
               //stop taking new requests.
               server.close();
               //Let the master know we're dead.  This will trigger a
               //'disconnect' in the cluster master, and then it will fork
               //a new worker.
               cluster.worker.disconnect();

               //send an error to the request that triggered the problem
               res.statusCode = 500;
               res.setHeader('content-type', 'text/plain');
               res.end('Oops, there was a problem!\n');
           }
           catch (er2) 
           {
              //oh well, not much we can do at this point.
              console.error('Error sending 500!', er2.stack);
           }
       });
    //Because req and res were created before this domain existed,
    //we need to explicitly add them.
    d.add(req);
    d.add(res);
    //Now run the handler function in the domain.
    d.run(function() 
    {
        //You'd put your fancy application logic here.
        handleRequest(req, res);
    });
  });
  console.log("Listen: http://localhost:" + PORT);
  server.listen(PORT);

} 
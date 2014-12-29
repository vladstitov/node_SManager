var fs = require("fs"),
sys = require ('sys'),
os = require("os");
var child;
var error;

function initMe(){
	if(!child){
		error=0;
		process.stdin.setEncoding('utf8');
		process.on('uncaughtException', function (err) {
		error=err.stack;
		console.error('An uncaught error occurred!', err.stack);			  
		});
		process.stdin.on('readable', function() {
			var chunk = process.stdin.read();
			if(!chunk) return;			
			//console.log(chunk.length);
			chunk=chunk.substr(0,chunk.length-2);
			if (chunk !== null) {
				switch(chunk){
					case 'stopserver':
					//console.log(server);
					server.stdin.write("exit\n");
					//server.stdin='exit';
					console.log('stoping server');					
					break;			
			}
			process.stdout.write('OK');
			//console.log(chunk.length);
			}
		});
	child = require('child_process');
	}
}

function sendCommand(cmd,callBack){
	
return	child.exec(cmd,null,function(err,stdout,stderr){
		 callBack({stdout:stdout,stderr:stderr});
		});	
}
function checkForUpdates(){

}
var server;
function startServer(){
var onStartServer = function(res){
console.log('onStartServer :',res);
}
//server =  child.spawn('cmdNode');
//server.stdin.setEncoding = 'utf-8';
//server.stdout.pipe(process.stdout);
	server = sendCommand('node cmdNode.js',onStartServer);
	//server.stdout.pipe(process.stdout);
	console.log(server.pid);
}
function stopServer(){
var onStopServer = function(res){
console.log('onStopServer :',res);
}
sendCommand('node cmdNode.js',onStopServer);
}
function getUpdates(){
}

initMe();
setTimeout(startServer,1000);
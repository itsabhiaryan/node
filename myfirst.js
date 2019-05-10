var http= require('http');

const testFolder='./tests/';
const fs=require('fs');
var walk    = require('walk');
var mv = require('mv');
var url = require('url');

var walker= walk.walk("./test",{followLinks:false});
var formidable = require('formidable');

var folderList=['Good Morning','Good Night']

http.createServer(function(req,res){
	res.writeHead(200,{'Content-Type':'text/html'});
	//res.writeHead(200,{'Content-Type': 'application/json'})

	if (req.url == '/fileupload') {
		var form = new formidable.IncomingForm();
		form.parse(req, function (err, fields, files) {
			var oldpath = files.filetoupload.path;
			console.log(oldpath);
			var newpath = 'D:/Node/' + files.filetoupload.name;
			// fs.rename(oldpath, newpath, function (err) {
			//   if (err) throw err;
			//   res.write('File uploaded and moved!');
			//   res.end();
			// });

			mv(oldpath, newpath, function (err) {
				if (err) throw err;
				res.write('File uploaded and moved!');
				res.end();
			  });

		});
	  } else {
		res.writeHead(200, {'Content-Type': 'text/html'});
		res.write('<form action="fileupload" method="post" enctype="multipart/form-data">');
		res.write('<input type="file" name="filetoupload"><br>');
		res.write('<input type="submit">');
		res.write('</form>');
		return res.end();
	  }








	
	//res.end('Hello World');
	// walker.on('file',function(root,stat,next){
	// 	files.push(root+'/'+stat.name);
	// 	next();
	// });
	
	// walker.on('end', function() {
	// 	console.log(files);
	// });

	// console.log(req.url);
	// var url_parts=url.parse(req.url,true);
	// var query=url_parts.query;

	// console.log(query.folder);

	// if(folderList.indexOf(query.folder)>=0){
	// 	getListOfFiles(query.folder,res)
	// }else{
	// 	res.end(JSON.stringify([]));
	// }

	// switch(query['folder']){
	// 	case 'abc': 
	// 	d("abc",res);
	// 	break;

	// 	case 'abc': 
	// 	d("abc",res);
	// 	break;
	// 	default:
	// 		//res.end("Something went wrong");
	// 		res.end(JSON.stringify([]));
	// }

}).listen(8080);


function getListOfFiles(folderName,res){

	var fileList   = [];

	fs.readdir(folderName,(err,files)=>{
		files.forEach(		
			file=>{
				fileList.push(file)
			}
		);

		fs.appendFile('mynewfile1.txt', 'Hello content!', function (err) {
			if (err) throw err;
			console.log('Saved!');
		  });

		res.write(JSON.stringify({name:'Abc'}));
		res.write(JSON.stringify(fileList));
		res.end();
	});
}
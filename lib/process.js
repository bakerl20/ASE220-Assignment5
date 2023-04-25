const fs=require('fs');
const { stringify } = require('querystring');
const url=require('url');

function process(req,res){
	const currentDate=new Date();
	const timestamp=currentDate.getTime();
	var fileName;

	if (req.method != 'POST')
	{	
		let url_components=url.parse(req.url,true);
		let urlPath = url_components.pathname.split('/');

		if (urlPath.length == 2 && urlPath[1] != '')
		{
			fileName = urlPath[1];
		}
	}
	else if (req.method == 'POST')
	{
		fileName = timestamp.toString();
	}

	switch (req.method)
	{
		case 'POST':
			res.writeHead(200,{'Content-Type':'application/json'});
			res.writeHead(200,{'Current-timestamp':timestamp});
			
			var body=[];
			req.on('data',(chunk)=>{
				body.push(chunk);
			}).on('end',()=>{
				body=Buffer.concat(body).toString();

				fs.writeFileSync(`./data/${fileName}.json`, body, 'utf8');
				res.end(fileName);
			});

			break;
		case 'GET':
			//return content
			if (fs.existsSync(`./data/${fileName}.json`))
			{
				res.writeHead(200,{'Content-Type':'application/json'});
				res.writeHead(200,{'Current-timestamp':timestamp});
				let fileData = fs.readFileSync(`./data/${fileName}.json`,'utf8');
				res.end(fileData);
			}
			else
			{
				res.writeHead(404,{'Content-Type':'application/json'});
				res.writeHead(404,{'Current-timestamp':timestamp});
				res.end();
			}
			break;
		case 'PUT':
			if (fs.existsSync(`./data/${fileName}.json`))
			{
				res.writeHead(200,{'Content-Type':'application/json'});
				res.writeHead(200,{'Current-timestamp':timestamp});
				
				var body=[];
				req.on('data',(chunk)=>{
					body.push(chunk);
				}).on('end',()=>{
					body=Buffer.concat(body).toString();

					fs.writeFileSync(`./data/${fileName}.json`, body, 'utf8');

					res.end();
				});
			}
			else
			{
				res.writeHead(404,{'Content-Type':'application/json'});
				res.writeHead(404,{'Current-timestamp':timestamp});
				res.end();
			}

			break;
		case 'DELETE':
			if (fs.existsSync(`./data/${fileName}.json`))
			{
				res.writeHead(200,{'Content-Type':'application/json'});
				res.writeHead(200,{'Current-timestamp':timestamp});
				fs.unlinkSync(`./data/${fileName}.json`);
				res.end();
			}
			else
			{
				res.writeHead(404,{'Content-Type':'application/json'});
				res.writeHead(404,{'Current-timestamp':timestamp});
				res.end();
			}
			break;
	}
	/*
	//Obtain request method
	console.log(req.method);
	
	//Parse the components of the URL
	let url_components=url.parse(req.url,true);
	console.log(url_components);
	console.log(url_components.pathname.split('/'));
	
	//Obtain the current timestamp (why do we need this?)
	const currentDate=new Date();
	const timestamp=currentDate.getTime();
	console.log(timestamp);
	
	
	//Write something in the header of the response
	res.writeHead(200,{'Content-Type':'application/json'});
	res.writeHead(200,{'Current-timestamp':timestamp});
	
	//Write something in the body of the response
	res.write('x');
	
	//Process the body of the request
	var body=[];
	req.on('data',(chunk)=>{
		body.push(chunk);
	}).on('end',()=>{
		body=Buffer.concat(body).toString();
		res.end(body);
	});
	
	// Check if a file exists
	let myfile='file.json';
	console.log(fs.existsSync(`./data/${myfile}`));
	
	
	// Write to a file
	let my_other_file=`${timestamp}.json`;
	fs.writeFileSync(`./data/${my_other_file}`,timestamp+'');
	
	
	// Read data from a file
	console.log(fs.readFileSync(`./data/${my_other_file}`,'utf8'));
	
	//Encode a javascript data type into JSON
	const javascript_object={
		artist:'Rednex',
		title:'Cotton Eye Joe',
		url_video:'https://youtu.be/HAlspX_kjL4'
	};
	let json_string=JSON.stringify(javascript_object);
	console.log(json_string);
	
	//Convert a JSON string into javascript
	let javascript_object_again=JSON.parse(json_string);
	console.log(javascript_object_again);
	*/
}

module.exports=process
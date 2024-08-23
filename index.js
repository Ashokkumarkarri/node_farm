const fs=require('fs');
const http=require('http');
// const url=require('url');


//SERVER
const data=fs.readFileSync('./dev-data/data.json','utf-8');
const dataObjs=JSON.parse(data) // convert JSON string into a JavaScript object

const server=http.createServer((req,res)=>{
    // console.log(req);
    // res.end('Hello from the server');
    const pathName=req.url;
    
    if(pathName==='/' || pathName === '/overview'){
        res.end('This is OverView')
    }else if (pathName==='/product'){
        res.end('This is Product')  
    }else if(pathName==='/api'){
        res.writeHead(200,{'content-type':'application/json'})
        res.end(data) 
    }
    else{
        res.writeHead(404,{
            'Content-type':'text/html',
            'my-own-header':'hellow-world'
        });
        res.end('<h1>Page Not found </h1>')
    }
})

server.listen(8000,'127.0.0.1',()=>{
    console.log(`Listining from Port number 8000`)
})
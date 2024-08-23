const fs=require('fs');
const http=require('http');

//reading a File : Blocking, synchronous way
const text=fs.readFileSync('./txt/input.txt','utf-8');
console.log(text)


const server=http.createServer((req,res)=>{
    // console.log(req);
    // res.end('Hello from the server');
    const pathName=req.url;
    
    if(pathName==='/' || pathName === '/overview'){
        res.end('This is OverView')
    }else if (pathName==='/product'){
        res.end('This is Product')
    }else{
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
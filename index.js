const fs=require('fs');
const http=require('http');

//reading a File : Blocking, synchronous way
const text=fs.readFileSync('./txt/input.txt','utf-8');
console.log(text)


const server=http.createServer((req,res)=>{
    console.log(req);
    res.end('Hellow from the server');
})

server.listen(8000,'127.0.0.1',()=>{
    console.log(`Listining from Port number 8000`)
})
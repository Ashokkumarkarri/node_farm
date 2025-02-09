const fs=require('fs');
const http=require('http');
const url=require('url');


//SERVER
const repalaceTemplate=(temp,product)=>{
    // let output=temp.replace('{%PROODUCTNAME}',product.productName)
    let output=temp.replace(/{%PRODUCTNAME%}/g,product.productName);
    output=output.replace(/{%IMAGE%}/g,product.image)
    output=output.replace(/{%PRICE%}/g,product.price)
    output=output.replace(/{%NUTRIENTS%}/g,product.nutrients)
    output=output.replace(/{%QUANTITY%}/g,product.quantity)
    output=output.replace(/{%DESCRIPTION%}/g,product.description)
    output=output.replace(/{%ID%}/g,product.id)
    output=output.replace(/{%FROM%}/g,product.from)

    if(!product.organic) output=output.replace(/{%NOT_ORGANIC%}/g,'not-organic');
    return output;
}
 

const tempOverview=fs.readFileSync(`${__dirname}/templates/overview.html`,'utf-8');
const tempCard=fs.readFileSync(`${__dirname}/templates/card.html`,'utf-8');
const tempProduct=fs.readFileSync(`${__dirname}/templates/product.html`,'utf-8');

const data=fs.readFileSync('./dev-data/data.json','utf-8');
const dataObj=JSON.parse(data) // convert JSON string into a JavaScript object

      
const server=http.createServer((req,res)=>{

    const {query,pathname}=url.parse(req.url,true);

    
    //Overview Page
    if(pathname==='/' || pathname === '/overview'){
        res.writeHead(200,{'content-type':'text/html'})

        const cardsHtml = dataObj.map(el=> repalaceTemplate(tempCard,el)).join('');
        const output =tempOverview.replace('{%PRODUCT_CARDS%}',cardsHtml)
        res.end(output)
        
    //Product Page    
    }else if (pathname==='/product'){
        res.writeHead(200,{'content-type':'text/html'})

        const product=dataObj[query.id] 
        const output=repalaceTemplate(tempProduct,product)
        res.end(output)  
  


    
    //API
    }else if(pathname==='/api'){
        res.writeHead(200,{'content-type':'application/json'})
        res.end(data) 

    //Not found
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
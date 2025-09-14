let http =require('http')

function xuly(request,response){
    response.writeHead(200,{
        "Content-Type":"text/html"
    })
    response.end('<h1>Hello Dammio!</h1>')
}
let maychu =http.createServer(xuly)
maychu.listen(8080)// localhost:8080 //127.0.0.1
console.log('Server dang chay ne')
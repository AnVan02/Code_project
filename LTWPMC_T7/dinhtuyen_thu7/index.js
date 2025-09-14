 var http = require('http');
 var fs = require('fs')
 function docfile(tenfile, res) {
    fs.ReadStream(tenfile).pipe(res)
 }
 http.createServer((req,res)=>{
    if(req.url=='/')
        docfile('home.html',res)
    else if(req.url=='/about')
        docfile('about.html',res)
    else if(req.url=='/contact')
        docfile('contact.html',res)
    else

    res.end('404 not found');

}).listen(3000)

console.log('Server running ...')
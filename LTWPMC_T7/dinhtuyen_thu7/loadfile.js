var http = require('http');

http.createServer(function(req,res){
   res.writeHead(200,{'Content-Type':'text/plain;charset=utf-8'})
   if(req.url=='/')
       res.end('Trang chủ')
   else if(req.url=='/about')
       res.end('Trang giới thiệu')
   else if(req.url=='/contact')
   res.end('Trang liên hệ')
   else

   res.end('404 not found');

}).listen(3000)

console.log('Server running ...')
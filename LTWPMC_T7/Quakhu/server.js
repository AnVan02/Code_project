var http=require('http')
function xuly(req, res) {
    res.writeHead(200,{"Content-Type":"text/plain"})
    res.end("Hello, Hi, Bye")
}
var maychu=http.createServer(xuly)
maychu.listen(8081)
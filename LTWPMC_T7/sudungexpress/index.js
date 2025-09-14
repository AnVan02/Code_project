var express= require('express')
var app =express()
var port=3000  
app.get('/',(req,res)=>{
    res.send('Trang Chu')
})
app.get('/about',(req,res)=>{
    res.send('Trang Giới Thiệu')
})
app.listen(port,()=>{
    console.log('Server running....')
})
var db=require('mongoose')

db.connect('mongodb://127.0.0.1:27017/csdlnv')

var nhanvienSchema=db.Schema({
    name:String, age:Number 
})

var nhanvien=db.model('nhanvien',nhanvienSchema)
module.exports=nhanvien

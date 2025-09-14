var MongoClient=require('mongodb').MongoClient

MongoClient.connect('mongodb://127.0.0.1:27017', xuly)

function  xuly(err, conn) {

    if(err) return console.log('khong ket noi duoc')

    console.log('ket noi thanh cong')

    var dbo=conn.db('quanlygau')

    dbo.collection('khachhang').findOne( (err,ketqua)=>{

        if(err) return console.log('khong chen duoc du lieu')

        console.log('du lieu ne', ketqua.tenkh, ketqua.tuoi)

        conn.close()

    })

}
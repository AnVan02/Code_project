var MongoClient=require('mongodb').MongoClient

MongoClient.connect('mongodb://127.0.0.1:27017', xuly)

function  xuly(err, conn) {

    if(err) return console.log('khong ket noi duoc')

    console.log('ket noi thanh cong')

    var dbo=conn.db('quanlygau')
    var dieukien={"tenkh":"itc"}

    dbo.collection('khachhang')
        .deleteOne(dieukien,(err,ketqua)=>{

        if(err) return console.log('khong chen duoc du lieu')

        console.log('du lieu ne', ketqua)

        conn.close()

    })

}
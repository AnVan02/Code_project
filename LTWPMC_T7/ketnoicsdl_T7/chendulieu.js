var MongoClient=require('mongodb').MongoClient

MongoClient.connect('mongodb://127.0.0.1:27017', xuly)

function  xuly(err, conn) {

    if(err) return console.log('khong ket noi duoc')

    console.log('ket noi thanh cong')

    var dbo=conn.db('quanlygau')
    var dulieu={"tenkh":"itc", "tuoi":22}

    dbo.collection('khachhang').insertOne(dulieu, (err,ketqua)=>{

        if(err) return console.log('khong chen duoc du lieu')

        console.log('da chen xong', ketqua)

        conn.close()

    })

}
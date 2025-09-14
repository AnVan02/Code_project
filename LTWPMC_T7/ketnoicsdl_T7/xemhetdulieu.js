var MongoCilent=require ('mongodb').MongoClient

MongoCilent.connect('mongodb://127.0.0.1:27017',xuly)

function xuly(err, conn) {

    if (err) return console.log("Khong ket noi duoc")

    console.log('Ket noi thanh cong')

    var dbo=conn.db('quanlygau')

    dbo.collection ('khachhang')
    .find()
    .sort({"tuoi":-1})
    .toArray((err,ketqua) => {

        if(err) return console.log('Ko xem duoc du lieu')

        console.log('Da in ra du lieu')

        for(kh of ketqua)

        console.log(kh.tenkh, kh.tuoi)

        conn.close()

    })

}
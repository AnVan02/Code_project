var dlieu ={
    "danhsach": [
    { "tên":"hello","tuoi":22,"email":"itc@gmail.com"},
    {"ten":"hi","tuoi":23,"email":"tic@gmail.com"},
    {"ten":"bye","tuoi":24,"email":"tic@gmail.com" },
]
}

// cách 1 dâu chấm
console.log(dulieu.danhsach[0].ten)
console.log(dulieu.danhsach[1].ten)
console.log(dulieu.danhsach[2].ten)

// cách 2 dùng ["key"]
console.log(dulieu["danhsach"][0].ten)
console.log(dulieu["danhsach"][1].ten)
console.log(dulieu["danhsach"][2].ten)
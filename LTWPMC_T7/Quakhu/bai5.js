var dulieu= {
    "danhsach": [
    {"ten":"hello", "tuoi":22, "email":"hello@gmail.com"},
    {"ten":"hi", "tuoi":23, "email":"hi@gmail.com"},
    {"ten":"bye", "tuoi":24, "email":"bye@gmail.com"}
    ]
}
// cách dùng 1 dấu chấm
console.log(dulieu.danhsach[0].ten)
console.log(dulieu.danhsach[1].ten)
console.log(dulieu.danhsach[2].ten)

// cách 2 dùng ["key"]
console.log(dulieu["danhsach"][0].ten)
console.log(dulieu["danhsach"][1].ten)
console.log(dulieu["danhsach"][2].ten)
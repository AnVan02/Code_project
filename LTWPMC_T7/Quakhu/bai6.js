var cty =[
    {
        "tochuc": [
            {"ten": "hello", "tuoi":22, "email": "hello@gmail.com"}
        ]
    },
    {
        "ketoan": [
            {"ten": "metmoi", "tuoi":44, "email": "metmoi@gmail.com"},
            {"ten": "metxiu", "tuoi":55, "email": "metxiu@gmail.com"}
        ]
    },
    {
        "hanhchinh": [
            {"ten": "daukho", "tuoi":44, "email": "daukho@gmail.com"}
        ]
    }
]
// cách 1: đọc dữ liệu thông qua dấu chấm
//console.log(cty[0].tochuc[0].ten)
//console.log(cty[1].ketoan[0].ten)
//console.log(cty[1].ketoan[1].ten)
//console.log(cty[2].hanhchinh[0].ten)

//cách 2: đọc dữ liệu thông qua "key"
//console.log(cty[0]["tochuc"][0].ten)
//console.log(cty[1]["ketoan"][0].ten)
//console.log(cty[1]["ketoan"][1].ten)
//console.log(cty[2]["hanhchinh"][0].ten)

//for(i=0; i<cty.length; i++)
//for(j=0; j<cty[i][Object.keys(cty[i])].length; j++)
//console.log(cty[i][Object.keys(cty[i])][j].ten)

for(phongban of cty)
for(nv of phongban[Object.keys(phongban)])
console.log(nv.ten, nv.tuoi, nv.email)
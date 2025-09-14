var danhsach=[
    {"ten":"itc", "tuoi":22, "email":"itc@gmail.com"},
    {"ten":"tic", "tuoi":23, "email":"tic@gmail.com"},
    {"ten":"tci", "tuoi":24, "email":"tci@gmail.com"}
]

for(i=0; i<danhsach.length; i++)
console.log(danhsach[i].ten, danhsach[i].tuoi, danhsach[i].email)

var i=0
while(i<danhsach.length) {
    console.log(danhsach[i].ten, danhsach[i].tuoi, danhsach[i].email)
    i=i+1
}
var i=0
do {
    console.log(danhsach[i].ten, danhsach[i].tuoi, danhsach[i].email)
    i=i+1
} while(i<danhsach.length)
for (i in danhsach)
console.log(danhsach[i].ten, danhsach[i].tuoi, danhsach[i].email)
for (sv of danhsach)
console.log(sv.ten, sv.tuoi, sv.email)
function xuly(sv) {
    console.log(sv.ten, sv.tuoi, sv.email)
}
danhsach.forEach(xuly)

danhsach.forEach(function xuly(sv) {
    console.log(sv.ten, sv.tuoi, sv.email)
})
danhsach.forEach((sv) => {
    console.log(sv.ten, sv.tuoi, sv.email)
})
danhsach.map((sv) => {
    console.log(sv.ten, sv.tuoi, sv.email)
})
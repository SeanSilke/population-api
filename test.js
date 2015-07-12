var pluss = function(a,b){
  return a + b
}

var plussN = function (n) {
  return function (a){
    return pluss(a, n)
  }
}

var plussOne = plussN(1);

var plussTwo = function (a){
  return  pluss (a, 2)
}

console.log(
// pluss (2,4),
// plussTwo(7),
plussOne(3)
)

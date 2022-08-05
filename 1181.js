let input = require('fs').readFileSync('example.txt').toString().trim().split('\r\n'); 
input.shift();
let set = new Set([...input]);
input = [...set]
let arrr = input.map((item)=> [item,item.length]);
arrr = arrr.sort().sort((a,b)=> a[1] -b[1]);
arrr =arrr.map((item) => item[0]);
console.log(arrr.join('\n'))
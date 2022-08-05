let input = require('fs').readFileSync('example.txt').toString().trim().split('\r\n'); /// /dev/stdin

input.shift();

input = input.map((item, index)=> {
   return  [parseInt(item.split(' ')[0]), item.split(' ')[1]]
})
input.sort((a,b)=> a[0] -b[0]);
let answer = input.map((item) => item[0]+' '+item[1]);
console.log(answer.join('\n'))
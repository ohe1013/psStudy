let input = require('fs').readFileSync('example.txt').toString().trim().split('\r\n'); /// /dev/stdin

input.shift();

let arr = input.map((item) => [parseInt(item.split(' ')[0]),parseInt(item.split(' ')[1])]);

arr.sort((a,b) => a[1] - b[1]);
arr.sort((a,b) => a[0] - b[0]);
arr= arr.map((item)=> ''+item[0]+ ' ' + item[1]).join('\n')
console.log(arr)
//not solved

let input = require('fs').readFileSync('example.txt').toString().trim().split('\r\n'); /// /dev/stdin

let divVal = parseInt(input[0].split(' ')[1]);
let valArr = input[1].split(' ');
let sumArr = [];
let sum = 0;
valArr.forEach((item) => {
    sum += parseInt(item);
    sumArr.push(sum%divVal);
})
console.log(sumArr)
console.log(input)
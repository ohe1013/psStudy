let input = require('fs').readFileSync('example.txt').toString().trim().split('\r\n'); /// /dev/stdin

let divVal = parseInt(input[0].split(' ')[1]);
let valArr = input[1].split(' ');


let count = 0;
let sum = 0;
let sumArr = new Map();
sumArr.set(0,1);
valArr.forEach((item) => {
    sum += parseInt(item);
    if(sumArr.has(sum%divVal)) {
        sumArr.set(sum%divVal,parseInt(sumArr.get(sum%divVal))+1);
    } else {
        sumArr.set(sum%divVal,1);
    }
});
for(var [key,val] of sumArr) {
    if( val >=2 ) count+= (val-1) * val /2;
}
console.log(count)
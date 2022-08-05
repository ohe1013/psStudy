let input = require('fs').readFileSync('example.txt').toString().trim().split('\r\n'); /// /dev/stdin

let arr = [];
let num = Number(input.shift());
for(let i=0; i < num; i++) {
    let w = input[i].split(' ')[0];
    let h = input[i].split(' ')[1];
    arr.push([parseInt(w),parseInt(h),i]);
}
console.log(arr)
let rank = [];
arr.forEach((item,index) => {
    let count = 1;
    for(let i=0; i<num; i++) {
        if( i == index) continue;
        if( item[0] < arr[i][0] && item[1] < arr[i][1]) count++;
    }
    rank.push(count);
})
console.log(rank.join(' '))
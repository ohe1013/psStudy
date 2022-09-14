const fs = require("fs");
const filePath = process.platform === "linux" ? "/dev/stdin" : "example.txt";
const splitType = process.platform === "linux" ? '\n' : '\r\n'
let input = fs.readFileSync(filePath).toString().trim().split(splitType);

const N = parseInt(input.shift());

const numArr = input[0].split(' ').map(Number);

let max = -1000;
let temp = 0;
numArr.forEach((item,index) => {
    temp += item;
    // 현재값이 max보다 크면 교체
    max = temp>max ? temp: max;
    // 더했을떄 현재값이 0보다 작아지면 다시 초기화
    if (temp < 0 ) temp =0;
})
if (max < 0 ) console.log(max)
else { 
    console.log(max)
}
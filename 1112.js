const fs = require("fs");
const filePath = process.platform === "linux" ? "/dev/stdin" : "example.txt";
const splitType = process.platform === "linux" ? '\n' : '\r\n'
let input = fs.readFileSync(filePath).toString().trim().split(splitType);

let [v, n] = input[0].split(' ');
let val = v.split('');
let len = val.length;
let result= 0;
val.forEach((item,index) => {
    console.log(item * Math.pow(n,len-(index+1)))
    result += item * Math.pow(n,len-(index+1));
})

console.log(result);
const fs = require("fs");
const filePath = process.platform === "linux" ? "/dev/stdin" : "example.txt";
const splitType = process.platform === "linux" ? "\n" : "\r\n";
let input = fs.readFileSync(filePath).toString().trim().split(splitType);

const N = parseInt(input.shift());

let count =0;
for( let i =1 ; i<= N; i++) {
    if( i%5 === 0) count++;
    if( i%25 === 0) count++;
    if (i%125 === 0) count++;
}
console.log(count)
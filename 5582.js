const fs = require("fs");
const filePath = process.platform === "linux" ? "/dev/stdin" : "example.txt";
const splitType = process.platform === "linux" ? '\n' : '\r\n'
let input = fs.readFileSync(filePath).toString().trim().split(splitType); /// /dev/stdin

let finder = input[0];
let target = input[1];
let i = 0;
let same = Array.from(Array(target.length + 1), () => new Array(finder.length + 1).fill(0));
let max = 0;
for(let i=0; i<target.length; i++){
    for(let j=0; j<finder.length; j++){
        if(target[i]=== finder[j]) {
            same[i+1][j+1] = same[i][j]+1;
            max = (max > same[i+1][j+1]) ? max : same[i+1][j+1];
        }
    }
}
console.log(max);
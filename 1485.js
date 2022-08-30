const fs = require("fs");
const filePath = process.platform === "linux" ? "/dev/stdin" : "example.txt";
const splitType = process.platform === "linux" ? '\n' : '\r\n'
let input = fs.readFileSync(filePath).toString().trim().split(splitType);

let n = input.shift();
let square = [];
let answer = [];
for(let i=1; i<=n; i++){
    let length = new Set();
    square = []
    for(let j=0; j<4; j++) {
        square.push(input.shift().split(' ').map(Number))
    }
    for(let i =0; i<4;i++){
        for(let j=i+1; j<4; j++) {
            length.add(Math.pow(square[i][0] - square[j][0],2) +Math.pow(square[i][1] - square[j][1],2))
        }
    }
    if(length.size ==2) answer.push(1)
    else {
        answer.push(0)
    }
}
console.log(answer.join('\n'))
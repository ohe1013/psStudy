const fs = require("fs");
const filePath = process.platform === "linux" ? "/dev/stdin" : "example.txt";
const splitType = process.platform === "linux" ? '\n' : '\r\n'
let input = fs.readFileSync(filePath).toString().trim().split(splitType);

const [N,S,M] = input.shift().split(' ').map(Number);

let arr = [S];
input[0].split(' ').map(Number).forEach((item) => {
    let temp = []
    let k = arr.length;
    for( let i =0; i<k; i++) {
        let t = arr.pop();
        if ( t+item <= M) {
            temp.push(t+item)
        }
        if ( t-item >=0) {
            temp.push(t-item)
        }
    }
    arr.push(...temp)
    arr = Array.from(new Set(arr))
})
if (arr.length ===0) console.log(-1)
else {
    console.log(Math.max(...arr))
}
const fs = require("fs");
const filePath = process.platform === "linux" ? "/dev/stdin" : "example.txt";
const splitType = process.platform === "linux" ? '\n' : '\r\n'
let input = fs.readFileSync(filePath).toString().trim().split(splitType);

const N = parseInt(input.shift());
const arr = input[0].split(' ').map(Number);

// 한 점을 기점으로 양방향으로 모든 기울기를 구한다.
// 기울기 절댓값이 더 크면 보인다.
const res = [];
for(let i =0; i<N; i++) {
    let max = Infinity;
    let min = -Infinity;
    let count = 0;
    for(let j =i-1; j>=0; j--) {
        let temp = (arr[i]-arr[j])/(i-j);
        if (temp < max) {
            max = temp;
            count++;
        }
    }
    for(let j =i+1; j<N; j++) {
        let temp = (arr[i]-arr[j])/(i-j);
        if (temp > min) {
            min = temp;
            count++;
        }
    }
    res.push(count)
}

console.log(Math.max(...res))
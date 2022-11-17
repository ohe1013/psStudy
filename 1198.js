const fs = require("fs");
const filePath = process.platform === "linux" ? "/dev/stdin" : "example.txt";
const splitType = process.platform === "linux" ? "\n" : "\r\n";
let input = fs.readFileSync(filePath).toString().trim().split(splitType); /// /dev/stdin

const N = parseInt(input.shift());

//그냥 점 3개로 만들 수 있는 최고 큰 삼각형 구하면된다.
//포인터 3개를 만들어서 쓰는게 제일 쉬워보인다.
// 0 1 2 3 4 (5각형 기준)
let max = 0;
for (let i = 0; i < N - 2; i++) {
    for (let j = i + 1; j < N - 1; j++) {
        for (let k = j + 1; k < N; k++) {
            let [x1, y1] = input[i].split(" ").map(Number);
            let [x2, y2] = input[j].split(" ").map(Number);
            let [x3, y3] = input[k].split(" ").map(Number);
            max =
                max > Math.abs(x1 * y2 + x2 * y3 + x3 * y1 - x1 * y3 - x3 * y2 - x2 * y1)
                    ? max
                    : Math.abs(x1 * y2 + x2 * y3 + x3 * y1 - x1 * y3 - x3 * y2 - x2 * y1);
        }
    }
}
console.log(max / 2);

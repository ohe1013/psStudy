const fs = require("fs");
const filePath = process.platform === "linux" ? "/dev/stdin" : "example.txt";
const splitType = process.platform === "linux" ? "\n" : "\r\n";
let input = fs.readFileSync(filePath).toString().trim().split(splitType);

const N = +input.shift();
const answer = [];

/**
 *
 * @param {Number} size
 * @param {Array} arr
 */
const solution = (size, arr) => {
    const len = arr.length();
};

for (let i = 0; i < N; i += 2) {
    const size = +input[i];
    const arr = input[i + 1].split(" ").map(Number);
    answer.push(solution(size, arr));
}

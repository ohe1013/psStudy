const fs = require("fs");
const filePath = process.platform === "linux" ? "/dev/stdin" : "example.txt";
const splitType = process.platform === "linux" ? "\n" : "\r\n";
let input = fs.readFileSync(filePath).toString().trim().split(splitType);

const [N, M] = input.shift().split(" ").map(Number);

const K = parseInt(input.pop());

const patternArr = [];

for (let i = 0; i < N; i++) {
    const line = input[i].split("").map(Number);
    const sum = line.reduce((prev, cur) => {
        return prev + cur;
    }, 0);
    if (sum + K >= M && (M - sum) % 2 === K % 2) {
        patternArr.push(
            line.map((item) => {
                if (item === 0) return 1;
                else return 0;
            })
        );
    } else {
        continue;
    }
}
const sum = (arr1, arr2) => {
    for (let i = 0; i < arr1.length; i++) {
        if (arr1[i] + arr2[i] !== 1) return 0;
    }
    return 1;
};
let answer = 0;
patternArr.forEach((item) => {
    let temp = 0;
    for (let i = 0; i < N; i++) {
        temp += sum(input[i].split("").map(Number), item);
    }
    answer = answer > temp ? answer : temp;
});

console.log(answer);

const fs = require("fs");
const filePath = process.platform === "linux" ? "/dev/stdin" : "example.txt";
const splitType = process.platform === "linux" ? "\n" : "\r\n";
let input = fs.readFileSync(filePath).toString().trim().split(splitType);

const N = parseInt(input[0]);
const nums = input[1].split(" ").map(BigInt);

//dict = [index, 3의갯수, 2의갯수]
const dict = [];
const count2 = (val) => {
    let count = 0;
    while (val % BigInt(2) === BigInt(0)) {
        count++;
        val = val / BigInt(2);
    }
    return count;
};
const count3 = (val) => {
    let count = 0;
    while (true) {
        if (val % BigInt(3) === BigInt(0)) {
            count++;
            val /= BigInt(3);
        } else {
            break;
        }
    }
    return count;
};
nums.forEach((num, idx) => {
    dict.push([idx, count3(num), count2(num)]);
});

const answer = dict
    .sort((a, b) => {
        if (b[1] > a[1]) {
            return 1;
        } else if (b[1] < a[1]) {
            return -1;
        } else {
            if (a[2] > b[2]) {
                return 1;
            } else {
                return -1;
            }
        }
    })
    .map((item) => {
        return Number(nums[item[0]]);
    })
    .join(" ");
console.log(answer);

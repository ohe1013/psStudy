const fs = require("fs");
const filePath = process.platform === "linux" ? "/dev/stdin" : "example.txt";
const splitType = process.platform === "linux" ? "\n" : "\r\n";
let input = fs.readFileSync(filePath).toString().trim().split(splitType);

const [N, D] = input.shift().split(" ").map(Number);
let dp = [0];
for (let i = 1; i <= D; i++) {
    dp.push(i);
}
const sortedInput = input.sort((a, b) => {
    return parseInt(a.split(" ")[1]) - parseInt(b.split(" ")[1]);
});

sortedInput.forEach((item) => {
    const [start, end, distance] = item.split(" ").map(Number);
    if (end > D) return;
    if (start + distance < end) {
        if (dp[end] > dp[start] + distance) {
            const short = dp[end] - dp[start] - distance;
            dp = dp.map((item, index) => {
                if (index >= end) {
                    return item - short;
                } else {
                    return item;
                }
            });
        }
    }
});
console.log(dp[D]);

const user = {
    name: "ohhk",
    profile: {
        phoneNumber: "010-1234-5678",
        address: ["Seoul", "China"],
    },
};

const { profile: asd } = user;

console.log(asd);

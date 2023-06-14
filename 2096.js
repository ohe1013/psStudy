// const fs = require("fs");
// const filePath = process.platform === "linux" ? "/dev/stdin" : "example.txt";
// const splitType = process.platform === "linux" ? "\n" : "\r\n";
// let input = fs.readFileSync(filePath).toString().trim().split(splitType);
const readline = require("readline").createInterface({
    input: process.stdin,
    output: process.stdout,
});

let run = 0;
// (0, 1, 2) max  (3, 4, 5) min
let result = [];
readline
    .on("line", (input) => {
        let min_dp = result[0].split(" ");
        let max_dp = result[1].split(" ");

        if (run >= 2) {
            const temp_min = [...min_dp];
            const temp_max = [...max_dp];
            input
                .split(" ")
                .map(Number)
                .forEach((n, i) => {
                    if (i === 0) {
                        temp_min[i] = n + Math.min(min_dp[i], min_dp[i + 1]);
                        temp_max[i] = n + Math.max(max_dp[i], max_dp[i + 1]);
                    } else if (i === 1) {
                        temp_min[i] = n + Math.min(min_dp[i - 1], min_dp[i], min_dp[i + 1]);
                        temp_max[i] = n + Math.max(max_dp[i - 1], max_dp[i], max_dp[i + 1]);
                    } else {
                        temp_min[i] = n + Math.min(min_dp[i - 1], min_dp[i]);
                        temp_max[i] = n + Math.max(max_dp[i - 1], max_dp[i]);
                    }
                });
            min_dp = temp_min;
            max_dp = temp_max;
        } else if (run === 1) {
            result = [input[0].split(" ").map(Number), input[0].split(" ").map(Number)];
        }
        result = [max_dp, min_dp];
        run++;
    })
    .on("close", () => {
        console.log(Math.max(...result[0]), Math.min(...result[1]));

        // console.log(`${Math.max(result[0], result[1], result[2])} ${Math.min(result[3], result[4], result[5])}`);
    });

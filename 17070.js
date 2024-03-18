const fs = require("fs");
const filePath = process.platform === "linux" ? "/dev/stdin" : "example.txt";
const splitType = process.platform === "linux" ? "\n" : "\r\n";
let input = fs.readFileSync(filePath).toString().trim().split(splitType);

const N = +input.shift();

const pipeMap = input.map((line) =>
  line.split(" ").map((item) => Number(item))
);
const dp = new Array(N + 1).fill(0).map((item) =>
  new Array(N + 1).fill(0).map((item) => ({
    가로: 0,
    세로: 0,
    대각선: 0,
  }))
);
dp[0][1] = {
  가로: 1,
  세로: 0,
  대각선: 0,
};

for (let i = 0; i < N; i++) {
  for (let j = 0; j < N; j++) {
    if (pipeMap[i][j] === 1) {
      dp[i][j + 1]["가로"] = 0;
      dp[i][j + 1]["대각선"] = 0;
      dp[i + 1][j]["세로"] = 0;
      dp[i + 1][j]["대각선"] = 0;
      dp[i + 1][j + 1]["대각선"] = 0;
      dp[i + 1][j + 1]["가로"] = 0;
      dp[i + 1][j + 1]["세로"] = 0;

      continue;
    }
    dp[i][j + 1]["가로"] = Math.max(
      dp[i][j]["가로"] + dp[i][j]["대각선"],
      dp[i][j + 1]["가로"]
    );
    dp[i + 1][j]["세로"] = Math.max(
      dp[i][j]["대각선"] + dp[i][j]["세로"],
      dp[i + 1][j]["세로"]
    );
    dp[i + 1][j + 1]["대각선"] = Math.max(
      dp[i][j]["가로"] + dp[i][j]["세로"] + dp[i][j]["대각선"],
      dp[i + 1][j + 1]["대각선"]
    );
  }
}
console.log(dp[N][N]["가로"] + dp[N][N]["세로"] + dp[N][N]["대각선"]);

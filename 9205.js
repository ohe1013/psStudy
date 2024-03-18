const fs = require("fs");
const filePath = process.platform === "linux" ? "/dev/stdin" : "example.txt";
const splitType = process.platform === "linux" ? "\n" : "\r\n";
let input = fs.readFileSync(filePath).toString().trim().split(splitType);

//무조건 다 다녀봐야 할 수 있다.
//일종의 브루트 포스이다.

const calcDist = (a, b) => {
  return Math.abs(a[0] - b[0]) + Math.abs(a[1] - b[1]);
};

const N = +input.shift();
let answer;
const bfs = (home, cvsList, visitList, festival) => {
  const temp = [...cvsList];
  if (answer === "happy") return;
  if (calcDist(home, festival) <= 1000) {
    answer = "happy";
    return;
  }

  temp.forEach((cvs, idx) => {
    if (visitList[idx] === true) return;
    if (answer === "happy") return;
    if (calcDist(home, cvs) <= 1000) {
      visitList[idx] = true;
      bfs(cvs, cvsList, visitList, festival);
      visitList[idx] = false;
    }
  });
};

for (let i = 0; i < N; i++) {
  const cvsCount = +input.shift();
  const home = input.shift().split(" ").map(Number);
  const cvsList = [];
  const visitList = new Array(cvsCount).fill(false);
  for (let j = 0; j < cvsCount; j++) {
    cvsList.push(input.shift().split(" ").map(Number));
  }
  const festival = input.shift().split(" ").map(Number);
  answer = "sad";
  bfs(home, cvsList, visitList, festival);
  console.log(answer);
}

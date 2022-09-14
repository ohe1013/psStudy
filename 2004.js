const fs = require("fs");
const filePath = process.platform === "linux" ? "/dev/stdin" : "example.txt";
const splitType = process.platform === "linux" ? "\n" : "\r\n";
let input = fs.readFileSync(filePath).toString().trim().split(splitType);
//input[0].split(' ').map(Number)
const [n, m] = input[0].split(' ').map(Number)

//0의 갯수는 결국 2랑 5가 몇개냐이다 ㅇㅈ? 각 숫자에 2가 몇개인지 나누는 숫자의 2가 몇개인지 5가 몇개인지로 계산한다.
let two = 0;
let five = 0;

const countTwoFive = (n) => {
  let [t, f] = [0,0]
  for (let i = 5; i <= n; i *= 5) {
    f += parseInt(n / i);
  }
  for (let i = 2; i <= n; i *= 2) {
    t += parseInt(n / i);
  }

  return [t,f];
};


const[at,af] = countTwoFive(n); // 모든 two,five
const[mt,mf] = countTwoFive(m);
const[nmt,nmf] = countTwoFive(n - m);
two = at-mt-nmt;
five = af-mf-nmf;
console.log(Math.min(two,five));

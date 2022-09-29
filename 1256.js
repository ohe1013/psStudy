const fs = require("fs");
const filePath = process.platform === "linux" ? "/dev/stdin" : "example.txt";
const splitType = process.platform === "linux" ? '\n' : '\r\n'
let input = fs.readFileSync(filePath).toString().trim().split(splitType);

const [N,M,K] = input[0].split(' ').map(Number);

const factorial = (N) => {
    var result = 1;
    for(let i =2; i<=N; i++) result *= i;
    return result
}
if ( factorial(N+M) / factorial(N) /factorial(M) < K) return console.log(-1);
/*
    N만큼 0이 있는거고 M만큼 1이 있는거다.
    아니면 N+M만큼에 0 을 넣고, M만큼 1을 넣는것도 된다.
    dp[N][M] = dp[N-1][M] + dp[N][M-1];
    
*/
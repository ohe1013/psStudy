function solution(n, k) {
    let dp = new Array(k + 1).fill(0).map(() => new Array(n + 1).fill(0));
    dp[0][0] = 1;
    for (let i = 1; i <= k; i++) {
        for (let j = 0; j <= n; j++) {
            for (let p = j - 1; p >= 0; p -= 1) {
                dp[i][j] += dp[i - 1][p];
                dp[i][j] %= 1000000007;
            }
        }
    }
    return dp[k][n];
}

console.log(solution(9, 3)); // 9

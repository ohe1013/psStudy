function solution(x, y, n) {
    const operationArr = [
      [2, "mul"],
      [3, "mul"],
      [n, "plus"],
    ];
    const dp = new Array(y+1).fill(1000000)
    dp[x] = 0;
    const isDivide = (target , key)=> {
        if (Math.floor(target/key) === target/key ) return true;
    }
    const isNot = (target) => {
        if (target !== 1000000) return true
        else return false
    }
    const dfs =(i) => {
        let a = 1000000
        let b = 1000000
        let c = 1000000
        if (isDivide(i,3) && isNot(dp[i/3])) a = dp[i/3]
        if (isDivide(i,2) && isNot(dp[i/2])) b= dp[i/2] 
        if (dp[i-n] !=undefined && isNot(dp[i-n]))   c= dp[i-n] 
        dp[i]= Math.min(a,b,c)+1
    }
    for(let i=x+1;i<=y; i++){
        dfs(i)
    }
    if (dp[y] >=1000000) return -1
    return dp[y]
}
  
console.log(solution(	10, 40, 30));
  
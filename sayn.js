function solution(N, number) {
    var answer = 0;
    //dp 로 푼다면 dp[12]를 구하는 방식으로 풀면된다.
    //dp[5]를 구하는 방법은 5를 그냥 5를 넣으면된다.
    //dp[6]은 dp[5+5/5]가 돼서, 1을 처리하기 애매할 때 쓰면된다.
    /*
        구할 값은 dp[number]로 만든다.
        dp[26]은 dp[5]*5 +dp[1]
        dp[130]은 dp[25]*5 +dp[5] 가된다.
        근데 이건 dp[5]*5 +dp[1] *5 가 된다.
        1,2,3,4 만드는게 빡세다. 5/5 (5+5)/5 (5+5+5)/5 (5+5+5+5)/5 5 
        N보다 작은 숫자 만들때만 해보자.

        dp의 개념을 생각해보자, 
        항상 같은 개념으로 만들 수 있어야한다.
        여기서는 기존의 갯수를 쓴 숫자들 만큼은 만들 수 있어야한다.
        즉 3개짜리는 1개 2개를 쓴 숫자들끼리 조합하면, 다 만들 수 있어야한다.
        3개 짜리는 2개 1개 해야한다. 
        근데 중복된 숫자는 필요없다. 어떻게 만든지는 중요하지않다.
    */

    let f = [];
    //1번으로 만드는건 5가 유일하다.
    f[1] = new Set([N]);
    //최대 8번까지만 만든다.
    for (let i = 2; i < 9; i++) {
        let tempArr = new Set([Number(String(N).repeat(i))]);
        for (let optFun of optFuns) {
            for (let k = 1; k < i; k++) {
                let j = i - k;
                for (let left of f[k].values()) {
                    for (let right of f[j].values()) {
                        tempArr.add(optFun(left, right));
                    }
                }
            }
        }
        f.push(tempArr);
        if (f[i].has(number)) return i;
    }
    return -1;
}
const optFuns = [(a, b) => a + b, (a, b) => a - b, (a, b) => a * b, (a, b) => parseInt(a / b)];

console.log(solution(5, 12));

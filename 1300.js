// const fs = require("fs");
// const filePath = process.platform === "linux" ? "/dev/stdin" : "example.txt";
// const splitType = process.platform === "linux" ? '\n' : '\r\n'
// let input = fs.readFileSync(filePath).toString().trim().split(splitType).map(Number); /// /dev/stdin


// 나는 빡통이다.
// 이 문제를 접근하는 방식을 알게됐다.
// 일단 이분탐색을 할거다. 근데 어떻게 할거냐?
// 초기에 min = 1 , max = n*n으로잡는다.
// mid 는 mid= (max + min) /2 로 하는데
// 탐색할때 해당 열에서 mid값보다 작거나 같은게 몇개가 되는지 체크한다.
// ex) N = 5 일때, max =25 min =1 mid = 13이된다.
// 13보다 작은게 몇개일까? 어떻게 알 수있을까?
// 열에서 mid보다 작거나 같은게 몇개인지 체크하면 된댔지?
// 이걸 행을 다 만들어서 구분해야되나?를 생각하고있는데 아 이건 진짜 보지 말았어야했는데
// min(mid/i, N) 으로 하면된다.
// 이게 왜 돼냐? 잘 생각해보면 모든 행은 i * (1,2,3,4,5) 식으로 진행되기 때문에
// 찾으려는 값을 i로 나눈 최대 몫이 가능한 정수 부분인 것이다. 몫이 1보다 작다는건 값이 더 크다는 거니깐 ㅇㅋ?


const readline = require('readline');
const rl = readline.createInterface({
    input : process.stdin,
    output : process.stdout
});



const solution = (input) => {
    const [N,target] = input;
    let min = 1;
    let max = N * N;
    let mid = ((min + max )/2)>>0;
    let ans = 0;
    while( max >= min) {
        let count = 0;
        mid = parseInt((min + max )/2);
        
        for(let i = 1; i<=N; i++) {
            count += Math.min(parseInt(mid/i) , N);
        }
        if ( count >= target) {
            ans = mid;
            max = mid -1 ;
        } else {
            min = mid + 1;
        }
    }
    console.log(ans)
}
const input = [];
rl.on("line", function(line){
    input.push(line);
}).on("close", function(){
    solution(input);
    process.exit();
})
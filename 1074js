const fs = require("fs");
const filePath = process.platform === "linux" ? "/dev/stdin" : "example.txt";
const splitType = process.platform === "linux" ? '\n' : '\r\n'
let input = fs.readFileSync(filePath).toString().trim().split(splitType);

//잘 생각해보자~
/*
    잘 생각해보자
    행의 이동이 굉장히 규칙적이다.
    큰 틀에서부터 봐보면
    모든 움직임이 divide된다.
    64개의 기준에서 16개씩으로
    이게 말해주는건 이거다 2^3 개씩 있는데 이 절반씩으로 계속 쪼개서 움직임을 분할해서 볼수있다.
    예를들어 N이 10일경우 1024일것이고 총 갯수는 1048576개다. 이렇게보면 규칙이 없어보이지만
    이 N이 10의 크기에서 보면 N이 9인 것이 Z로 움직이는걸 알 수있다.
    그러면 이 1048576이라는 수를 4로 쪼개보면, 262144 인데, 여기서 어디에 있는지 알면된다.
    예를들어 514행 514열을 언제 방문했을지 생각해보자.
    N이 10일때 1024개가 있을때 512번째 행까지 한칸으로 생각해야한다.
    모든 행을 4사분면으로 쪼개나간다. 그러면 알수있다.
    그니깐 이런거지 1048575의 511번째 행 511번째 행보다 둘다 크니까
    4사분면이다. 그럼, 262144 * 3만큼 더한다.
    512에서 1023까지의 중간은
    512 + 256 
    
    512 + 256 - 128

    512 + 256 - 128 - 64 - 32 -16 -8 -4 -2 -1 
*/
const [N,r,c] = input.shift().split(' ').map(Number);

let rsum = 0;
let csum = 0;
let answer = 0;
for(let i = N - 1; i >= 0 ; i--) {
    let temp = Math.pow(2,i);
    let count = 0;
    rsum += temp;
    csum += temp;
    if ( r >= rsum) {
        count+=2;
    } else {
        rsum -=temp;
    }
    if ( c >= csum) {
        count++;
    } else {
        csum -=temp;
    } 
    answer += count * Math.pow(temp,2);
    
}
console.log(answer)
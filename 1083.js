const fs = require("fs");
const filePath = process.platform === "linux" ? "/dev/stdin" : "example.txt";
const splitType = process.platform === "linux" ? '\n' : '\r\n'
let input = fs.readFileSync(filePath).toString().trim().split(splitType);

let [N,S] = [parseInt(input.shift()),parseInt(input.pop())];

const arr = input[0].split(' ').map(Number);
// 교환을 S번 할 수 있다.
// 근데 막 1000번 이러면 어떻게 되나? 교환이 끝났으면 그냥 출력하면되나?
// 이제 좀 알겠다. 
// 이 말의 의미를 !!
// 남는만큼 돌리는 거구나
// 그니까 가장 큰 수를 맨 앞에 옮기는 방법을 쓰면된다.
// 가장 큰 수 부터 S번 안에 맨 앞으로 옮길 수 있는 지 체크한다.
// 그게 되면 옮긴다.
// 옮겼을때의 횟수를ㄹ K번이라고하면, S = S-k로한다.
// 이거를 반복한다.

let maxNum, maxIdx;

for( let i = 0; i <N; i++) {
    maxNum = arr[i];
    maxIdx = i;
    for (let j= i+1; j<N; j++) {
        if( S-(j-i) >=0 ) {
            if (maxNum <arr[j]) {
                maxNum = arr[j];
                maxIdx = j;
            }
        }
    }
    for (let j = maxIdx; j>i; j--) {
        [arr[j], arr[j-1]] =[arr[j-1], arr[j]];
    }
    S -= (maxIdx - i);
    if(S<=0) break;
}  
console.log(arr.join(' ')); 
const fs = require("fs");
const filePath = process.platform === "linux" ? "/dev/stdin" : "example.txt";
const splitType = process.platform === "linux" ? '\n' : '\r\n'
let input = fs.readFileSync(filePath).toString().trim().split(splitType); /// /dev/stdin

const N = parseInt(input.shift());
// 여기 나오는 숫자들이 내 앞의 나보다 큰 사람의 숫자를 말한다.

//그,럼 그냥 input의 값의 뒤 내용이 더 큰걸 나오게 그냥한다.

// 해당 나오는 인덱스의 값이 그냥 본인의 값이기 때문에 굉장히 쉽다.

// 그니까 이 갯수가 그걸 말해준다. 첫번째에 6이면 내 앞에 무지껀 6개 큰게있다.

// 3번째에 1이다. 나보다 큰게 1개밖에없다. 

// i가 0일때 6이니깐 마지막칸에 1을넣어
// i가 1일대 1이니깐 2번째칸에 2를넣어
// i 가 2일때 1이니깐 3번째칸에 3넣어
// i가 3일때 1이니깐 4번째칸에 4넣어
// i가 5일때 2니깐 6번째칸에 5넣어
// i가 0이면 무조건 맨 앞부터 채워 왜와이 가장 작은것부터 나열했기 때문에

const lineArr = Array.from({length:N }).fill(0);

// 함수로 돌린다

input[0].split(' ').map(Number).forEach((item, index) => {
    let count = 0;
    for(let j=0; j<N; j++){
        if(count === item && lineArr[j] ===0) {
            lineArr[j] = index+1;
            break;
        } else if (lineArr[j] === 0 ){
            count++;
        }
    }

    //item 값은 해당 인덱스니깐
    //index는 index+1해줘야되고
    // if(item != 0) {
    //     lineArr[item + index-1] = index+1;
        
    // } else {
    //     lineArr[lineArr.indexOf(0)] = index+1;
    // }
})
console.log(lineArr.join(' '))
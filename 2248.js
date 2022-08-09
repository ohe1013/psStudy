const fs = require("fs");
const filePath = process.platform === "linux" ? "/dev/stdin" : "example.txt";
const splitType = process.platform === "linux" ? '\n' : '\r\n'
let input = fs.readFileSync(filePath).toString().trim().split(splitType); /// /dev/stdin

// 5 3 19면

// 5자리중에서 3개 이하의 비트만 1이면 11100 11010 11001 10110 10101 10011 01110 01101 01011 00111 이게 아니다.

// 5C3 5C2 5C1 5C0 순으로 10 10 5 1 총 26이다. 

// 순서대로 쓰면

// 00000, 00001, 00010, 00011, 00100, 00101, 00110, 00111, 01000, 01001, 01010, 01011, 01100, 01101, 01110, 10000, 10001, 10010, 10011, 10100, 10101, 10110
let [size,key,target] = input[0].split(' ');
// if(Math.pow(2,key) >= target ){ 
//     console.log( parseInt(target).toString(2))
// }else {
    
// }
const oneCounter = (string) =>{
    let arr = string.split('');
    return arr.reduce((prev,cur) => parseInt(prev)+parseInt(cur));
}

let count =0;
let answer;
for(let i=0; i< Math.pow(2,size); i++){
    if(oneCounter(i.toString(2)) <= parseInt(key))  count++;
    if(count == parseInt(target)) {
        answer = i.toString(2);
    }
}

console.log(answer)

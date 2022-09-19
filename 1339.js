const fs = require("fs");
const filePath = process.platform === "linux" ? "/dev/stdin" : "example.txt";
const splitType = process.platform === "linux" ? '\n' : '\r\n'
let input = fs.readFileSync(filePath).toString().trim().split(splitType);

/*
    1. 맨 앞이 가장 큰 숫자여야함
    2. 중복되어 나오는게 가장 큰 문제이다. 
    3. 각 자리마다 해당 단어에 가산을 부여한다.
    4. 예를들어 2자리인데 AB이고 나머지가 전부 1자리인데 B이다. 근데 B가 8이고 A가 9면 더 작자나
    5. 브루트 포스로 접근하는게 제일 만만하다 일단 브루트 포스로 접근!
    6. brute force는 망했다. 10개의 순열을 만드는거에서 조진것같다.
    7. 그냥 알고리즘을 풀면된다.
    8. 사고방식은 이러하다. 각 자리수에 값을 넣고 해당 값을 dict에서 찾아서 넣는다.
    9. 설명을 조진것같다 그치? 그니깐 자릿수값만큼 더하면된다는거다.
*/
//dict를 만든다. 그리고 해당 dict의 값으로 조회해서 값을 더한다.

const N = parseInt( input.shift() );
const dict = {};
for (let i=0; i<N; i++) {
    let tempArr= input[i].split('');
    for(let j=0; j<tempArr.length; j++) {
        if(Object.keys(dict).includes(tempArr[j])) {
            dict[tempArr[j]] = dict[tempArr[j]] + Math.pow(10,tempArr.length-j-1);
        } else {
            dict[tempArr[j]] =  Math.pow(10,tempArr.length-j-1);
        }
    }
}
let arr = [];
for (let [k,v] in dict) {
    arr.push([k,dict[k]])
}
arr.sort((a,b) => a[1] - b[1])
const newDict = {}
let len = arr.length;
let count = 9;
for(let i=0; i<len; i++) {
    newDict[arr.pop()[0]] = count;
    count--
}
let sum = 0;
input.forEach((item) => {
    let temp ='';
    item.split('').forEach((i)=> {
        temp = temp + newDict[i];
    })
    sum+=parseInt(temp);
})
console.log(sum)

// const allAlpha = new Set();
// const N = parseInt( input.shift() );
// // 알파벳 종류
// for(let i = 0; i<N; i++ ){
//     input[i].split('').forEach((item) =>{
//         allAlpha.add(item);
//     })
// }
// let arr = Array.from(allAlpha)
// let count = 9;
// const numArr = []; 
// // 큰수부터 수갯수
// for(let _ of allAlpha) {
//     numArr.push(count);
//     count--
// }
// // 수순열을 만들어야됨

// const combi = (arr, selectNumber) => {
//     const results = [];
//     if ( selectNumber === 1) return arr.map((el) => [el]);

//     arr.forEach((fixed, index, origin) => {
//         const rest = [...origin.slice(0,index), ...origin.slice(index+1)]
//         const combinations = combi(rest, selectNumber - 1);
//         const attached = combinations.map((el) => [fixed, ...el]);
//         results.push(...attached);
//     })
//     return results;
// }
// let max = 0;
// combi(numArr,numArr.length).forEach((item) => {
//     const dict = {};
//     item.forEach((i,idx) => {
//         dict[arr[idx]] = i;
//     })
//     let sum = 0;
//     for(let i=0; i<N; i++) {
//         let tempArr = [];
//         input[i].split('').forEach((val) => {
//             tempArr.push(dict[val]);
//         })
//         sum += parseInt(tempArr.join(''));
//     }
//     max = sum > max ? sum: max;

// })
// console.log(max)


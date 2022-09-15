const fs = require("fs");
const filePath = process.platform === "linux" ? "/dev/stdin" : "example.txt";
const splitType = process.platform === "linux" ? '\n' : '\r\n'
let input = fs.readFileSync(filePath).toString().trim().split(splitType);

const [L,C] = input.shift().split(' ').map(Number);
const alphaArr = input.shift().split(' ');
alphaArr.sort((a,b) => a.charCodeAt()-b.charCodeAt())
const combi = (arr, selectNumber) => {
    const results = [];
    if ( selectNumber === 1) return arr.map((el) => [el]);

    arr.forEach((fixed, index, origin) => {
        const rest = origin.slice(index + 1);
        const combinations = combi(rest, selectNumber - 1);
        const attached = combinations.map((el) => [fixed, ...el]);
        results.push(...attached);
    })
    return results;
}
const answer = combi(alphaArr, L)
const check = (arr) => {
    let count1 = 0;
    let count2 = 0;
    arr.forEach((item) => {
        if (count1 === 0){
            if (item === 'a' || item === 'e' || item === 'i' || item === 'o' || item === 'u' )count1++;
            
        }
        if (count2 < 2) {
            if (item != 'a' && item != 'e'&& item != 'i' && item != 'o' && item != 'u' ) count2++;
        }
    })
    if( count1 === 1 && count2 ===2) return true;
    else return false;
}
for(let i =0;i<answer.length; i++) {
    if(check(answer[i])) {
        console.log(answer[i].join(''))
    }
}
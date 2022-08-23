const fs = require("fs");
const filePath = process.platform === "linux" ? "/dev/stdin" : "example.txt";
const splitType = process.platform === "linux" ? '\n' : '\r\n'
let input = fs.readFileSync(filePath).toString().trim().split(splitType);


function solution(topping) {
    console.log(topping.length)
    var answer = 0;
    //Set의 값의 갯수를 기준으로 보면 이건 sort된 상태이다.
    //set의 값의 갯수는 늘 늘어나니까
    //같으려면 특정 숫자에서 같아지게 되는 index의 값이 몇개나 나열되어 있나이다.
    let N = topping.length; 
    let dict = {};
    let target = {};
    topping.forEach((item) =>{
        if (Object.keys(dict).includes(item+'')) { dict[item] = dict[item] +1}
        else {
            dict[item] = 1;
        }
    })
    let pop;
    let sumx=0;
    let sumy=0;
    for(let i=0; i<N; i++){
        sumx=0;
        sumy=0;
        pop = topping.pop();
        if (Object.keys(target).includes(pop)) { target[pop]= target[pop] +1}
        else {
            target[pop] = 1;
        }
        dict[pop]= dict[pop] - 1;
        Object.keys(dict).forEach((item) =>{
            if(dict[item+''] >0) sumx++;
        })
        Object.keys(target).forEach((item) =>{
            if(target[item+''] >0) sumy++;
        })
        if (sumx === sumy) answer++;
    }
    return console.log(answer);
}

solution(input[0].split(''))
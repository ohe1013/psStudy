const fs = require("fs");
const filePath = process.platform === "linux" ? "/dev/stdin" : "example.txt";
const splitType = process.platform === "linux" ? "\n" : "\r\n";
let input = fs.readFileSync(filePath).toString().trim().split(splitType);

let [S, T] = input;
const SLen = S.length;

const reveserString = (str) => {
    let temp = "";
    for (let i = str.length - 2; i >= 0; i--) {
        temp += str[i];
    }
    return temp;
};

while (true) {
    const TLen = T.length;
    if (TLen < SLen) {
        return console.log(0);
    }
    if (TLen === SLen) {
        if (S === T) return console.log(1);
    }
    if (T[TLen - 1] === "B") {
        T = reveserString(T);
    } else {
        T = T.slice(0, TLen - 1);
    }
}

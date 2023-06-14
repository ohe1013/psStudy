const fs = require("fs");
const filePath = process.platform === "linux" ? "/dev/stdin" : "example.txt";
const splitType = process.platform === "linux" || "darwin" ? "\n" : "\r\n";
let input = fs.readFileSync(filePath).toString().trim().split(splitType);

const N = parseInt(input[0]);
let caseIdx = 1;

class Node {
    constructor(value = "") {
        this.value = value;
        this.child = {};
        this.end = false;
    }
}
class Trie {
    constructor() {
        this.root = new Node();
    }
    insert(string) {
        let currentNode = this.root;

        for (let i = 0; i < string.length; i++) {
            const currentChar = string[i];
            if (currentNode.child[currentChar] === undefined) {
                currentNode.child[currentChar] = new Node(currentNode.value + currentChar);
            } else {
                //currentNode.child가 있는경우 중에서 end가 true인경우는 만드는 도중이 아니니깐
                if (currentNode.child[currentChar].end === true) {
                    return false;
                }
            }
            currentNode = currentNode.child[currentChar];
        }
        currentNode.end = true;
        return true;
    }
}

for (let i = 0; i < N; i++) {
    const M = parseInt(input[caseIdx]);
    caseIdx++;
    const trie = new Trie();
    let answer = "YES";
    const sliced = input.slice(caseIdx, caseIdx + M).sort((a, b) => a.length - b.length);
    sliced.forEach((item) => {
        if (trie.insert(item) === false) {
            answer = "NO";
            return;
        }
    });
    console.log(answer);
    caseIdx += M;
}

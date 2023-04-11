const fs = require("fs");
const filePath = process.platform === "linux" ? "/dev/stdin" : "example.txt";
const splitType = process.platform === "linux" ? "\n" : "\r\n";
let input = fs.readFileSync(filePath).toString().trim().split(splitType);

let answer = "";
class Node {
    constructor(value = "", depth = 0) {
        this.value = value;
        this.child = {};
        this.visited = false;
        this.depth = depth;
    }
}

class Trie {
    constructor() {
        this.root = new Node();
    }
    insert(arr, depth) {
        let currentNode = this.root;

        for (let i = 0; i < arr.length; i++) {
            const currentChar = arr[i];
            if (currentNode.child[currentChar] === undefined) {
                currentNode.child[currentChar] = new Node(currentChar, depth);
            }
            currentNode = currentNode.child[currentChar];
            depth++;
        }
    }
    search(depth, curNode) {
        if (depth === 0) {
            curNode = this.root;
        }
        const keys = Object.keys(curNode.child).sort();
        for (const key of keys) {
            answer += "--".repeat(curNode.child[key].depth) + key + "\n";
            this.search(curNode.child.depth, curNode.child[key]);
        }
    }
}
const N = parseInt(input[0]);
const trie = new Trie();
for (let i = 1; i <= N; i++) {
    const [M, ...rest] = input[i].split(" ");
    trie.insert(rest, 0);
}
trie.search(0);
console.log(answer);

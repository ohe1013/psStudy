const fs = require("fs");
const subwayData = JSON.parse(fs.readFileSync("subway_data.json").toString());
const subwayNm = subwayData.DATA.map((data) => data.station_nm);

function Node(value = "") {
    this.value = value;
    this.children = new Map();
}

function Trie() {
    this.root = new Node();

    this.insert = function (string) {
        let currentNode = this.root;
        for (const char of string) {
            if (!currentNode.children.has(char)) {
                currentNode.children.set(char, new Node(currentNode.value + char));
            }
            currentNode = currentNode.children.get(char);
        }
    };
}

function Queue() {
    this.queue = [];
    this.front = 0;
    this.rear = 0;
    this.size = 0;

    this.enqueue = function (node) {
        this.size += 1;
        this.queue[this.rear++] = node;
    };

    this.garbageCollect = function () {
        if (this.size > 100000) {
            this.queue = this.queue.slice(front, rear);
        }
    };
    this.dequeue = function () {
        const value = this.queue[this.front];
        this.front++;
        this.size--;
        return value;
    };
}

function AutoComplete(trie) {
    this.root = trie.root;
    this.wordList = [];

    this.print = function (string) {
        this.wordList = [];
        const queue = new Queue();
    };
}

const trie = new Trie();

subwayNm.forEach((station) => {
    trie.insert(station);
});

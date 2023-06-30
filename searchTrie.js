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

const trie = new Trie();

subwayNm.forEach((station) => {
    trie.insert(station);
});

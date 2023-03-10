const skills = "CBD"
const skill_trees = ["BACDE", "CBADF", "AECB", "BDA"]

//skills 는 순서대로 계층을 만든다.
// skills 의 값을 key-value값으로 만든다.

function solution(skills, skill_trees) {
    const obj = {}
    var answer = skill_trees.length;
    for(let i =0; i< skills.length ; i++ ) {
        obj[skills[i]] = i;
    }
    skill_trees.forEach(skill_tree => {
        let cur = -1;
        let curArr = []
        for(let i =0; i <skill_tree.length; i++) {
            if (obj[skill_tree[i]] === undefined) continue
            if ( cur > obj[skill_tree[i]]){
                answer--;
                return
            } else {
                curArr.push(obj[skill_tree[i]])
                cur = obj[skill_tree[i]]
            }
        }
        for(let i=0; i<curArr.length; i++) {
            if(curArr[i] !== i) {
                answer--;
                return;
            } 
        }
    });
    return answer
}

solution(skills,skill_trees)
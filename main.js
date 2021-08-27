const ladderUpdate = (globalRankElem, classRankElem) => {
    fetch('https://bpl-backend-rjefe.ondigitalocean.app/ladder/').then((res) => res.json()).then(result => {
        const classMap = new Map();
        result.reduce((acc, current) => {
            const charClass = current['character_class'];
            if (classMap.has(charClass)) {
                classMap.set(charClass, classMap.get(charClass).concat(current));
            } else {
                classMap.set(charClass, [current]);
            }
            return acc;
        }, classMap);
        requestAnimationFrame(() => {
            const firstRanked = result.filter(elem => elem['account_name'] === 'RaizQT').sort((a, b) => a['rank'] < b['rank'] ? -1 : 1).pop();
            const classRank = classMap.get(firstRanked['character_class']);
            globalRankElem.innerHTML = firstRanked['rank'];
            classRankElem.innerHTML = classRank.indexOf(firstRanked) + 1;
        });
    });
}

(function main() {
    const overallRankElement = document.getElementById('rank');
    const classRankElement = document.getElementById('classRank');
    ladderUpdate(overallRankElement, classRankElement);
    setInterval(() => ladderUpdate(overallRankElement, classRankElement), 20000);
})()
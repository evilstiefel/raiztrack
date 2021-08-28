const ladderUpdate = (globalRankElem, classRankElem, teamRankElem) => {
    fetch('https://bpl-backend-rjefe.ondigitalocean.app/ladder/').then((res) => res.json()).then(result => {
        const classMap = new Map();
        result.reduce((acc, current) => {
            const charClass = current['character_class'];
            const teamName = current['team_name'];
            if (classMap.has(charClass)) {
                classMap.set(charClass, classMap.get(charClass).concat(current));
            } else {
                classMap.set(charClass, [current]);
            }
            if (classMap.has(teamName)) {
                classMap.set(teamName, classMap.get(teamName).concat(current));
            } else {
                classMap.set(teamName, [current]);
            }
            return acc;
        }, classMap);
        requestAnimationFrame(() => {
            const firstRanked = result.filter(elem => elem['account_name'] === 'RaizQT').sort((a, b) => a['rank'] < b['rank'] ? -1 : 1).pop();
            const classRank = classMap.get(firstRanked['character_class']);
            const teamRank = classMap.get(firstRanked['team_name']);
            globalRankElem.innerHTML = firstRanked['rank'];
            classRankElem.innerHTML = classRank.indexOf(firstRanked) + 1;
            teamRankElem.innerHTML = teamRank.indexOf(firstRanked) + 1;
        });
        // console.log({ classMap });
    });
}

(function main() {
    const overallRankElement = document.getElementById('rank');
    const classRankElement = document.getElementById('classRank');
    const teamRankElement = document.getElementById('teamRank');
    ladderUpdate(overallRankElement, classRankElement, teamRankElement);
    setInterval(() => ladderUpdate(overallRankElement, classRankElement, teamRankElement), 20000);
})()
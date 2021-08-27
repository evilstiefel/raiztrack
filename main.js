const ladderUpdate = (element) => {
    fetch('https://bpl-backend-rjefe.ondigitalocean.app/ladder/').then((res) => res.json()).then(result => {
        requestAnimationFrame(() => {
            const firstRanked = result.filter(elem => elem['account_name'] === 'RaizQT').sort((a, b) => a['rank'] < b['rank'] ? -1 : 1).pop();
            element.innerHTML = firstRanked['rank'];
        });
    });
}

(function main() {
    const element = document.getElementById('rank');
    ladderUpdate(element);
    setInterval(() => ladderUpdate(element), 20000);
})()
// Unió (A ∪ B)
function union(setA, setB) {
    return Array.from(new Set([...setA, ...setB]));
}

// Metszet (A ∩ B)
function intersection(setA, setB) {
    return setA.filter(x => setB.includes(x));
}

// Különbség (A \ B)
function difference(setA, setB) {
    return setA.filter(x => !setB.includes(x));
}

// Segédfüggvény: szövegből tömböt készít
function parseSet(str) {
    return str.split(',').map(x => x.trim()).filter(x => x !== '');
}

// Eseménykezelő a gombra
window.onload = function() {
    const form = document.querySelector('form');
    if (!form) return;
    form.addEventListener('submit', function(e) {
        e.preventDefault();
        const setA = parseSet(document.getElementById('setA').value);
        const setB = parseSet(document.getElementById('setB').value);
        const operation = document.getElementById('operation').value;
        let result = [];
        if (operation === 'union') {
            result = union(setA, setB);
        } else if (operation === 'intersection') {
            result = intersection(setA, setB);
        } else if (operation === 'difference') {
            result = difference(setA, setB);
        }
        document.getElementById('result').textContent = `{ ${result.join(', ')} }`;
    });
};
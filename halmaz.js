function halmazBeolvas(str) {
    return str.split(',').map(x => x.trim()).filter(x => x !== '');
}

function egyesites(halmazA, halmazB) {
    return Array.from(new Set([...halmazA, ...halmazB]));
}

function metszet(halmazA, halmazB) {
    return halmazA.filter(x => halmazB.includes(x));
}

function kulonbseg(halmazA, halmazB) {
    return halmazA.filter(x => !halmazB.includes(x));
}

const tesztA = halmazBeolvas('1,2,3,4');
const tesztB = halmazBeolvas('3,4,5,6');
console.log('A:', tesztA);
console.log('B:', tesztB);
console.log('Unió:', egyesites(tesztA, tesztB));
console.log('Metszet:', metszet(tesztA, tesztB));
console.log('Különbség (A \ B):', kulonbseg(tesztA, tesztB));
console.log('Különbség (B \ A):', kulonbseg(tesztB, tesztA));

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
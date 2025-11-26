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
    drawVennDiagram();
    const form = document.querySelector('form');
    if (form) {
        form.addEventListener('submit', function(e) {
            e.preventDefault();
            const setA = parseSet(document.getElementById('setA').value);
            const setB = parseSet(document.getElementById('setB').value);
            const operation = document.getElementById('operation').value;
            let result = [];
            if (operation === 'union') {
                result = egyesites(setA, setB);
            } else if (operation === 'intersection') {
                result = metszet(setA, setB);
            } else if (operation === 'differenceAB') {
                result = kulonbseg(setA, setB);
            } else if (operation === 'differenceBA') {
                result = kulonbseg(setB, setA);
            }
            document.getElementById('ered').textContent = `{ ${result.join(', ')} }`;
            // Metszet, unió, különbség: mindig írjuk ki a metszetbe azokat az elemeket, amelyek mindkét halmazban benne vannak
            // Unió: minden elem, Metszet: csak közös, Különbség: csak az egyikben
            // A metszet mindig helyesen jelenjen meg a középső részben
            let intersection = metszet(setA, setB);
            if (intersection.length && (operation === 'union' || operation === 'intersection')) {
                // Metszet elemei mindig középre
                drawVennDiagram(setA, setB, 'intersection', intersection);
            } else {
                drawVennDiagram(setA, setB, operation, result);
            }
        });
    }
};

function drawVennDiagram(setA = [], setB = [], operation = '', result = []) {
    const canvas = document.getElementById('MyCanvas');
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    // Körök
    drawCircle(ctx, 110, 125, 60, 'blue', 0.4);
    drawCircle(ctx, 190, 125, 60, 'red', 0.4);
    // Elemszámok vagy elemek kiírása
    ctx.font = '16px Arial';
    ctx.fillStyle = 'black';
    // Halmaz A csak saját elemei
    const onlyA = setA.filter(x => !setB.includes(x));
    ctx.fillText(onlyA.length ? onlyA.join(', ') : '', 70, 125);
    // Halmaz B csak saját elemei
    const onlyB = setB.filter(x => !setA.includes(x));
    ctx.fillText(onlyB.length ? onlyB.join(', ') : '', 210, 125);
    // Metszet elemei (közös rész)
    const intersection = setA.filter(x => setB.includes(x));
    ctx.fillText(intersection.length ? intersection.join(', ') : '', 140, 125);
}

// Függvény: kör rajzolása egy canvas elemre
function drawCircle(ctx, x, y, radius, color, opacity = 0.4) {
    ctx.save();
    ctx.beginPath();
    ctx.arc(x, y, radius, 0, 2 * Math.PI);
    ctx.fillStyle = color;
    ctx.globalAlpha = opacity;
    ctx.fill();
    ctx.globalAlpha = 1.0; // visszaállítás
    ctx.strokeStyle = 'black';
    ctx.stroke();
    ctx.restore();
}
// Eseménykezelő a gombra
document.getElementById('calculateBtn').onclick = function() {
        if (typeof halmazmuvelet === 'function') {
            halmazmuvelet();
        }
    };
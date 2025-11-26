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
    if (form) {
        form.addEventListener('submit', function(e) {
            e.preventDefault();
            const setA = parseSet(document.getElementById('setA').value);
            const setB = parseSet(document.getElementById('setB').value);
            // Számítsuk ki a részeket
            const onlyA = setA.filter(x => !setB.includes(x));
            const onlyB = setB.filter(x => !setA.includes(x));
            const intersection = setA.filter(x => setB.includes(x));
            // Rajzolás
            drawVennDiagram(onlyA, onlyB, intersection);
            // Szöveges eredmény
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
        });
    }
    // Alapértelmezett üres Venn-diagram
    drawVennDiagram([], [], []);
};

function drawVennDiagram(onlyA, onlyB, intersection) {
    const canvas = document.getElementById('MyCanvas');
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    // Körök
    drawCircle(ctx, 110, 100, 60, 'blue', 0.5);
    drawCircle(ctx, 190, 100, 60, 'red', 0.5);
    ctx.font = '16px Arial';
    ctx.fillStyle = 'black';
    // Bal kör (A)
    ctx.fillText('A', 70, 80);
    // Halmaz elemek (sárgák)
    ctx.fillStyle = 'black';
    // Jobb kör (B)
    ctx.fillText('B', 210, 80);
    // Bal kör (A\B)
    if (onlyA.length) ctx.fillText(onlyA.join(', '), 70, 100);
    // Jobb kör (B\A)
    if (onlyB.length) ctx.fillText(onlyB.join(', '), 210, 100);
    // Metszet
    if (intersection.length) ctx.fillText(intersection.join(', '), 140, 100);
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
    ctx.restore();
}
// Eseménykezelő a gombra
document.getElementById('calculateBtn').onclick = function() {
        if (typeof halmazmuvelet === 'function') {
            halmazmuvelet();
        }
    };
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
    const canvas = document.getElementById('MyCanvas');
    if (canvas) {
        const ctx = canvas.getContext('2d');
        // Két kör: kék és piros, átlapolva
        drawCircle(ctx, 110, 100, 60, 'blue', 0.5);   // bal oldali kék kör
        drawCircle(ctx, 190, 100, 60, 'red', 0.5);    // jobb oldali piros kör
    }

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
            } else if (operation === 'difference') {
                result = kulonbseg(setA, setB);
            }
            document.getElementById('result').textContent = `{ ${result.join(', ')} }`;
        });
    }
};

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
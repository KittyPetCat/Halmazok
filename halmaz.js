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
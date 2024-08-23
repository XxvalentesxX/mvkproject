function loop({ cantidad, codigo }) {
    if (typeof cantidad !== 'number' || cantidad <= 0) {
        throw new Error('The quantity must be a number greater than 0.');
    }
    for (let i = 0; i < cantidad; i++) {
        codigo(i);
    }
}

module.exports = loop;

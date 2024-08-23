/**
 * Ejecuta un bloque de código un número específico de veces.
 * @param {number} cantidad - La cantidad de veces que se repetirá el loop.
 * @param {Function} codigo - La función que contiene el bloque de código a ejecutar.
 */
function loop({ cantidad, codigo }) {
    // Verificar que cantidad sea un número y mayor que 0
    if (typeof cantidad !== 'number' || cantidad <= 0) {
        throw new Error('La cantidad debe ser un número mayor que 0.');
    }
    // Ejecutar el código la cantidad de veces especificada
    for (let i = 0; i < cantidad; i++) {
        codigo(i); // Pasar el índice actual a la función de código
    }
}

module.exports = loop;

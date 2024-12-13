let textParts = []; // Array para almacenar las partes del texto dividido

function textSplit({ text, separator }) {
  if (typeof text !== 'string' || typeof separator !== 'string') {
    throw new Error('Both text and separator must be strings.');
  }

  textParts = text.split(separator);
}

function splitText(index) {
  if (typeof index !== 'number' || index < 0 || index >= textParts.length) {
    throw new Error('Index is out of bounds.');
  }

  return textParts[index];
}

function getTextSplitLength() {
  return textParts.length;
}

module.exports = { textSplit, splitText, getTextSplitLength };

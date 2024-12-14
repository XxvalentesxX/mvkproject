let textParts = [];

function textSplit({ text, separator }) {
  if (typeof text !== 'string' || typeof separator !== 'string') {
    return console.error('Both text and separator must be strings.');
  }

  textParts = text.split(separator);
}

function splitText(index) {
  if (typeof index !== 'number' || index < 0 || index >= textParts.length) {
    return console.error('Index is out of bounds.');
  }

  return textParts[index];
}

function getTextSplitLength() {
  return textParts.length;
}

module.exports = { textSplit, splitText, getTextSplitLength };

let textParts = []; // Array para almacenar las partes del texto dividido

/**
 * Splits the text into parts based on the separator and stores them in a global array.
 * @param {Object} options - Options for splitting the text.
 * @param {string} options.text - The text to split.
 * @param {string} options.separator - The separator to use for splitting.
 */
function textSplit({ text, separator }) {
  if (typeof text !== 'string' || typeof separator !== 'string') {
    throw new Error('Both text and separator must be strings.');
  }

  textParts = text.split(separator); // Split the text and store the parts
}

/**
 * Returns the text part at the specified index.
 * @param {number} index - The index of the text part to retrieve.
 * @returns {string} - The text part at the specified index.
 */
function splitText(index) {
  if (typeof index !== 'number' || index < 0 || index >= textParts.length) {
    throw new Error('Index is out of bounds.');
  }

  return textParts[index];
}

/**
 * Returns the number of text parts.
 * @returns {number} - The number of text parts.
 */
function getTextSplitLength() {
  return textParts.length; // Return the length of the text parts array
}

module.exports = { textSplit, splitText, getTextSplitLength };

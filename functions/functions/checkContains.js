function checkContains({ text, keywords }) {
    const lowerText = text.toLowerCase();

    return keywords.some(keyword => lowerText.includes(keyword.toLowerCase()));
    }
    
    module.exports = checkContains;

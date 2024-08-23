const { EmbedBuilder } = require('discord.js');

function embedCreate(embedOptions) {
  const { description, author, authorIcon, title, titleUrl, thumbnail, footer, footerIcon, image, addfields } = embedOptions;

  if (!description && !author && !title) {
    throw new Error('The description field is required if no other field is provided.');
  }

  if (author === '') {
    throw new Error('The author field cannot be empty.');
  }

  if (title === '') {
    throw new Error('The title field cannot be empty.');
  }

  if (footer === '') {
    throw new Error('The footer field cannot be empty.');
  }

  const validateUrl = (url, fieldName) => {
    try {
      new URL(url);
    } catch {
      throw new Error(`The URL provided in ${fieldName} is invalid.`);
    }
  };

  if (authorIcon) validateUrl(authorIcon, 'authorIcon');
  if (titleUrl) validateUrl(titleUrl, 'titleUrl');
  if (thumbnail) validateUrl(thumbnail, 'thumbnail');
  if (footerIcon) validateUrl(footerIcon, 'footerIcon');
  if (image) validateUrl(image, 'image');

  const embed = new EmbedBuilder();

  if (description) embed.setDescription(description);
  if (author) embed.setAuthor({ name: author, iconURL: authorIcon });
  if (title) embed.setTitle(title).setURL(titleUrl);
  if (thumbnail) embed.setThumbnail(thumbnail);
  if (footer) embed.setFooter({ text: footer, iconURL: footerIcon });
  if (image) embed.setImage(image);

  if (embedOptions.color) embed.setColor(embedOptions.color);
  if (embedOptions.timestamp) embed.setTimestamp();

  if (Array.isArray(addfields) && addfields.length > 0) {
    addfields.forEach(field => {
      const { name, text, inline } = field;
      if (!name || !text) {
        throw new Error('The name and text of a field cannot be empty.');
      }
      embed.addFields({ name, value: text, inline: !!inline });
    });
  }

  return embed;
}

module.exports = embedCreate;

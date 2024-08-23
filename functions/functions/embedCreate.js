const { EmbedBuilder } = require('discord.js');

function embedCreate(embedOptions) {
  // Verificación de campos vacíos y URLs
  const { description, author, authorIcon, title, titleUrl, thumbnail, footer, footerIcon, image, addfields } = embedOptions;

  if (!description && !author && !title) {
    throw new Error('El campo description es obligatorio si no se proporciona ningún otro campo.');
  }

  if (author === '') {
    throw new Error('El campo author no puede estar vacío.');
  }

  if (title === '') {
    throw new Error('El campo title no puede estar vacío.');
  }

  if (footer === '') {
    throw new Error('El campo footer no puede estar vacío.');
  }

  const validateUrl = (url, fieldName) => {
    try {
      new URL(url);
    } catch {
      throw new Error(`La URL proporcionada en ${fieldName} es inválida.`);
    }
  };

  if (authorIcon) validateUrl(authorIcon, 'authorIcon');
  if (titleUrl) validateUrl(titleUrl, 'titleUrl');
  if (thumbnail) validateUrl(thumbnail, 'thumbnail');
  if (footerIcon) validateUrl(footerIcon, 'footerIcon');
  if (image) validateUrl(image, 'image');

  // Crear el embed
  const embed = new EmbedBuilder();

  if (description) embed.setDescription(description);
  if (author) embed.setAuthor({ name: author, iconURL: authorIcon });
  if (title) embed.setTitle(title).setURL(titleUrl);
  if (thumbnail) embed.setThumbnail(thumbnail);
  if (footer) embed.setFooter({ text: footer, iconURL: footerIcon });
  if (image) embed.setImage(image);

  if (embedOptions.color) embed.setColor(embedOptions.color);
  if (embedOptions.timestamp) embed.setTimestamp();

  // Agregar los fields
  if (Array.isArray(addfields) && addfields.length > 0) {
    addfields.forEach(field => {
      const { name, text, inline } = field;
      if (!name || !text) {
        throw new Error('El nombre y texto de un field no pueden estar vacíos.');
      }
      embed.addFields({ name, value: text, inline: !!inline });
    });
  }

  return embed;
}

module.exports = {
  embed: {
    create: embedCreate
  }
};

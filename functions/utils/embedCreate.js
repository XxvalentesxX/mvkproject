const { EmbedBuilder } = require('discord.js');

function embedCreate(options) {
  // Validar que al menos uno de estos campos esté presente: description, title, author.content, footer.content, image
  if (!options.description && !options.title && !options.author?.content && !options.footer?.content && !options.image) {
    throw new Error("Embed must have at least one of the following: description, title, author.content, footer.content, or image.");
  }

  // Crear un nuevo embed
  const embed = new EmbedBuilder();

  // Si description está presente, se establece
  if (options.description) {
    embed.setDescription(options.description);
  }

  // Si title está presente, se establece
  if (options.title) {
    embed.setTitle(options.title);
  }

  // Si color está presente, se establece
  if (options.color) {
    embed.setColor(options.color);
  }

  // Si se proporciona author, se agrega (content obligatorio, icon opcional)
  if (options.author && typeof options.author === 'object' && options.author.content) {
    embed.setAuthor({
      name: options.author.content,
      iconURL: options.author.icon, // icono opcional
    });
  }

  // Si se proporciona footer, se agrega (content obligatorio, icon opcional)
  if (options.footer && typeof options.footer === 'object' && options.footer.content) {
    embed.setFooter({
      text: options.footer.content,
      iconURL: options.footer.icon, // icono opcional
    });
  }

  // Si se proporciona imagen, se agrega
  if (options.image) {
    embed.setImage(options.image);
  }

  // Si se proporciona timestamp, se agrega
  if (options.timestamp) {
    embed.setTimestamp();
  }

  return embed;
}

module.exports = embedCreate;

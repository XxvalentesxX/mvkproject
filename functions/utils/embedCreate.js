const { EmbedBuilder } = require('discord.js');

function embedCreate(options) {
  if (
    !options.description &&
    !options.title &&
    !options.author?.content &&
    !options.footer?.content &&
    !options.image &&
    !options.fields
  ) {
    throw new Error(
      "Embed must have at least one of the following: description, title, author.content, footer.content, image, or fields."
    );
  }

  const embed = new EmbedBuilder();

  if (options.description) {
    embed.setDescription(options.description);
  }

  if (options.title) {
    embed.setTitle(options.title);
  }

  if (options.color) {
    embed.setColor(options.color);
  }

  if (options.author && typeof options.author === 'object' && options.author.content) {
    embed.setAuthor({
      name: options.author.content,
      iconURL: options.author.icon,
    });
  }

  if (options.footer && typeof options.footer === 'object' && options.footer.content) {
    embed.setFooter({
      text: options.footer.content,
      iconURL: options.footer.icon,
    });
  }

  if (options.image) {
    embed.setImage(options.image);
  }

  if (options.timestamp) {
    embed.setTimestamp();
  }

  if (options.fields && Array.isArray(options.fields)) {
    embed.addFields(options.fields);
  }

  return embed;
}

module.exports = embedCreate;

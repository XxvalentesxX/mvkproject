const { EmbedBuilder } = require('discord.js');

class Embed {
  constructor() {
    this.embeds = [];
  }

  Set(options) {
    if (!options) return console.error('Options cannot be empty.');

    const embed = new EmbedBuilder();

    let hasValidContent = false;

    if (options.description) {
      embed.setDescription(options.description);
      hasValidContent = true;
    }

    if (options.title) {
      embed.setTitle(options.title);
      hasValidContent = true;
    }

    if (options.color) {
      embed.setColor(options.color);
    }

    if (options.author) {
      if (typeof options.author !== 'object') {
        return console.error('Author must be an object.');
      }
      if (!options.author.content) {
        return console.error('Author requires a "content" field.');
      }
      embed.setAuthor({
        name: options.author.content,
        iconURL: options.author.icon,
      });
      hasValidContent = true;
    }

    if (options.footer) {
      if (typeof options.footer !== 'object') {
        return console.error('Footer must be an object.');
      }
      if (!options.footer.content) {
        return console.error('Footer requires a "content" field.');
      }
      embed.setFooter({
        text: options.footer.content,
        iconURL: options.footer.icon,
      });
      hasValidContent = true;
    }

    if (options.image) {
      embed.setImage(options.image);
      hasValidContent = true;
    }

    if (options.timestamp) {
      embed.setTimestamp();
    }

    if (options.fields) {
      if (!Array.isArray(options.fields)) {
        return console.error('Fields must be an array.');
      }
      for (const field of options.fields) {
        if (!field.name) {
          return console.error('A field requires a "name".');
        }
        if (!field.value) {
          return console.error('A field requires a "value".');
        }
        embed.addFields(field);
      }
      hasValidContent = true;
    }

    if (!hasValidContent) {
      return console.error(
        'The embed requires at least one of the following: description, title, author.content, footer.content, image, or fields.'
      );
    }

    this.embeds.push(embed);
  }

  Return() {
    const allEmbeds = [...this.embeds];
    this.embeds = [];
    return allEmbeds;
  }
}

module.exports = Embed;

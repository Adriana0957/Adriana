const axios = require('axios');

module.exports = {
  config: {
    name: "alchemy",
    version: "1.0",
    author: "Samir Œ",
    countDown: 5,
    role: 0,
    description: {
      vi: "",
      en: "Generate a response using the Alchemy API."
    },
    category: "𝗗𝗘𝗩𝗘𝗟𝗢𝗣𝗘𝗥",
    guide: {
      vi: "{pn} <text>",
      en: "{pn} <text>"
    }
  },

  onStart: async function ({ api, event, args, message }) {
    if (args.length === 0) {
      return message.reply("Please provide some text.");
    }

    const text = args.join(' ');

    const domainPart1 = 'https://www.samirxpikachu';
    const domainPart2 = '.run';
    const domainPart3 = '.place';

    const apiUrl = `${domainPart1}${domainPart2}${domainPart3}/alchemy?text=${encodeURIComponent(text)}`;

    message.reply("Processing your request, please wait...", async (err, info) => {
      const id = info.messageID;
      try {
        const imageStream = await axios.get(apiUrl, { responseType: 'stream' });
        message.unsend(id);
        message.reply({
          body: `Here is your image:`,
          attachment: imageStream.data
        });
      } catch (error) {
        console.error(error);
        api.sendMessage(`Error: ${error.message}`, event.threadID);
      }
    });
  }
};

module.exports = function (errors) {
  if (errors.length > 0) {
    const messages = [];

    for (const error of errors) {
      if (messages.length > 0) {
        messages.push('');
      }

      messages.push(error.message);
    }

    console.error(messages.join('\n'));
  }
};

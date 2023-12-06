export const caesarCipher = str =>
  str
    .toUpperCase()
    .replace(/[A-Z]/g, rotStr =>
      String.fromCharCode((rotStr.charCodeAt(0) % 26) + 65)
    );

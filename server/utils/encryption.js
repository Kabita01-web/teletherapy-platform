const crypto = require("crypto");

const algorithm = "aes-256-gcm";
const key = Buffer.from(process.env.FIELD_ENCRYPTION_KEY, "hex");

// Encrypt text
const encrypt = (text) => {
  if (!text) return text;

  const iv = crypto.randomBytes(16);
  const cipher = crypto.createCipheriv(algorithm, key, iv);

  let encrypted = cipher.update(text, "utf8", "hex");
  encrypted += cipher.final("hex");

  const authTag = cipher.getAuthTag();

  return {
    iv: iv.toString("hex"),
    encryptedData: encrypted,
    authTag: authTag.toString("hex"),
  };
};

// Decrypt text
const decrypt = (encryptedObj) => {
  if (!encryptedObj) return null;
  if (typeof encryptedObj === "string") return encryptedObj;

  try {
    const iv = Buffer.from(encryptedObj.iv, "hex");
    const authTag = Buffer.from(encryptedObj.authTag, "hex");
    const decipher = crypto.createDecipheriv(algorithm, key, iv);
    decipher.setAuthTag(authTag);

    let decrypted = decipher.update(encryptedObj.encryptedData, "hex", "utf8");
    decrypted += decipher.final("utf8");

    return decrypted;
  } catch (error) {
    console.error("Decryption error:", error);
    return null;
  }
};

module.exports = {
  encrypt,
  decrypt,
};

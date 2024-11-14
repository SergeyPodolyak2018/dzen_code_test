const crypto = require('crypto');

const util = require('util');

async function scryptHash(string, salt) {
  const saltInUse = salt || crypto.randomBytes(16).toString('hex');
  const hashBuffer = await util.promisify(crypto.scrypt)(string, saltInUse, 32);
  return `${hashBuffer.toString('hex')}:${saltInUse}`;
}

async function scryptVerify(testString, hashAndSalt) {
  const [, salt] = hashAndSalt.split(':');
  return (await scryptHash(testString, salt)) === hashAndSalt;
}

module.exports = {
  scryptHash,
  scryptVerify,
};

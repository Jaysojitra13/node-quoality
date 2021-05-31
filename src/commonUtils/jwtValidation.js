/* eslint-disable consistent-return */
const jwt = require('jsonwebtoken');
const crypto = require('crypto-js');

const jwtMiddleware = {};

jwtMiddleware.generateToken = (tokenData) => {
  const cipherSecret = process.env.CIPHER_SECRET;
  const jwtSecret = process.env.JWT_SECRET;
  const expiryTTL = process.env.JWT_TTL;

  const ciphertext = crypto.AES.encrypt(JSON.stringify(tokenData), cipherSecret);
  const token = jwt.sign({ sub: ciphertext.toString() }, jwtSecret, {
    expiresIn: expiryTTL,
  });
  return token;
};

jwtMiddleware.checkToken = async (req, res, next) => {
  try {
    const token = req.headers.authorization;
    if (token) {
      const decoded = await jwt.verify(token, process.env.JWT_SECRET);
      if (decoded) {
        const bytes = crypto.AES.decrypt(decoded.sub, process.env.CIPHER_SECRET);
        const decryptedData = bytes.toString(crypto.enc.Utf8);
        const finalData = JSON.parse(decryptedData);

        console.log('==>', finalData);
        next();
      } else {
        return res.status(401).send({ message: 'Invalid auth token' });
      }
    } else {
      return res.status(401).send({ message: 'Token not found' });
    }
  } catch (error) {
    console.log(error);
    return res.status(500).send({ message: 'Something went wrong' });
  }
};
module.exports = jwtMiddleware;

import bcrypt from 'bcrypt';

export const generateShortUrl = () => {
  const salt = bcrypt.genSaltSync(10);

  return salt.replace(/\//g, '').substring(0, 8);
};

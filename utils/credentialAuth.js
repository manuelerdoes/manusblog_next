
export async function saltAndHashPassword(pw) {

  const salt = crypto
    .randomBytes(SALT_LENGTH)
    .toString(BYTE_TO_STRING_ENCODING);

  crypto.pbkdf2(pw, salt, 100000, 128, 'sha512', (err, derivedKey) => {
    if (err) {
      console.log(err);
    } else {
      //return derivedKey.toString('hex');
      return derivedKey.toString(BYTE_TO_STRING_ENCODING);
    }
  });
}

export async function saltTheHash(hash, salt) {

  crypto.pbkdf2(hash, salt, 100000, 128, 'sha512', (err, derivedKey) => {
    if (err) {
      console.log(err);
    } else {
      //return derivedKey.toString('hex');
      return derivedKey.toString(BYTE_TO_STRING_ENCODING);
    }
  });
}

export async function comparePassword(hashFromUser, salt, pwFromDb) {
  const saltedHash = await saltTheHash(hashFromUser, salt);
  return crypto.timingSafeEqual(Buffer.from(saltedHash), Buffer.from(pwFromDb));
}

export async function getUserFromDb(email, hash) {
  // getUserAndHash(email).then((result) => {
  //   if (result) {
  //     if (comparePassword(hash, result.salt, result.password)) {
  //       return result;
  //     } else {
  //       return "wrong password";
  //     }
  //   } else {
  //     return null;
  //   }
  // });

} 

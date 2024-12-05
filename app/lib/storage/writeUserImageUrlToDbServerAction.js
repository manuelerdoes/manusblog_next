const { authPool } = require("../mysql");

export const writeUserImageUrlToDb = async (image, email) => {
  try {
    authPool.query(
      `UPDATE User SET image = '${image}' WHERE email = '${email}';`
    );
  } catch (error) {
    console.error('Database query failed:', error);
  }
}
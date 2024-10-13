import dotenv from 'dotenv';
dotenv.config();

export const pageTitle = "Manus Blog";
export const adminUserId = "2XKfBCU9BYWK05cYCRdzVxAzRfZ2";
export const sqlServer = "localhost";
export const sqlUser = "manusblog";
export const sqlPassword = process.env.SQL_PASSWORD;
export const sqlDatabase = "manusblog";
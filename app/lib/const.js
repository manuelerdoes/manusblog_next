export const pageTitle = "Manus Blog";

// host
export const apiServer = "http://localhost:3000";
export const hostUrl = "http://localhost:3000";

// blog database
export const sqlServer = "localhost";
export const sqlUser = "manusblog";
export const sqlPassword = process.env.SQL_PASSWORD;
export const sqlDatabase = "manusblog";

// auth database
export const authSqlServer = "localhost";
export const authSqlDatabase = "blogauth";
export const authSqlUser = "blogauth";
export const authSqlPassword = process.env.AUTH_SQL_PASSWORD;

// file storage
export const fileStorageDirectory = "public/files";
export const fileStorageUrl = `${hostUrl}/files`;

// for UploadPictures component
export const imageCompressionMaxWidth = 2048;
export const imageCompressionMaxHeight = 2048;
export const imageCompressionQuality = 0.9;
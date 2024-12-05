import { existsSync, mkdirSync, promises } from 'fs';
import { fileStorageDirectory } from '../const';

export async function saveFileToStorage(filePath, data) {

  // Save the file to the specified path
  try {
    await promises.writeFile(filePath, data, { flags: 'w+' });
  } catch (error) {
    console.error(error);
  }

  return filePath;
}
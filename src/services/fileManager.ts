import RNFS from 'react-native-fs';

// SuperSeniorAdminDev: v1.0.0 - File Management Service
// This service handles downloading and storing book files securely in the app's private directory.

// Security: Using DocumentDirectoryPath ensures files are stored in a sandboxed location,
// inaccessible by other apps.
const booksDir = `${RNFS.DocumentDirectoryPath}/books`;

const ensureDirExists = async () => {
  const exists = await RNFS.exists(booksDir);
  if (!exists) {
    await RNFS.mkdir(booksDir);
  }
};

export const getBookFilePath = (filename: string): string => {
  return `${booksDir}/${filename}`;
};

export const checkFileExists = async (filePath: string): Promise<boolean> => {
  return RNFS.exists(filePath);
};

export const downloadFile = async (fromUrl: string, toFile: string) => {
  await ensureDirExists();
  const options: RNFS.DownloadFileOptions = {
    fromUrl: fromUrl,
    toFile: toFile,
  };
  const result = await RNFS.downloadFile(options).promise;
  if (result.statusCode < 200 || result.statusCode >= 300) {
    throw new Error(`Failed to download file: Server responded with status ${result.statusCode}`);
  }
};

import axios from 'axios';
import Config from 'react-native-config';
import * as Keychain from 'react-native-keychain';
import { DocumentPickerResponse } from 'react-native-document-picker';

const api = axios.create({
  baseURL: `${Config.API_URL}/api`,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Add a request interceptor to include the auth token in requests
api.interceptors.request.use(async (config) => {
  const credentials = await Keychain.getGenericPassword();
  if (credentials) {
    config.headers.Authorization = `Bearer ${credentials.password}`;
  }
  return config;
});

export const uploadBook = async (title: string, author: string, file: DocumentPickerResponse) => {
  const formData = new FormData();
  formData.append('title', title);
  formData.append('author', author);
  formData.append('file', {
    uri: file.uri,
    type: file.type,
    name: file.name,
  });

  return api.post('/books/upload', formData, {
    headers: {
      'Content-Type': 'multipart/form-data',
    },
  });
};

export default api;

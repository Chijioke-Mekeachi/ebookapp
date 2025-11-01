import React, { useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Alert, ActivityIndicator } from 'react-native';
import DocumentPicker, { DocumentPickerResponse } from 'react-native-document-picker';
import { useAuth } from '../hooks/useAuth';
import { uploadBook } from '../services/api';
import { useNavigation } from '@react-navigation/native';

const AdminUploadScreen = () => {
  const [selectedFile, setSelectedFile] = useState<DocumentPickerResponse | null>(null);
  const [loading, setLoading] = useState(false);
  const { logout } = useAuth();
  const navigation = useNavigation();

  const selectFile = async () => {
    try {
      const res = await DocumentPicker.pickSingle({
        type: [DocumentPicker.types.doc, DocumentPicker.types.docx],
      });
      setSelectedFile(res);
    } catch (err) {
      if (DocumentPicker.isCancel(err)) {
        // User cancelled the picker
      } else {
        throw err;
      }
    }
  };

  const handleUpload = async () => {
    if (!selectedFile) {
      Alert.alert('No file selected', 'Please select a .doc or .docx file to upload.');
      return;
    }
    setLoading(true);
    try {
      // For simplicity, we'll use a fixed author and extract title from filename.
      const title = selectedFile.name?.replace(/\.(doc|docx)$/, '') || 'Untitled';
      const author = 'Admin Upload';

      await uploadBook(title, author, selectedFile);
      Alert.alert('Success', 'Book uploaded successfully!');
      setSelectedFile(null);
      navigation.goBack();
    } catch (error: any) {
      console.error('Upload failed:', error);
      const errorMessage = error.response?.data?.detail || 'An unexpected error occurred.';
      Alert.alert('Upload Failed', errorMessage);
    } finally {
      setLoading(false);
    }
  };
  
  const handleLogout = () => {
      logout();
      navigation.goBack();
  }

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Upload Book</Text>
      <Text style={styles.instructions}>Select a .doc or .docx file to convert and upload.</Text>

      <TouchableOpacity style={styles.button} onPress={selectFile}>
        <Text style={styles.buttonText}>Select File</Text>
      </TouchableOpacity>

      {selectedFile && <Text style={styles.fileName}>{selectedFile.name}</Text>}

      <TouchableOpacity style={[styles.button, styles.uploadButton]} onPress={handleUpload} disabled={!selectedFile || loading}>
        {loading ? <ActivityIndicator color="#fff" /> : <Text style={styles.buttonText}>Upload</Text>}
      </TouchableOpacity>

      <TouchableOpacity style={[styles.button, styles.logoutButton]} onPress={handleLogout}>
        <Text style={styles.buttonText}>Logout</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, justifyContent: 'center', padding: 20, backgroundColor: '#fff' },
  title: { fontSize: 24, fontWeight: 'bold', textAlign: 'center', marginBottom: 10 },
  instructions: { fontSize: 16, textAlign: 'center', color: 'gray', marginBottom: 30 },
  button: { backgroundColor: '#007AFF', padding: 15, borderRadius: 8, alignItems: 'center', marginBottom: 20 },
  buttonText: { color: '#fff', fontSize: 16, fontWeight: 'bold' },
  uploadButton: { backgroundColor: '#34C759' },
  logoutButton: { backgroundColor: '#FF3B30', marginTop: 40 },
  fileName: { textAlign: 'center', marginBottom: 20, fontStyle: 'italic' },
});

export default AdminUploadScreen;

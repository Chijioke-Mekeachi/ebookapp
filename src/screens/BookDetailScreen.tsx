import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, Image, TouchableOpacity, ActivityIndicator, Alert } from 'react-native';
import { useRoute, RouteProp, useNavigation, NavigationProp } from '@react-navigation/native';
import { RootStackParamList } from '../navigation/AppNavigator';
import { checkFileExists, downloadFile, getBookFilePath } from '../services/fileManager';

type BookDetailScreenRouteProp = RouteProp<RootStackParamList, 'BookDetail'>;

const BookDetailScreen = () => {
  const route = useRoute<BookDetailScreenRouteProp>();
  const navigation = useNavigation<NavigationProp<RootStackParamList>>();
  const { book } = route.params;

  const [isDownloaded, setIsDownloaded] = useState(false);
  const [isDownloading, setIsDownloading] = useState(false);
  const [checking, setChecking] = useState(true);

  const filePath = getBookFilePath(book.filename);

  useEffect(() => {
    const checkStatus = async () => {
      const exists = await checkFileExists(filePath);
      setIsDownloaded(exists);
      setChecking(false);
    };
    checkStatus();
  }, [filePath]);

  const handleDownload = async () => {
    setIsDownloading(true);
    try {
      await downloadFile(book.download_url, filePath);
      setIsDownloaded(true);
      Alert.alert('Success', 'Book downloaded successfully!');
    } catch (error) {
      console.error('Download failed:', error);
      Alert.alert('Error', 'Failed to download the book.');
    } finally {
      setIsDownloading(false);
    }
  };

  const handleRead = () => {
    navigation.navigate('Reader', { bookUri: filePath, title: book.title });
  };

  return (
    <View style={styles.container}>
      <Image source={{ uri: book.cover_image }} style={styles.coverImage} />
      <Text style={styles.title}>{book.title}</Text>
      <Text style={styles.author}>{book.author}</Text>
      
      <View style={styles.buttonContainer}>
      {checking ? (
          <ActivityIndicator />
        ) : isDownloaded ? (
          <TouchableOpacity style={styles.button} onPress={handleRead}>
            <Text style={styles.buttonText}>Read Now</Text>
          </TouchableOpacity>
        ) : (
          <TouchableOpacity style={styles.button} onPress={handleDownload} disabled={isDownloading}>
            {isDownloading ? (
              <ActivityIndicator color="#fff" />
            ) : (
              <Text style={styles.buttonText}>Download</Text>
            )}
          </TouchableOpacity>
        )}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, alignItems: 'center', padding: 20, backgroundColor: '#fff' },
  coverImage: { width: 200, height: 300, resizeMode: 'contain', marginBottom: 20, borderRadius: 8 },
  title: { fontSize: 24, fontWeight: 'bold', textAlign: 'center', marginBottom: 5 },
  author: { fontSize: 18, color: 'gray', marginBottom: 30 },
  buttonContainer: { width: '100%', paddingHorizontal: 40 },
  button: { backgroundColor: '#007AFF', padding: 15, borderRadius: 8, alignItems: 'center' },
  buttonText: { color: '#fff', fontSize: 16, fontWeight: 'bold' },
});

export default BookDetailScreen;

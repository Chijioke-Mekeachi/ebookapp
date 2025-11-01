import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import HomeScreen from '../screens/HomeScreen';
import BookDetailScreen from '../screens/BookDetailScreen';
import ReaderScreen from '../screens/ReaderScreen';
import AdminLoginScreen from '../screens/AdminLoginScreen';
import AdminUploadScreen from '../screens/AdminUploadScreen';
import { Book } from '../types';

export type RootStackParamList = {
  Home: undefined;
  BookDetail: { book: Book };
  Reader: { bookUri: string, title: string };
  AdminLogin: undefined;
  AdminUpload: undefined;
};

const Stack = createNativeStackNavigator<RootStackParamList>();

const AppNavigator = () => {
  return (
    <Stack.Navigator>
      <Stack.Screen name="Home" component={HomeScreen} options={{ headerShown: false }} />
      <Stack.Screen 
        name="BookDetail" 
        component={BookDetailScreen} 
        options={({ route }) => ({ title: route.params.book.title })}
      />
      <Stack.Screen 
        name="Reader" 
        component={ReaderScreen} 
        options={({ route }) => ({ title: route.params.title })}
      />
       <Stack.Screen 
        name="AdminLogin" 
        component={AdminLoginScreen} 
        options={{ title: 'Admin Login' }}
      />
       <Stack.Screen 
        name="AdminUpload" 
        component={AdminUploadScreen} 
        options={{ title: 'Admin Dashboard' }}
      />
    </Stack.Navigator>
  );
};

export default AppNavigator;

/**
 * SuperSeniorAdminDev: v1.0.0 - Main App Component
 * Sets up the Auth provider and the main navigation.
 */
import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import AppNavigator from './src/navigation/AppNavigator';
import { AuthProvider } from './src/context/AuthContext';
import { StatusBar } from 'react-native';

const App = () => {
  return (
    <AuthProvider>
      <NavigationContainer>
        <StatusBar barStyle="dark-content" />
        <AppNavigator />
      </NavigationContainer>
    </AuthProvider>
  );
};

export default App;

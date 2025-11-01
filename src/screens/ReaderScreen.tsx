import React from 'react';
import { WebView } from 'react-native-webview';
import { useRoute, RouteProp } from '@react-navigation/native';
import { RootStackParamList } from '../navigation/AppNavigator';
import { Platform } from 'react-native';

// SuperSeniorAdminDev: v1.0.0 - EPUB Reader Screen
// This uses a WebView to render an EPUB file using the epub.js library.
// The HTML and JS for the reader are embedded directly here for simplicity.

type ReaderScreenRouteProp = RouteProp<RootStackParamList, 'Reader'>;

const ReaderScreen = () => {
  const route = useRoute<ReaderScreenRouteProp>();
  let { bookUri } = route.params;
  
  // For WebView, local file paths need to be prefixed with 'file://'
  if (!bookUri.startsWith('file://')) {
      bookUri = `file://${bookUri}`;
  }

  // This HTML is the core of our reader. It loads epub.js and then our custom reader logic.
  // Note: For a production app, epub.js should be bundled as a local asset for offline capability.
  // Here, we load it from a CDN for simplicity.
  const readerHtml = `
    <!DOCTYPE html>
    <html>
    <head>
      <meta charset="utf-8">
      <meta name="viewport" content="width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=no">
      <title>Epub Reader</title>
      <script src="https://cdnjs.cloudflare.com/ajax/libs/epub.js/0.3.93/epub.min.js"></script>
      <style>
        body { margin: 0; overflow: hidden; }
        #viewer { height: 100vh; width: 100vw; }
        #prev, #next { 
          position: fixed; top: 0; height: 100%; width: 20%; 
          cursor: pointer; -webkit-tap-highlight-color: transparent;
        }
        #prev { left: 0; }
        #next { right: 0; }
      </style>
    </head>
    <body>
      <div id="viewer"></div>
      <div id="prev"></div>
      <div id="next"></div>
      <script>
        const book = ePub("${bookUri}");
        const rendition = book.renderTo("viewer", { width: "100%", height: "100%" });
        rendition.display();
        
        document.getElementById('prev').addEventListener('click', () => rendition.prev());
        document.getElementById('next').addEventListener('click', () => rendition.next());

        // You can communicate from WebView to React Native using window.ReactNativeWebView.postMessage()
      </script>
    </body>
    </html>
  `;

  return (
    <WebView
      originWhitelist={['*']}
      source={{ html: readerHtml, baseUrl: '' }}
      style={{ flex: 1 }}
      allowFileAccess={true}
      allowUniversalAccessFromFileURLs={true}
      allowFileAccessFromFileURLs={true}
    />
  );
};

export default ReaderScreen;

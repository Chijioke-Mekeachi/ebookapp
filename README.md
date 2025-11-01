# Frontend - NovelUp Mobile App

This is the React Native (CLI) mobile application for NovelUp.

## Features

- Browse and view a list of books from the backend.
- Download books for offline reading.
- Read downloaded EPUBs in a custom in-app reader.
- Secure admin section for logging in and uploading new `.doc` files.

## Tech Stack

- React Native
- TypeScript
- React Navigation
- Axios for API requests
- React Native FS for file management
- React Native Keychain for secure token storage
- React Native Config for environment variables

## Setup and Installation

**1. Environment Setup**

Ensure you have a complete React Native development environment set up. Follow the official documentation for your OS and target platform (iOS/Android):
[https://reactnative.dev/docs/environment-setup](https://reactnative.dev/docs/environment-setup)

**2. Dependencies**

```bash
# Navigate to the frontend directory
cd frontend

# Install npm packages
npm install

# For iOS, install CocoaPods dependencies
cd ios && pod install && cd ..
```

**3. Configuration**

Create a `.env` file from the example:

```bash
cp .env.example .env
```

Edit the `.env` file and set `API_URL` to the correct address of your running backend instance.
- **Android Emulator:** `http://10.0.2.2:8000`
- **iOS Simulator:** `http://localhost:8000`
- **Physical Device:** Your computer's local IP address (e.g., `http://192.168.1.5:8000`)

**4. Running the App**

Make sure your backend server is running first!

```bash
# To run on an Android emulator/device
npm run android

# To run on an iOS simulator/device (macOS only)
npm run ios
```
# ebookapp

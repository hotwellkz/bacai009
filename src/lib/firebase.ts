import { initializeApp } from 'firebase/app';
import { getAuth, GoogleAuthProvider } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore';

// Get Firebase config from environment variables with fallback
const getFirebaseConfig = () => {
  const config = {
    apiKey: import.meta.env.VITE_FIREBASE_API_KEY || '',
    authDomain: import.meta.env.VITE_FIREBASE_AUTH_DOMAIN || '',
    projectId: import.meta.env.VITE_FIREBASE_PROJECT_ID || '',
    storageBucket: import.meta.env.VITE_FIREBASE_STORAGE_BUCKET || '',
    messagingSenderId: import.meta.env.VITE_FIREBASE_MESSAGING_SENDER_ID || '',
    appId: import.meta.env.VITE_FIREBASE_APP_ID || ''
  };

  // Check for missing required values
  const missingVars = Object.entries(config)
    .filter(([_, value]) => !value)
    .map(([key]) => key);

  if (missingVars.length > 0 && import.meta.env.DEV) {
    console.warn('Missing Firebase config variables:', missingVars.join(', '));
  }

  return config;
};

// Initialize Firebase with config
const firebaseConfig = getFirebaseConfig();

// Initialize app with error handling
let firebaseApp;
try {
  if (Object.values(firebaseConfig).every(value => value)) {
    firebaseApp = initializeApp(firebaseConfig);
  } else {
    throw new Error('Invalid Firebase configuration');
  }
} catch (error) {
  console.error('Firebase initialization failed:', error);
  firebaseApp = null;
}

// Export Firebase services
export const app = firebaseApp;
export const auth = getAuth(firebaseApp);
export const googleProvider = new GoogleAuthProvider();
export const db = getFirestore(firebaseApp);
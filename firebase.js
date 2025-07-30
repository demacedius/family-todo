// firebaseConfig.js
import { getFirestore } from 'firebase/firestore';
import { initializeApp } from 'firebase/app';
import { getReactNativePersistence, initializeAuth } from 'firebase/auth';
import ReactNativeAsyncStorage from '@react-native-async-storage/async-storage';

const firebaseConfig = {
  apiKey: "AIzaSyARB1yOgEe3kXrK5D4la3GnLtzi97jndnw",
  authDomain: "family-todo-f74ec.firebaseapp.com",
  projectId: "family-todo-f74ec",
  storageBucket: "family-todo-f74ec.appspot.com", 
  messagingSenderId: "16544923086",
  appId: "1:16544923086:android:264478c529537a3ee6ff9f"
};

const app = initializeApp(firebaseConfig);

const auth = initializeAuth(app, {
  persistence: getReactNativePersistence(ReactNativeAsyncStorage)
});

export {auth};
export const db = getFirestore(app);

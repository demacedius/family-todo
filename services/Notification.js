import messaging from '@react-native-firebase/messaging';
import { db } from '../firebase';
import { collection, addDoc } from 'firebase/firestore';

export const requestAndSaveFCMToken = async (deviceName = null) => {
  const authStatus = await messaging().requestPermission();
  const enabled =
    authStatus === messaging.AuthorizationStatus.AUTHORIZED ||
    authStatus === messaging.AuthorizationStatus.PROVISIONAL;

  if (!enabled) return;

  const fcmToken = await messaging().getToken();

  console.log('FCM Token:', fcmToken);

  // Stocke le token dans Firestore
  await addDoc(collection(db, 'fcmTokens'), {
    token: fcmToken,
    device: deviceName,
    createdAt: new Date()
  });

  return fcmToken;
};

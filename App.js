import { StatusBar } from 'expo-status-bar';
import React from 'react';
import { StyleSheet } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import AddTaskScreen from './screens/addTaskScreen';
import TaskListScreen from './screens/taskListScreen';
import MyTabs from './navigation/Tabs'
import { NavigationContainer } from '@react-navigation/native';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import { useEffect } from 'react';
import { requestAndSaveFCMToken } from './services/Notification';
import {
  useFonts,
  Roboto_400Regular,
  Roboto_500Medium,
  Roboto_700Bold,
} from '@expo-google-fonts/roboto';


export default function App() {
  
  
  useEffect(() => {
    requestAndSaveFCMToken('Mac Mini Anthony');
  }, []);
  
  const [fontsLoaded] = useFonts({
    RobotoRegular: Roboto_400Regular,
    RobotoMedium: Roboto_500Medium,
    RobotoBold: Roboto_700Bold,
  });

  if (!fontsLoaded) return null;
  
  return (
    <GestureHandlerRootView>
      <SafeAreaView style={styles.container}>
        <NavigationContainer>
          <StatusBar style="auto" />
          <MyTabs />
        </NavigationContainer>
      </SafeAreaView>
    </GestureHandlerRootView>

  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});

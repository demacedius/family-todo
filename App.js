import { StatusBar } from 'expo-status-bar';
import React from 'react';
import { StyleSheet} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import AddTaskScreen from './screens/addTaskScreen';
import TaskListScreen from './screens/taskListScreen';

export default function App() {
  return (
    <SafeAreaView style={styles.container}>
        <TaskListScreen/>
        <StatusBar style="auto" />
    </SafeAreaView>

  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});

import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import TaskListScreen from "../screens/taskListScreen";
import AddTaskScreen from "../screens/addTaskScreen";
import CompleteTaskScreen from "../screens/completeTaskScreen";
import FamilyScoreScreen from "../screens/familyScoreScreen";
import { tabScreenOptions } from "../android/app/utils/navigationTheme";
import { MaterialIcons } from '@expo/vector-icons';

const Tab = createBottomTabNavigator();

export default function MyTabs() {
    return (
        <Tab.Navigator screenOptions={tabScreenOptions}>
            <Tab.Screen name="Liste" component={TaskListScreen}  options={{
                tabBarIcon: ({ color, size }) => (
                    <MaterialIcons name="list" size={28} />
                ),
               

            }} />
            <Tab.Screen name="Ajouter" component={AddTaskScreen} options={{
                tabBarIcon: ({ color, size}) => (
                    <MaterialIcons name="add" size={28} />
                ),
            
            }}/>
            <Tab.Screen name="Validée" component={CompleteTaskScreen} options={
                {
                    tabBarIcon: ({colors, size}) => (
                        <MaterialIcons name="check" size={28} />
                    ),
             
                }
            }/>
            <Tab.Screen name="Score" component={FamilyScoreScreen} options={
                {
                    tabBarIcon: ({colors, size}) => (
                        <MaterialIcons name="emoji-events" size={28} />
                    ),
      
                }
            } />
        </Tab.Navigator>
    );
}
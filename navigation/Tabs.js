import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import TaskListScreen from "../screens/taskListScreen";
import AddTaskScreen from "../screens/addTaskScreen";
import Icon from 'react-native-vector-icons/Ionicons';
import CompleteTaskScreen from "../screens/completeTaskScreen";
import FamilyScoreScreen from "../screens/familyScoreScreen";

const Tab = createBottomTabNavigator();

export default function MyTabs() {
    return (
        <Tab.Navigator>
            <Tab.Screen name="Liste" component={TaskListScreen} options={{
                tabBarIcon: ({ color, size }) => (
                    <Icon name="list-outline" size={20} />
                )
            }} />
            <Tab.Screen name="Ajouter" component={AddTaskScreen} options={{
                tabBarIcon: ({ color, size}) => (
                    <Icon name="add-circle-outline" size={20} />
                )
            }}/>
            <Tab.Screen name="Validée" component={CompleteTaskScreen} options={
                {
                    tabBarIcon: ({colors, size}) => (
                        <Icon name="checkmark-circle-outline" size={20} />
                    )
                }
            }/>
            <Tab.Screen name="Score" component={FamilyScoreScreen} options={
                {
                    tabBarIcon: ({colors, size}) => (
                        <Icon name="trophy-outline" size={20} />
                    )
                }
            }/>
        </Tab.Navigator>
    );
}
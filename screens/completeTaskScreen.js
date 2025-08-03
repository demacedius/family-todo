import React, { useEffect, useState } from "react";
import { View, Text, StyleSheet } from "react-native";
import { db } from "../firebase";
import { onSnapshot, query, where, orderBy, collection } from "firebase/firestore";
import { FlatList } from "react-native-gesture-handler";
import { globalStyles, textStyles, colors , fonts, fontSizes} from "../android/app/utils/theme";

export default function CompleteTaskScreen() {
    const [tasks, setTasks] = useState([]);

    useEffect(() => {
        const q = query(
            collection(db, 'tasks'),
            where('status', '==', true),
            orderBy('updatedAt', 'desc')
        );

        const unsubscribe = onSnapshot(q, (snapShot) => {
            const completed = snapShot.docs.map(doc => ({
                id: doc.id,
                ...doc.data()
            }));
            setTasks(completed);
        });

        return () => unsubscribe();
    }, []);

    const renderItem = ({ item }) => {
        const date = item.updatedAt?.toDate?.().toLocaleString('fr-FR', {
            day: '2-digit',
            month: '2-digit',
            year: 'numeric',
            hour: '2-digit',
            minute: '2-digit',
            second: '2-digit'
        }) ?? "Inconnue";

        return (

            <View style={globalStyles.validateTask}>
                <View style={globalStyles.textContainer}>
                    <Text style={textStyles.body}>{item.title}</Text>
                    <Text style={textStyles.body}> Terminé le : {date}</Text>
                    <Text style={textStyles.body}> Par : {item.assignedTo}</Text>
                </View>
            </View>
        )

    };

    return (
        <View style={globalStyles.container}>
            {tasks.length <= 0 ? (
                <Text style={{flex:1,textAlign: "center", verticalAlign: "middle", fontFamily: fonts.bold, fontSize: fontSizes.large}}>Aucune tâche n'a été validé aujourd'hui</Text>
            ) : (
                <View style={globalStyles.container}>
                    <Text style={textStyles.heading}>Tâches validé aujourd'hui</Text>
                    <FlatList
                        data={tasks}
                        keyExtractor={item => item.id}
                        renderItem={renderItem}
                    />
                </View>
            )
            }
        </View>
    )
}


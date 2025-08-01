import React, { useEffect, useState } from "react";
import { View, Text, StyleSheet } from "react-native";
import { db } from "../firebase";
import { onSnapshot, query, where, orderBy, collection } from "firebase/firestore";
import { FlatList } from "react-native-gesture-handler";

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
            <View>
                <Text>{item.title}</Text>
                <Text> Terminé le : {date}</Text>
                <Text> Par : { item.assignedTo}</Text>
            </View>
        )

    };

    return (
        <View style={styles.container}>
            {tasks.length <= 0 ? (
                <Text>Aucune tâche n'a été validé aujourd'hui</Text>
            ) : (
                <FlatList
                    data={tasks}
                    keyExtractor={item => item.id}
                    renderItem={renderItem}
                />
            )
            }
        </View>
    )
}

const styles = StyleSheet.create(
    {
        container: {
            backgroundColor: '#fff',
            padding: 16,
            flex: 1
        }
    }
)
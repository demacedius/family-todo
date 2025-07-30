import React, { useEffect, useState } from 'react';
import { View, Text, FlatList, StyleSheet } from 'react-native';
import { collection, onSnapshot, query, orderBy } from 'firebase/firestore';
import { db } from '../firebase';

export default function TaskListScreen() {
    const [tasks, setTasks] = useState([]);

    useEffect(() => {
        const q = query(collection(db, 'tasks'), orderBy('createdAt', 'desc'));

        const unsubscribe = onSnapshot(q, (snapshot) => {
            const data = snapshot.docs.map((doc) => ({
                id: doc.id,
                ...doc.data(),
            }));
            setTasks(data);
        });

        return () => unsubscribe();
    }, []);

    const renderItem = ({ item }) => {
        return (
            <View style={styles.taskItem}>
                <Text style={styles.title}>{item.title}</Text>
                <Text>Assigné à : {item.assignedTo}</Text>
                <Text>Status : {item.status ? 'En cours' : 'Terminé'} </Text>
            </View>
        )
    };

    return (
        <View style={styles.container}>
            <FlatList 
                data={tasks}
                keyExtractor={(item) => item.id}
                renderItem={renderItem}
                ListEmptyComponent={<Text>Il n'y a aucune tâche à faire aujourd'hui</Text>}
            />
        </View>
    )
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    backgroundColor: '#fff',
  },
  taskItem: {
    borderBottomWidth: 1,
    borderBottomColor: '#ccc',
    paddingVertical: 12,
  },
  title: {
    fontWeight: 'bold',
    fontSize: 16,
  },
});
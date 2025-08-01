import React, { useEffect, useState } from 'react';
import { View, Text, FlatList, StyleSheet, Modal, TextInput, TouchableOpacity, Button } from 'react-native';
import { collection, onSnapshot, query, orderBy } from 'firebase/firestore';
import { db } from '../firebase';
import { deleteTask, validateTask } from '../services/TaskService';
import Icon from 'react-native-vector-icons/Ionicons';
import { updateTask } from '../services/TaskService';

export default function TaskListScreen() {
    const [tasks, setTasks] = useState([]);
    const [editModalVisible, setEditModalVisible] = useState(false);
    const [currentTask, setCurrentTask] = useState(null)
    const [editTitle, setEditTitle] = useState('')
    const [editAssignedTo, setEditAssignedTo] = useState('')

    const OpenEditModal = (task) => (
        setCurrentTask(task),
        setEditTitle(task.title),
        setEditAssignedTo(task.assignedTo),
        setEditModalVisible(true)
    )

    const handleUpdate = async () => {
        if (!editTitle || !editAssignedTo) {
            alert("Les deux champs doivent être remplis !");
            return;
        }

        try {
            await updateTask(currentTask.id, {
                title: editTitle,
                assignedTo: editAssignedTo
            });
            console.log("Tâche mise à jour");
            setEditModalVisible(false);
            setCurrentTask(null);
        } catch (e) {
            console.error("Erreur lors de la mise à jour :", e);
            alert("Échec de la mise à jour.");
        }
    };


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
                <Text>Status : {item.status ? 'Terminé' : 'En cours'} </Text>
                <View style={styles.buttonRow}>
                    <TouchableOpacity style={styles.buttonBorder} onPress={() => deleteTask(item.id)}>
                        <Icon name='trash-outline' size={20} color={'#000'}></Icon>
                    </TouchableOpacity>
                    <TouchableOpacity style={styles.buttonBorder} onPress={() => OpenEditModal(item)}>
                        <Icon name='pencil-outline' size={20} color={'#000'}></Icon>
                    </TouchableOpacity>
                    <TouchableOpacity style={styles.button} onPress={() => validateTask(item.id)}>
                        <Icon name='checkmark-outline' size={20} color={'#fff'}></Icon>
                    </TouchableOpacity>
                </View>
            </View>
        )
    };

    return (
        <View style={styles.container}>
            <FlatList
                data={tasks.filter(tasks => tasks.status !== true)}
                keyExtractor={(item) => item.id}
                renderItem={renderItem}
                ListEmptyComponent={<Text>Il n'y a aucune tâche à faire aujourd'hui</Text>}
            />
            <Modal visible={editModalVisible} animationType="slide" transparent={true}>
                <View style={styles.modalContainer}>
                    <View style={styles.modalContent}>
                        <Text >Modifier la tâche</Text>
                        <TextInput
                            value={editTitle}
                            onChangeText={setEditTitle}
                            placeholder="Titre"
                        />
                        <TextInput
                            value={editAssignedTo}
                            onChangeText={setEditAssignedTo}
                            placeholder="Assigné à"
                        />
                        <Button title="Enregistrer" onPress={handleUpdate} />
                        <Button title="Annuler" onPress={() => setEditModalVisible(false)} />
                    </View>
                </View>
            </Modal>
        </View>
    )
}
const styles = StyleSheet.create({
    container: {
        flex: 1,
        flexDirection: 'column',
        padding: 16,
        backgroundColor: '#fff',
        gap: 8,
    },
    taskItem: {
        borderBottomWidth: 1,
        borderBottomColor: '#ccc',
        paddingVertical: 12,
        gap: 8,
    },
    title: {
        fontWeight: 'bold',
        fontSize: 16,
    },
    button: {
        backgroundColor: '#bf2df5ff',
        flex: 1 / 3,
        borderRadius: 999,
        alignItems: 'center',
        padding: 7
    },

    buttonBorder: {
        borderColor: '#bf2df5ff',
        borderWidth: 2,
        flex: 1 / 3,
        borderRadius: 999,
        alignItems: 'center',
        padding: 7
    },
    buttonRow: {
        flexDirection: 'row',
        gap: 10
    },
    modalContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'rgba(0, 0, 0, 0.5)', // flou derrière
    },
    modalContent: {
        backgroundColor: '#fff',
        padding: 20,
        borderRadius: 10,
        width: '80%',
    }

});
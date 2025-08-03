import React, { useEffect, useState } from 'react';
import { View, Text, FlatList, StyleSheet, Modal, TextInput, TouchableOpacity, Button } from 'react-native';
import { collection, onSnapshot, query, orderBy } from 'firebase/firestore';
import { db } from '../firebase';
import { deleteTask, validateTask } from '../services/TaskService';
import Icon from 'react-native-vector-icons/Ionicons';
import { updateTask } from '../services/TaskService';
import { Picker } from '@react-native-picker/picker';
import { globalStyles, textStyles, colors  } from '../android/app/utils/theme';

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
            <View style={globalStyles.taskItem}>
                <View style={globalStyles.textContainer}>
                    <Text style={globalStyles.title}>{item.title} </Text>
                    <Text style={globalStyles.assignedTo}>({item.assignedTo})</Text>
                    <Text>Status : {item.status ? 'Terminé' : 'En cours'} </Text>
                </View>
                <View style={globalStyles.buttonRow}>
                    <TouchableOpacity style={globalStyles.buttonBorder} onPress={() => deleteTask(item.id)}>
                        <Icon name='trash-outline' size={20} color={'#000'} ></Icon>
                    </TouchableOpacity>
                    <TouchableOpacity style={globalStyles.buttonBorder} onPress={() => OpenEditModal(item)}>
                        <Icon name='pencil-outline' size={20} color={'#000'} ></Icon>
                    </TouchableOpacity>
                    <TouchableOpacity style={globalStyles.button} onPress={() => validateTask(item.id)}>
                        <Icon name='checkmark-outline' size={20} color={'#fff'}></Icon>
                    </TouchableOpacity>
                </View>
            </View>
        )
    };

    return (
        <View style={globalStyles.container}>
            <Text style={textStyles.heading}>Tâches à faire aujourdhui</Text>
            <FlatList
                data={tasks.filter(tasks => tasks.status !== true)}
                keyExtractor={(item) => item.id}
                renderItem={renderItem}
                ListEmptyComponent={<Text>Il n'y a aucune tâche à faire aujourd'hui</Text>}
            />
            <Modal visible={editModalVisible} animationType="slide" transparent={true}>
                <View style={globalStyles.modalContainer}>
                    <View style={globalStyles.modalContent}>
                        <Text >Modifier la tâche</Text>
                        <TextInput
                            value={editTitle}
                            onChangeText={setEditTitle}
                            placeholder="Titre"
                        />
                        <Picker
                            selectedValue={editAssignedTo}
                            onValueChange={(itemValue) => setEditAssignedTo(itemValue)}
                        >
                            <Picker.Item label="Amandine" value="Amandine" />
                            <Picker.Item label="Anthony" value="Anthony" />
                            <Picker.Item label="Evan" value="Evan" />
                            <Picker.Item label="Tout le monde" value="Tout le monde" />
                        </Picker>

                        <Button title="Enregistrer" onPress={handleUpdate} />
                        <Button title="Annuler" onPress={() => setEditModalVisible(false)} />
                    </View>
                </View>
            </Modal>
        </View>
    )
}

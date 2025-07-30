import React, { useState } from "react";
import { View, Text, TextInput, Button, StyleSheet, Alert } from 'react-native';
import { addTask } from "../services/TaskService";

export default function AddTaskScreen() {
    const [title, setTitle] = useState('');
    const [assignedTo, setAssigndTo] = useState('');

    const handleAdd = async () => {
        if (!title || !assignedTo) {
            Alert.alert("Erreur tout les champs sont obligatoire !");
            return;
        }

        try {
            await addTask(title, assignedTo);
            Alert.alert("Succés", "Tâche ajoutée");
            setTitle('');
            setAssigndTo('')
        } catch (e) {
            Alert.alert("Erreur lors de l'ajout de la tâche");
        }
    }

    return(
    <View style={styles.container}>
        <Text style={styles.label}>Titre de la tâche</Text>
        <TextInput
            style={styles.input}
            value={title}
            onChangeText={setTitle}
            placeholder="Le titre de la Tâche"
        />

        <Text style={styles.label}>Assigné à :</Text>
        <TextInput
            style={styles.input}
            value={assignedTo}
            onChangeText={setAssigndTo}
            placeholder="C'est pour qui"
        />

        <Button title="Ajoutez une tâche" onPress={handleAdd} />
    </View>)

}

const styles = StyleSheet.create({
    container: {
        padding: 16,
        flex: 1,
        backgroundColor: '#fff'
    },
    label: {
        marginBottom: 8,
        fontWeight: 'bold'
    },
    input: {
        borderWidth: 1,
        borderColor: '#ccc',
        borderRadius: 6,
        padding: 10,
        marginBottom: 20
    }
});
import React, { useState } from "react";
import { View, Text, TextInput, Button, StyleSheet, Alert, TouchableOpacity } from 'react-native';
import { Picker } from '@react-native-picker/picker'
import { addTask } from "../services/TaskService";
import { globalStyles, textStyles, colors, fonts, fontSizes } from "../android/app/utils/theme";

export default function AddTaskScreen() {
    const [title, setTitle] = useState('');
    const [assignedTo, setAssignedTo] = useState('');

    const handleAdd = async () => {
        if (!title || !assignedTo) {
            Alert.alert("Erreur tout les champs sont obligatoire !");
            return;
        }

        try {
            await addTask(title, assignedTo);
            Alert.alert("Succés", "Tâche ajoutée");
            setTitle('');
            setAssignedTo('')
        } catch (e) {
            console.error("Erreur lors de l'ajout de la tâche", e)
            Alert.alert("Erreur lors de l'ajout de la tâche");
        }
    }

    return (
        <View style={globalStyles.container}>
            <Text style={textStyles.heading}> Ajouter une nouvelle tâche</Text>
            <Text style={globalStyles.textContainer}>
                Ajouter les nouvelles tâche du jour,
                elle seront affiché de la plus récente à la plus ancienne.
                N'oubliez pas de bien choisir une personne à qui donner la tâche.
            </Text>
            <View style={globalStyles.taskItem}>
                <Text style={globalStyles.label}>Titre de la tâche</Text>
                <TextInput
                    style={globalStyles.input}
                    value={title}
                    onChangeText={setTitle}
                    placeholder="Le titre de la Tâche"
                />

                <Text style={globalStyles.label}>Assigné à :</Text>
                <View style={globalStyles.pickerWrapper}>
                    <Picker
                        selectedValue={assignedTo}
                        onValueChange={(itemValue) => setAssignedTo(itemValue)}
                        style={globalStyles.picker}
                    >
                        <Picker.Item label="Amandine" value="Amandine" />
                        <Picker.Item label="Anthony" value="Anthony" />
                        <Picker.Item label="Evan" value="Evan" />
                        <Picker.Item label="Tout le monde" value="Tout le monde" />
                    </Picker>
                </View>

                <TouchableOpacity style={styles.button} onPress={handleAdd} >
                    <Text style={styles.buttonText}>Ajoutez une tâche</Text>
                </TouchableOpacity>
            </View>
        </View>)

}

const styles = StyleSheet.create({
    button: {
        backgroundColor: colors.primary,
        borderRadius: 999,
        padding: 20,
        position: "absolute",
        bottom: 20,
        right: 20,
        left: 20,
    },
    buttonText: {
        color: "#fff",
        fontFamily: fonts.bold,
        fontSize: fontSizes.large,
        textAlign: "center",
    }
});

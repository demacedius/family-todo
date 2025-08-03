import React, { useEffect, useState } from "react";
import { View, Text, StyleSheet } from "react-native";
import { db } from "../firebase";
import { onSnapshot, query, where, collection } from "firebase/firestore";

export default function FamilyScoreScreen() {
    const [totalTasks, setTotalTasks] = useState(0);
    const [completedTasks, setCompletedTasks] = useState(0);

    useEffect(() => {
        // Début de semaine (lundi 00:00)
        const now = new Date();
        const currentDay = now.getDay(); // 0 = dimanche, 1 = lundi
        const diffToMonday = currentDay === 0 ? 6 : currentDay - 1;

        const monday = new Date();
        monday.setDate(now.getDate() - diffToMonday);
        monday.setHours(0, 0, 0, 0);

        const q1 = query(
            collection(db, "tasks"),
            where("assignedTo", "==", "Evan")
        );

        const unsubscribe = onSnapshot(q1, (snapshot) => {
            const allTasks = snapshot.docs.map(doc => doc.data());

            const weeklyTasks = allTasks.filter(task => {
                const createdAt = task.createdAt?.toDate?.();
                return createdAt && createdAt >= monday;
            });

            const completed = weeklyTasks.filter(t => t.status === true);

            setTotalTasks(weeklyTasks.length);
            setCompletedTasks(completed.length);
        });

        return () => unsubscribe();
    }, []);

    const getMessage = (completed, total) => {
        if (completed === 0) return "Pas encore commencé... 😴";
        if (completed < total / 2) return "Bon début Evan ! Continue 💪";
        if (completed < total) return "Presque fini 🚀";
        return "Evan est un champion 🔥";
    };

    const getEmoji = (completed, total) => {
        if (completed === 0) return "😴";
        if (completed < total / 2) return "🟢";
        if (completed < total) return "🟡";
        return "🏆";
    };

    return (
        <View style={styles.container}>
            <Text style={styles.Text}> Evan a {totalTasks} tâches cette semaine</Text>
            <Text style={styles.Text}>
                Evan a fait {completedTasks} sur {totalTasks}
            </Text>
            <Text style={styles.Text}>
                {getMessage(completedTasks, totalTasks)}
            </Text>
            <Text style={styles.Emoji}>
                {getEmoji(completedTasks, totalTasks)}
            </Text>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        backgroundColor: "#fff",
        flex: 1,
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        gap: 20,
    },
    Text: {
        fontSize: 26,
        fontWeight: "bold",
    },
    Emoji: {
        fontSize: 72,
        padding: 16
    }
});

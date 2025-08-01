import {db} from "../firebase";
import { collection, addDoc, serverTimestamp, updateDoc, doc, deleteDoc } from "firebase/firestore";

export const addTask = async ( title, assignedTo) => {
    let pending = false
    try{
        const docRef = await addDoc(collection(db,'tasks'), {
            title,
            assignedTo,
            createdAt: serverTimestamp(),
            updatedAt: serverTimestamp(),
            status: pending
        });
        console.log("Tâche ajouté avec l'iD", docRef.id);
        return docRef.id;
    }catch(e){
        console.error("Erreur lors de l'ajout", e);
        return e;
    }
}

export const validateTask = async (taskId) => {
    try {
        const taskRef = doc(db, 'tasks', taskId);
        await updateDoc( taskRef,
            {
                status: true,
                updatedAt: serverTimestamp()
            }
        );
        console.log('Tâche mise a jour');
    }catch(e){
        console.error('Erreur lors de la mise à jours de la tâche', e)
    }
}

export const updateTask = async (taskId, updateField) => {
    try{
        const taskRef = doc(db, 'tasks', taskId);
        await updateDoc( taskRef, {
            ...updateField,
            updatedAt: serverTimestamp()
        }) 
        console.log('La tâche mise à jour :', taskId)
    }catch(e){
        console.error('Erreur lors de la modification de la tâche:', e)
    }
}


export const deleteTask = async (taskId) => {
    try {
        const taskRef = doc(db, 'tasks', taskId);
        await deleteDoc( taskRef);
        console.log('Tâche suprimé');
    }catch(e){
        console.error('Erreur lors de la supression de la tâche', e)
    }
}
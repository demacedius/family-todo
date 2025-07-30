import {db} from "../firebase";
import { collection, addDoc, serverTimestamp } from "firebase/firestore";

export const addTask = async ( title, assignedTo) => {
    let pending = false
    try{
        const docRef = await addDoc(collection(db,'tasks'), {
            title,
            assignedTo,
            createdAt: serverTimestamp(),
            status: pending
        });
        console.log("Tâche ajouté avec l'iD", docRef.id);
        return docRef.id;
    }catch(e){
        console.error("Erreur lors de l'ajout", e);
        return e;
    }
}
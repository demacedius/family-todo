const { onSchedule } = require("firebase-functions/v2/scheduler");
const { initializeApp } = require("firebase-admin/app");
const { getFirestore, collection, query, where, getDocs, addDoc, deleteDoc, doc } = require("firebase-admin/firestore");
const { getDoc, serverTimestamp } = require("firebase/firestore");

initializeApp();
const db = getFirestore();

exports.dayliCleanupAndInsert = onSchedule("every day at 00:00", async () => {
    console.log("Début de la tâche planifié a minuit");

    const doneQuery = query(collection(db,'tasks').where("status", "==", true));
    const doneTaskSnap = await getDoc(doneQuery);

    for(const task of doneTaskSnap.docs){
        await deleteDoc(doc(db,"tasks",task.id));
        console.log(`Supprimé : , ${task.id}`)
    }

    const dailySnap = getDocs(collection(db,"dailyTask"));

    const currentSnap = getDocs(query(collection(db,'dailyTask'),where("status", "==", false)));
    const currentTitle = currentSnap.docs.map(doc => doc.data().title);

    if(!currentTitle.includes(title)) {
        await addDoc(collection(db,"tasks"), {
            title,
            assignedTo,
            status: false,
            isDaily: true,
            createdAt: serverTimestamp(),
            updatedAt: serverTimestamp()
        })
        console.log(`Ajouté: ${title}`)
    }else{
        console.log(`déjà présente : ${title}`)
    }

    console.log("Tâche journalière ajoutée")

});
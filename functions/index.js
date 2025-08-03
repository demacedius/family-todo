const { setGlobalOptions } = require("firebase-functions/v2");
const { onSchedule } = require("firebase-functions/v2/scheduler");
const { onDocumentCreated } = require("firebase-functions/v2/firestore");

const admin = require("firebase-admin");
const { getFirestore, collection, query, where, getDocs, addDoc, deleteDoc, doc, Timestamp } = require("firebase-admin/firestore");

admin.initializeApp();
setGlobalOptions({ maxInstances: 10 });

const db = getFirestore();

exports.notifyOnTaskCreate = onDocumentCreated("tasks/{taskId}", async (event) => {
  const task = event.data?.value?.fields;
  if (!task) return;

  const tokensSnap = await db.collection("deviceTokens").get();
  const tokens = tokensSnap.docs.map(doc => doc.id);
  if (tokens.length === 0) return;

  const title = task.title?.stringValue || "";
  const isDaily = task.isDaily?.booleanValue || false;

  if (isDaily) {
    const today = new Date();
    today.setHours(0, 0, 0, 0);

    const dailyQuery = await db.collection("tasks")
      .where("isDaily", "==", true)
      .where("createdAt", ">=", admin.firestore.Timestamp.fromDate(today))
      .get();

    if (dailyQuery.size > 1) return;

    const dailyMessage = {
      notification: {
        title: "Les tâches du jour sont là 🧼",
        body: "Tu peux commencer dès maintenant !",
      },
      tokens,
    };

    await admin.messaging().sendMulticast(dailyMessage);
    return;
  }

  const message = {
    notification: {
      title: "Nouvelle tâche ajoutée 🆕",
      body: `Titre : ${title}`,
    },
    tokens,
  };

  await admin.messaging().sendMulticast(message);
});


exports.dailyCleanupAndInsert = onSchedule("every day 00:00", async () => {
  const doneQuery = query(collection(db, "tasks"), where("status", "==", true));
  const doneTasksSnap = await getDocs(doneQuery);

  for (const task of doneTasksSnap.docs) {
    await deleteDoc(doc(db, "tasks", task.id));
  }

  const dailySnap = await getDocs(collection(db, "dailyTasks"));
  const currentSnap = await getDocs(query(collection(db, "tasks"), where("status", "==", false)));
  const currentTitles = currentSnap.docs.map(doc => doc.data().title);

  for (const docRef of dailySnap.docs) {
    const { title, assignedTo } = docRef.data();

    if (!currentTitles.includes(title)) {
      await addDoc(collection(db, "tasks"), {
        title,
        assignedTo,
        isDaily: true,
        status: false,
        createdAt: new Date(),
        updatedAt: new Date()
      });
    }
  }
});

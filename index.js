// для запуска программы ввести node .
// или node <название директории>
// Получи и запиши serviceAccountKey.json
// https://medium.com/@impaachu/how-to-upload-data-to-firebase-firestore-cloud-database-63543d7b34c5

const admin = require('./node_modules/firebase-admin');
const serviceAccount = require("./serviceAccountKey.json");
const data = require("./data.json");

// *****************
const collectionKey = "entities"; //name of the collection

admin.initializeApp({
    credential: admin.credential.cert(serviceAccount),
    //**********************
    databaseURL: "https://learn-3d592.firebaseio.com"
});
const firestore = admin.firestore();
const settings = {timestampsInSnapshots: true};
firestore.settings(settings);
if (data && (typeof data === "object")) {
    Object.keys(data).forEach(docKey => {
        firestore.collection(collectionKey).doc(docKey).set(data[docKey]).then((res) => {
            console.log("Document " + docKey + " successfully written!");
        }).catch((error) => {
            console.error("Error writing document: ", error);
        });
    });
}
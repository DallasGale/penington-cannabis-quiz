"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.setAdminRole = exports.exportFirestoreToCSV = void 0;
const admin = require("firebase-admin");
const functions = require("firebase-functions");
const json2csv = require("json2csv");
if (!admin.apps.length) {
    admin.initializeApp();
}
// ------------------------------
// 1. Export Firestore data to CSV
// ------------------------------
exports.exportFirestoreToCSV = functions
    .region("us-central1")
    .runWith({
// enforceAppCheck: true, // Enable Firebase App Check
})
    .https.onCall(async (data, context) => {
    // Check if request is from an admin
    if (!context.auth) {
        throw new functions.https.HttpsError("unauthenticated", "Must be authenticated.");
    }
    // You can maintain a list of admin UIDs in your Firestore or environment config
    const ADMIN_UIDS = [
        "Z20R4whVL8UrHFFBOYwFA5Ks92z1",
        "y1Zp297e69TVPKdoeCKy355ICAM2",
    ]; // Replace with your Firebase UID
    if (!ADMIN_UIDS.includes(context.auth.uid)) {
        throw new functions.https.HttpsError("permission-denied", "Must be an administrator.");
    }
    try {
        const collection = data.collection;
        if (!collection) {
            throw new functions.https.HttpsError("invalid-argument", "Missing collection parameter");
        }
        // Get documents ordered by submittedAt
        const snapshot = await admin
            .firestore()
            .collection(collection)
            .orderBy("submittedAt", "desc") // Change to 'asc' if you want oldest first
            .get();
        const documents = snapshot.docs.map((doc) => {
            const data = doc.data();
            // Format the timestamp for CSV
            if (data.submittedAt) {
                // Handle both Timestamp and date strings
                const timestamp = data.submittedAt instanceof admin.firestore.Timestamp
                    ? data.submittedAt.toDate()
                    : new Date(data.submittedAt);
                data.submittedAt = timestamp.toISOString();
            }
            return Object.assign({ id: doc.id }, data);
        });
        const csv = json2csv.parse(documents);
        return { csv };
    }
    catch (error) {
        console.error("Error exporting Firestore data to CSV:", error);
        throw new functions.https.HttpsError("internal", "Error exporting Firestore data to CSV");
    }
});
// ------------------------------
// 2. Assign Admin Role
// ------------------------------
exports.setAdminRole = functions.https.onCall(async (data, context) => {
    // Security check: Only authenticated users can call this function
    if (!context.auth) {
        throw new functions.https.HttpsError("unauthenticated", "Only authenticated users can call this function");
    }
    const uid = data.uid;
    try {
        // Set the custom claim for the user
        await admin.auth().setCustomUserClaims(uid, { admin: true });
        return { message: `Admin role assigned to user ${uid}` };
    }
    catch (error) {
        throw new functions.https.HttpsError("internal", "Error assigning admin role", error.message);
    }
});
//# sourceMappingURL=index.js.map
import * as admin from "firebase-admin";
import * as functions from "firebase-functions";
import { Parser } from "json2csv";
import * as cors from "cors";

// Initialize admin with explicit credential access
admin.initializeApp({
  credential: admin.credential.applicationDefault(),
});

const corsHandler = cors({ origin: true });

/**
 * Formats a Date object into a readable string using Melbourne timezone
 * @param {Date} date - The date to format
 * @return {string} Formatted date string in Melbourne time
 */
function formatDate(date: Date): string {
  return date.toLocaleString("en-AU", {
    year: "numeric",
    month: "short",
    day: "numeric",
    hour: "2-digit",
    minute: "2-digit",
    hour12: true,
    timeZone: "Australia/Melbourne",
  });
}

/**
 * Cloud Function that exports Firestore collection data to CSV format
 * Orders documents by createdAt timestamp in descending order
 * Converts timestamp fields to readable date formats in Melbourne timezone
 * @param {functions.Request} req - The request object
 * @param {functions.Response} res - The response object
 * @return {void}
 */
export const exportFirestoreToCSV = functions
  .region("us-central1")
  .https.onRequest((req, res) => {
    corsHandler(req, res, async () => {
      try {
        const collection = req.query.collection as string;
        console.log(`Attempting to access collection: ${collection}`);

        if (!collection) {
          console.log("No collection specified");
          res.status(400).send("Missing collection parameter");
          return;
        }

        console.log(`About to fetch documents from ${collection}`);

        const collectionRef = admin
          .firestore()
          .collection(collection)
          .orderBy("createdAt", "desc");
        console.log(`Collection reference created for ${collection}`);

        const snapshot = await collectionRef.get();
        console.log(
          `Snapshot obtained. Empty? ${snapshot.empty}. Size: ${snapshot.size}`,
        );

        if (snapshot.empty) {
          console.log(`Collection ${collection} is empty`);
          res
            .status(404)
            .send(`No documents found in collection ${collection}`);
          return;
        }

        const firstDoc = snapshot.docs[0];
        console.log("First document ID:", firstDoc.id);
        console.log("First document fields:", Object.keys(firstDoc.data()));

        const fields = new Set<string>();
        snapshot.docs.forEach((doc) => {
          Object.keys(doc.data()).forEach((key) => fields.add(key));
        });
        console.log("Fields found:", Array.from(fields));

        const documents = snapshot.docs.map((doc) => {
          const data = doc.data();

          // Handle createdAt timestamp
          if (data.createdAt && data.createdAt._seconds) {
            const date = new Date(data.createdAt._seconds * 1000);
            data.createdAt = formatDate(date);
          }

          // Handle submittedAt if it exists
          if (data.submittedAt && data.submittedAt._seconds) {
            const date = new Date(data.submittedAt._seconds * 1000);
            data.submittedAt = formatDate(date);
          }

          return {
            id: doc.id,
            ...data,
          };
        });

        console.log(`Processed ${documents.length} documents`);

        const json2csvParser = new Parser({
          fields: ["id", ...Array.from(fields)],
          defaultValue: "",
        });

        const csv = json2csvParser.parse(documents);
        console.log("CSV generated successfully");

        res.header("Content-Type", "text/csv");
        res.attachment(`${collection}.csv`);
        res.send(csv);
      } catch (error) {
        console.error("Detailed error:", error);
        if (error instanceof Error) {
          console.error("Error stack:", error.stack);
        }
        res
          .status(500)
          .send(
            `Error exporting data: ${error instanceof Error ? error.message : "Unknown error"}`,
          );
      }
    });
  });

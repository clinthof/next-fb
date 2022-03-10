import admin from 'firebase-admin';
import firebaseAccountCredentials from './serviceAccountKey.json';

// Cast entire object from JSON file to service account (SO)
const serviceAccount = firebaseAccountCredentials as admin.ServiceAccount;

/* 
Attempt to initialize the application with service account credentials if not
already completed. Log an error if this doesn't work.
*/
if (!admin.apps.length) {
    try {
        admin.initializeApp({
            credential: admin.credential.cert(serviceAccount)
        });
    } catch (err) {
        if (err instanceof Error) {
            console.log(`Error: Firebase admin could not be initialized.\n${err.stack}`);
        }
    }
}

export default admin.firestore();
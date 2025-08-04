import admin from 'firebase-admin';
import fs from 'fs';

const serviceAccount = JSON.parse(
  fs.readFileSync(
    new URL('./catch-me-if-you-can-71b64-firebase-adminsdk-fbsvc-b42f0137d3.json', import.meta.url)
  )
);

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
  databaseURL: 'https://catch-me-if-you-can-71b64-default-rtdb.europe-west1.firebasedatabase.app'
});

export const db = admin.database();

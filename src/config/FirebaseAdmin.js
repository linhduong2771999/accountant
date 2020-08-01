import * as admin from 'firebase-admin';

admin.initializeApp({
    credential: admin.credential.applicationDefault(),
    databaseURL: "https://accounting-806b6.firebaseio.com"
  });

export {
    admin
}
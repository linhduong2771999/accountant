var admin = require("firebase-admin");

var serviceAccount = require("./service.json");

admin.initializeApp({
    credential: admin.credential.cert(serviceAccount)
})

const uid = "sFthk7pvyZfDhTwOcqgHmYkmuTn1";
admin.auth().getUser(uid)
  .then(function(userRecord) {
    // See the UserRecord reference doc for the contents of userRecord.
    console.log('Successfully fetched user data:', userRecord.toJSON());
  })
  .catch(function(error) {
    console.log('Error fetching user data:', error);
  });

// admin.auth().createCustomToken(uid)
// .then((customToken) => {
//     console.log(customToken)
//     // console.log()
//     localStorage.setItem("token", customToken);
// })
// .catch(error => {
//     console.log(error)
// })
import * as firebase from "firebase/app";
import "firebase/firestore";
import "firebase/auth";
import 'firebase/app';
import 'firebase/storage';
const firebaseConfig = {
    apiKey: "AIzaSyDgG3GnDTJxPKUc4isx ROhKOe-KIzQ4pDw",
    authDomain: "accounting-806b6.firebaseapp.com",
    databaseURL: "https://accounting-806b6.firebaseio.com",
    projectId: "accounting-806b6",
    storageBucket: "accounting-806b6.appspot.com",
    messagingSenderId: "304439108208",
    appId: "1:304439108208:web:0591f287602a92b2720ab5",
    measurementId: "G-Y5EQ0KWFWH"
  };
firebase.initializeApp(firebaseConfig);

var storage = firebase.storage();
firebase.firestore().settings({timestampsInSnapshots: true});

// export default {firebase, storage}; 
export {
  firebase, storage as default
}
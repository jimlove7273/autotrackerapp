import firebase from 'firebase/app'
import 'firebase/firestore'
import 'firebase/auth'

// Your web app's Firebase configuration
var firebaseConfig = {
  apiKey: "AIzaSyCvqkYYBMWB_Aiav4Iv1kn793HYZgTqBtk",
  authDomain: process.env.REACT_APP_DOMAIN,
  databaseURL: process.env.REACT_APP_FIREBASE_DATABASE,
  projectId: "clientpanelprod-2b9d4",
  storageBucket: process.env.REACT_APP_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: process.env.REACT_APP_FIREBASE_SENDER_ID,
  appId: "1:219898848212:web:58477a0371c534e3806c41"
};
// Initialize Firebase
firebase.initializeApp(firebaseConfig);

export default firebase
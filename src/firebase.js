import firebase from 'firebase'

const firebaseConfig = {
    apiKey: "AIzaSyA4cjRXzC6CnjhiVxZAzGKnk29MWWAsbRM",
    authDomain: "slack-clone-a08f7.firebaseapp.com",
    projectId: "slack-clone-a08f7",
    storageBucket: "slack-clone-a08f7.appspot.com",
    messagingSenderId: "1028203613570",
    appId: "1:1028203613570:web:3dd4250ed0cfcf12de939b"
};

const firebaseApp = firebase.initializeApp(firebaseConfig)

// firestore is the real time database
const db = firebaseApp.firestore ();

// enable authentication with Google provider
const auth = firebase.auth ();
const provider = new firebase.auth.GoogleAuthProvider();

export {auth, provider}
export default db;
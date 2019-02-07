import firebase from 'firebase';

const config = {
    apiKey: "AIzaSyAnOtL6xAsDmJiXBmWPGJ221eYKxWnoieo",
    authDomain: "piano-app-d007f.firebaseapp.com",
    databaseURL: "https://piano-app-d007f.firebaseio.com",
    projectId: "piano-app-d007f",
    storageBucket: "piano-app-d007f.appspot.com",
    messagingSenderId: "318158043514"
};

const firebaseObject = firebase.initializeApp(config);

export default firebaseObject;
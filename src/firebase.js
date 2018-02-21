import firebase from 'firebase'

const config = {
    apiKey: "AIzaSyBgMWwCowQ1Fs5tYW8O_DohH4lHSc-6KHc",
    authDomain: "todo-app-01.firebaseapp.com",
    databaseURL: "https://todo-app-01.firebaseio.com",
    projectId: "todo-app-01",
    storageBucket: "",
    messagingSenderId: "39119785284"
};

firebase.initializeApp(config);

export const database = firebase.database

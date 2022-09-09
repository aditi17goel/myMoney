import firebase from 'firebase/app'
import 'firebase/firestore'
import 'firebase/auth'

// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
    apiKey: "AIzaSyBzeJ3EFngzp-SosvxZcekuLNGYaspzed4",
    authDomain: "mymoney-3d686.firebaseapp.com",
    projectId: "mymoney-3d686",
    storageBucket: "mymoney-3d686.appspot.com",
    messagingSenderId: "19804839934",
    appId: "1:19804839934:web:f7cc34aa6164e9b778aaaf",
    measurementId: "G-9ENM1YQ8RW"
  };

  firebase.initializeApp(firebaseConfig)

  const projectFirestore = firebase.firestore()
  const projectAuth = firebase.auth()

  export {projectFirestore, projectAuth}
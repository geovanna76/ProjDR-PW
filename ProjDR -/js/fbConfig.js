// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyAQLdCNlIUJVB7diAU7GTLF45eGOHpwKbg",
  authDomain: "projeto-dr-ae.firebaseapp.com",
  databaseURL: "https://projeto-dr-ae-default-rtdb.firebaseio.com",
  projectId: "projeto-dr-ae",
  storageBucket: "projeto-dr-ae.appspot.com",
  messagingSenderId: "150932746328",
  appId: "1:150932746328:web:eba9010c9dcc7561f41a2d",
  measurementId: "G-D1C813TPP5"
};
    // Initialize Firebase
const app = firebase.initializeApp(firebaseConfig);

    // Firebase Database Reference and the child
    const dbRef = firebase.database().ref();
    const pessoaRef = dbRef.child('pessoas');
    
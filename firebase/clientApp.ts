import {initializeApp} from "firebase/app";
import {getFirestore} from "firebase/firestore";
// @ts-ignore
import firebase from 'firebase/app'
var firestore;
try{
    initializeApp({
        apiKey: "AIzaSyCKb4AFXlNrrULmmfnwQgt4yjo2LqEniNY",
        authDomain: "staht-connect-322113.firebaseapp.com",
        projectId: "staht-connect-322113",
        storageBucket: "staht-connect-322113.appspot.com",
        messagingSenderId: "1062957635061",
        appId: "1:1062957635061:web:ae189f34def46aa57d3cbc",
        measurementId: "G-9389CBET47"
    });

    firestore = getFirestore();
}catch (e) {
    console.log(e);
    firestore = getFirestore();
}





export {firestore};
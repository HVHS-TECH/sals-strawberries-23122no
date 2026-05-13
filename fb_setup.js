const firebaseConfig = {
  apiKey: "AIzaSyDCNv2W4c7UrzO2ht3wzZRVmElu633RPvs",
  authDomain: "nina-12comp-sal-s-strawberries.firebaseapp.com",
  databaseURL: "https://nina-12comp-sal-s-strawberries-default-rtdb.asia-southeast1.firebasedatabase.app",
  projectId: "nina-12comp-sal-s-strawberries",
  storageBucket: "nina-12comp-sal-s-strawberries.firebasestorage.app",
  messagingSenderId: "674069350791",
  appId: "1:674069350791:web:d35f96b9c78e5d7fcd6b22"
};

// Initialize Firebase
firebase.initializeApp(firebaseConfig);

// This log prints the firebase object to the console to show that it is working.
// As soon as you have the script working, delete this log.
console.log("Firebase initialize finished:");
console.log(firebase);
import { initializeApp } from 'firebase/app'
import {
    getFirestore, collection, getDocs
} from 'firebase/firestore'

const firebaseConfig = {
    apiKey: "AIzaSyBC0oFHvw3HTyKg5pA8WZ0g0-uxGLzrXho",
    authDomain: "fir-9-dojo-99e22.firebaseapp.com",
    projectId: "fir-9-dojo-99e22",
    storageBucket: "fir-9-dojo-99e22.appspot.com",
    messagingSenderId: "678543914092",
    appId: "1:678543914092:web:70c37fdb647c14ca5c1449"
  };

//init firebase
initializeApp(firebaseConfig)

//init servise
const db = getFirestore()

// collection ref

const colRef = collection(db, 'books')

// get collection data
getDocs(colRef)
  .then((snapshot) => {
      let books = []
      snapshot.docs.forEach((doc) => {
        books.push({ ...doc.data(), id: doc.id})
      })
      console.log(books)
  })
  .catch(err => {
      console.log(err.message)
  })
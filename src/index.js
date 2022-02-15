import { initializeApp } from 'firebase/app'
import {
    getFirestore, collection, getDocs, onSnapshot,
    addDoc, deleteDoc, doc,
    query, where,
    orderBy,
    serverTimestamp,
    getDoc,
    updateDoc
} from 'firebase/firestore'
import {
    getAuth,
    createUserWithEmailAndPassword,
    signInWithEmailAndPassword, signOut,
    onAuthStateChanged
} from 'firebase/auth'

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
const auth = getAuth()

// collection ref

const colRef = collection(db, 'books')

// queries

const q = query(colRef, orderBy("createdAt"))

// real time get collection data
// getDocs(colRef)
//   .then((snapshot) => {
//     //   console.log('snapshot',snapshot)
//       let books = []
//       snapshot.docs.forEach((doc) => {
//         books.push({ ...doc.data(), id: doc.id})
//       })
//       console.log(books)
//   })
//   .catch(err => {
//       console.log(err.message)
//   })

onSnapshot(q, (snapshot) => {
    let books = []
      snapshot.docs.forEach((doc) => {
        books.push({ ...doc.data(), id: doc.id})
      })
      console.log(books)
})

  // adding documents

  const addBookForm = document.querySelector('.add')
  addBookForm.addEventListener('submit', (e) => {
      e.preventDefault()

      addDoc(colRef, {
          title: addBookForm.title.value,
          author: addBookForm.author.value,
          createdAt: serverTimestamp()
      })
      .then(() => {
          addBookForm.reset()
      })

  })

  // deleiting documents
  const deleteBookForm = document.querySelector('.delete')
  deleteBookForm.addEventListener('submit', (e) => {
      e.preventDefault()

        const docRef = doc(db, 'books', deleteBookForm.id.value)
        deleteDoc(docRef)
        .then(() => {
            deleteBookForm.reset()
        })
      
  })

  // get sngle document

  const docRef = doc(db, 'books', 'YxFsYF4DvSJSFxKk4atn')

//   getDoc(docRef)
//   .then((doc) => {
//       console.log(doc.data(), doc.id)
//   })

  onSnapshot(docRef, (doc) => {
    console.log(doc.data(), doc.id)
  })

  const updateForm = document.querySelector('.update')

  updateForm.addEventListener('submit', (e) => {
      e.preventDefault()

      const docRef = doc(db, 'books', updateForm.id.value)

      updateDoc(docRef, {
          title: 'updated title'
      })
      .then(() => {
          updateForm.reset()
      })
  })

  // signing users up
const signupForm = document.querySelector('.signup')
signupForm.addEventListener('submit', (e) => {
  e.preventDefault()

  const email = signupForm.email.value
  const password = signupForm.password.value

  createUserWithEmailAndPassword(auth, email, password)
    .then(cred => {
      console.log('user created:', cred.user)
      signupForm.reset()
    })
    .catch(err => {
      console.log(err.message)
    })
})

const loginForm = document.querySelector('.login')
loginForm.addEventListener('submit', (e) => {
  e.preventDefault()

  const email = loginForm.email.value
  const password = loginForm.password.value

  signInWithEmailAndPassword(auth, email, password)
    .then(cred => {
      console.log('user logged in:', cred.user)
      loginForm.reset()
    })
    .catch(err => {
      console.log(err.message)
    })
})

// subscribing to auth changes
const unsubAuth = onAuthStateChanged(auth, (user) => {
    console.log('user status changed:', user)
  })
  
  // unsubscribing from changes (auth & db)
  const unsubButton = document.querySelector('.unsub')
  unsubButton.addEventListener('click', () => {
    console.log('unsubscribing')
    unsubCol()
    unsubDoc()
    unsubAuth()
  })
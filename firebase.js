// Import the functions you need from the SDKs you need
import { initializeApp } from "https://www.gstatic.com/firebasejs/9.11.0/firebase-app.js";
import {
    getFirestore,
    collection,
    addDoc,
    getDocs,
} from "https://www.gstatic.com/firebasejs/9.11.0/firebase-firestore.js";
import {
    getAuth,
    createUserWithEmailAndPassword,
    signInWithEmailAndPassword,
    signOut,
    onAuthStateChanged
} from "https://www.gstatic.com/firebasejs/9.11.0/firebase-auth.js";
import { getStorage, ref, uploadBytes, getDownloadURL  } from "https://www.gstatic.com/firebasejs/9.11.0/firebase-storage.js";

import { reValidateUser } from './methods.js'


////// Firebase configuration
const firebaseConfig = {
    apiKey: "AIzaSyCOj-0IHX80e8IqkreZ7jWZfBmnz8fkUuM",
    authDomain: "f-prog-web.firebaseapp.com",
    projectId: "f-prog-web",
    storageBucket: "f-prog-web.appspot.com",
    messagingSenderId: "625260296003",
    appId: "1:625260296003:web:cc66fe69928c51a24c21f6",
};

///// Initialize Firebase & Other services
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);
const auth = getAuth(app);
const storage = getStorage(app);


/// FIREBASE FUNCTIONS

export async function addTask(title, description, nameImg, file) {
    try {
        const uploadedFileUrl = await uploadFile(nameImg, file)

        console.log(uploadedFileUrl)

        const docRef = await addDoc(collection(db, "tasks"), {
            title,
            description,
            url: uploadedFileUrl
        });
        // console.log("Document written with ID: ", docRef.id);
    } catch (e) {
        alert("Hubo un error: " + e);
        console.error("Error adding document: ", e);
    }
}

export async function getAllTasks() {
    const querySnapshot = await getDocs(collection(db, "tasks"));
    const mappedArray = [];
    querySnapshot.forEach((doc) => {
        // console.log(doc.id, " => ", doc.data());
        mappedArray.push(doc.data());
    });

    return mappedArray;
}

export function newUser(email, password) {
    createUserWithEmailAndPassword(auth, email, password)
        .then((userCredential) => {
            // Signed in
            const user = userCredential.user;
            console.log(user);
            // ...
        })
        .catch((error) => {
            const errorMessage = error.message;

            alert(errorMessage);
        });
}

export function logIn(email, password) {
    signInWithEmailAndPassword(auth, email, password)
        .then((userCredential) => {
            // Signed in
            const user = userCredential.user;
            console.log(user);
        })
        .catch((error) => {
            const errorCode = error.code;
            const errorMessage = error.message;
            alert(errorMessage);
        });
}

export function logOut() {
    signOut(auth)
        .then(() => {
            console.log("Cerré sesion");
        })
        .catch((error) => {
            console.log("error cerrando sesion ->", error.message);
        });
}

onAuthStateChanged(auth, (user) => {
    console.log('hubo un cambio')
    if (user) {
        // User is signed in, see docs for a list of available properties
        // https://firebase.google.com/docs/reference/js/firebase.User
        const uid = user.uid;
        reValidateUser(true)
    } else {
        reValidateUser(false)
    }
});

export async function uploadFile(name, file) {
    const taskImgRef = ref(storage, `tasks/${name}`); 

    try {
        await uploadBytes(taskImgRef, file)
        const url = await getDownloadURL(taskImgRef)
        return url
    }
    catch(error) {
        console.log("error creando imagen ->", error);
    }


    /* uploadBytes(taskImgRef, file).then(async (snapshot) => {
        console.log('Uploaded a blob or file!');
        // console.log(snapshot)

        const url = await getDownloadURL(taskImgRef)
        return url
      }).catch((error) => {
        console.log("error creando imagen ->", error);
    });;*/
      
}
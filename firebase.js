 // Import the functions you need from the SDKs you need
 import { initializeApp } from "https://www.gstatic.com/firebasejs/9.11.0/firebase-app.js";
 import { getFirestore, collection, addDoc, getDocs, onSnapshot, query, where  } from "https://www.gstatic.com/firebasejs/9.11.0/firebase-firestore.js"
 // TODO: Add SDKs for Firebase products that you want to use
 // https://firebase.google.com/docs/web/setup#available-libraries

 // Your web app's Firebase configuration
 const firebaseConfig = {
   apiKey: "AIzaSyCOj-0IHX80e8IqkreZ7jWZfBmnz8fkUuM",
   authDomain: "f-prog-web.firebaseapp.com",
   projectId: "f-prog-web",
   storageBucket: "f-prog-web.appspot.com",
   messagingSenderId: "625260296003",
   appId: "1:625260296003:web:cc66fe69928c51a24c21f6"
 };

 // Initialize Firebase
 const app = initializeApp(firebaseConfig);

 const db = getFirestore(app);


 export async function addTask(title, description){
    try {
        const docRef = await addDoc(collection(db, "tasks"), {
          title,
          description,
        });
        console.log("Document written with ID: ", docRef.id);
      } catch (e) {
        alert('Hubo un error: '+e)
        console.error("Error adding document: ", e);
      }
 }

 export async function getAllTasks(){
    const querySnapshot = await getDocs(collection(db, "tasks"));
    const mappedArray = []
    querySnapshot.forEach((doc) => {
      console.log(doc.id, " => ", doc.data());
      mappedArray.push(doc.data())
    });

    return mappedArray
 }
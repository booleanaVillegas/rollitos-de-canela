import { addTask, getAllTasks, newUser, logIn, logOut } from './firebase.js'

const button = document.getElementById('submit-button')
button.addEventListener('click', (e) => clickForm(e))

let tasks = await getAllTasks()
displayTasks()

const buttonSignIn = document.getElementById('sign-in-button')
buttonSignIn.addEventListener('click', (e) => signUp(e))

const buttonLogIn = document.getElementById('log-in-button')
buttonLogIn.addEventListener('click', (e) => logInForm(e))

const buttonLogOut = document.getElementById('log-out-button')
buttonLogOut.addEventListener('click', (e) => logOutForm(e))

function displayTasks() {
    const taskContainer = document.getElementById('tasks-container');
    taskContainer.innerHTML = '';

    tasks.forEach((task => {
        const taskElem = document.createElement('li');
        // taskElem.textContent = task.title;
        taskElem.innerHTML = `<h2>${task.title}</h2>
        ${task.url?`<img src="${task.url}" alt="">`:''}`
        taskContainer.appendChild(taskElem);
    }))
}

async function clickForm(e) {
    e.preventDefault()
    console.log('prevent event')
    const title = document.getElementById('taskTitle').value
    const description = document.getElementById('taskDescription').value
    const file = document.getElementById('taskImg').files[0]

    console.log(file)

    // create tasks
    await addTask(title, description, file.name ,file)
        // update tasks

    tasks = await getAllTasks()
    displayTasks()

}

function signUp(e) {
    e.preventDefault()
    const email = document.getElementById('email')?.value
    const pass = document.getElementById('password')?.value
    const passConfirm = document.getElementById('passwordConfirm')?.value

    if (pass === passConfirm) {
        newUser(email, pass);
    } else {
        alert('Las contraseñas no coinciden')
    }


}

function logInForm(e) {
    e.preventDefault();
    const email = document.getElementById('email-log-in')?.value
    const pass = document.getElementById('password-log-in')?.value

    logIn(email, pass)

}

function logOutForm(e) {
    e.preventDefault();
    logOut();
}
import { addTask, getAllTasks } from './firebase.js'
import productsArray from './products.json' assert {type: 'json'};

const button = document.getElementById('submit-button')
button.addEventListener('click', (e) => clickForm(e))

let tasks = await getAllTasks()
console.log(tasks)
displayTasks()
console.log(productsArray)


function displayTasks() {
    console.log('holaaaaaaa');
    const taskContainer = document.getElementById('tasks-container');
    console.log(taskContainer);

    taskContainer.innerHTML= '';

    tasks.forEach((task => {
        console.log('soy un task');
        const taskElem = document.createElement('li');
        taskElem.textContent = task.title;

        taskContainer.appendChild(taskElem);
    }))
}

async function clickForm(e) {
    e.preventDefault()
    console.log('prevent event')
    const title = document.getElementById('taskTitle').value
    const description = document.getElementById('taskDescription').value

    // create tasks
    await addTask(title, description)
    // update tasks

    tasks = await getAllTasks()
    displayTasks()

}


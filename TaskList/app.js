// Define UI Variables
const form = document.querySelector('#task-form');
const taskList = document.querySelector('.collection');
const clearBtn = document.querySelector('.clear-tasks');
const filter = document.querySelector('#filter'); // "Filter Tasks"
const taskInput = document.querySelector('#task'); // "New Task"


// Load all event listeners
loadEventListeners();

function loadEventListeners() {
    // DOM Load Event
    document.addEventListener('DOMContentLoaded', getTasksfromLocalStorage);
    // Add task event
    form.addEventListener('submit', addTask);
    // Remove task event
    taskList.addEventListener('click', removeTask)
    // Clear task event
    clearBtn.addEventListener('click', clearTasks)
    // Filter tasks event
    filter.addEventListener('keyup', filterTasks);
}

// Get tasks form local storage
function getTasksfromLocalStorage() {
    let tasks;
    if (!localStorage.getItem("tasks")) {
        tasks = [];
    } else {
        tasks = JSON.parse(localStorage.getItem("tasks"));
    }

    tasks.forEach(function(task){
      // Create li element
      const newTaskContainer = document.createElement("li");
      // Add class
      newTaskContainer.className = "collection-item"; // collection-item is specific to materialize css
      // Create textNode and append to li
      const newTaskTitle = document.createTextNode(task);
      newTaskContainer.appendChild(newTaskTitle);
      //  Create new link element
      const deleteBtn = document.createElement("a");
      // Add class
      deleteBtn.className = "delete-item secondary-content";
      // Add icon HTML
      deleteBtn.innerHTML = '<i class="fa fa-times"></i>';
      // Append the link to li
      newTaskContainer.appendChild(deleteBtn);

      // Append li to ul
      taskList.appendChild(newTaskContainer);
    });
}

function addTask(e) {
    if(taskInput.value === ''){
        alert('Add a task');
    }
    // Create list item (li) element
    const newTaskItem = document.createElement('li');
    // Add class
    newTaskItem.className = "collection-item"; // collection-item is specific to materialize css
    // Create textNode and append to li
    const newTaskTitle = document.createTextNode(taskInput.value);
    newTaskItem.appendChild(newTaskTitle);
    //  Create new link element
    const deleteBtn = document.createElement('a');
    // Add class
    deleteBtn.className = 'delete-item secondary-content';
    // Add icon HTML
    deleteBtn.innerHTML = '<i class="fa fa-times"></i>';
    // Append the link to li
    newTaskItem.appendChild(deleteBtn);
    
    // Append li to ul
    taskList.appendChild(newTaskItem);

    // Store in local storage
    storeTaskinLocalStorage(taskInput.value);
    
    // Clear input
    taskInput.value = '';
    
    e.preventDefault();
}

function storeTaskinLocalStorage(task) {
    let tasks;
    if(!localStorage.getItem('tasks')) {
        tasks = [];
    } else {
        tasks = JSON.parse(localStorage.getItem('tasks'));
    }

    tasks.push(task);

    localStorage.setItem('tasks', JSON.stringify(tasks));
}

function removeTask(e) {
    if(e.target.parentElement.classList.contains('delete-item')){
        if(confirm('Are you sure?')){
            let taskLi = e.target.parentElement.parentElement;
            taskLi.remove();

            // Remove from local storage
            removeTaskFromLocalStorage(taskLi);
        }
    }
}

function removeTaskFromLocalStorage(taskItem) {
    let tasks;
    if (!localStorage.getItem('tasks')) {
        tasks = [];
    } else {
        tasks = JSON.parse(localStorage.getItem('tasks'));
    }

    tasks.forEach(function(task, index){
        if(taskItem.textContent === task){
            tasks.splice(index, 1);
        }
    });

    localStorage.setItem('tasks', JSON.stringify(tasks));
}

function clearTasks(e) {
    while(taskList.firstChild){
        taskList.removeChild(taskList.firstChild);
    }

    // Clear from local storage
    clearTasksFromlocalStorage();
}

function clearTasksFromlocalStorage(){
    localStorage.clear();
}

function filterTasks(e) {
    const textToBeFiltered = e.target.value.toLowerCase();
    
    // queryselector returns a NodeList so we can use forEach
    // if getElementByClass was used then convert HTML collection to array first
    document.querySelectorAll('.collection-item').forEach(
        function(taskContainer){
            const taskTitle = taskContainer.firstChild.textContent;
            if(taskTitle.toLowerCase().indexOf(textToBeFiltered) != -1){
                taskContainer.style.display = 'block';
            } else {
                taskContainer.style.display = 'none';
            }
        }
    )
}
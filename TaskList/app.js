// Define UI Variables
const form = document.querySelector('#task-form');
const taskList = document.querySelector('.collection');
const clrBtn = document.querySelector('.clear-tasks');
const filter = document.querySelector('#filter'); // "Filter Tasks"
const taskInput = document.querySelector('#task'); // "New Task"


// Load all event listeners
loadEventListeners();

function loadEventListeners() {
    // Add task event
    form.addEventListener('submit', addTask);
}

function addTask(e) {
    if(taskInput.value === ''){
        alert('Add a task');
    }
    // Create li element
    const li = document.createElement('li');
    // Add class
    li.className = 'collection-item'; // collection-item is specific to materialize css
    // Create textNode and append to li
    li.appendChild(document.createTextNode(taskInput.value));
    //  Create new link element
    const link = document.createElement('a');
    // Add class
    link.className = 'delete-item secondary-content';
    // Add icon HTML
    link.innerHTML = '<i class="fa fa-times"></i>';
    // Append the link to li
    li.appendChild(link);
    
    // Append li to ul
    taskList.appendChild(li);
    
    // Clear input
    taskInput.value = '';
    
    e.preventDefault();
}
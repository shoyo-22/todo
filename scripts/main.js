const createTaskBtn = document.getElementById("create-task");
const modal = document.getElementById("modal");
const modalCloseBtn = document.getElementById("close-modal");
const saveTaskForm = document.getElementById("saveTaskForm");
const taskListContainer = document.querySelector(".task-list-container");
let isModalOpen = false;

let TASKS = [];

window.addEventListener("DOMContentLoaded", () => {
  getTasks();
  displayTasks();
});

function getTasks() {
  TASKS = localStorage.tasks ? JSON.parse(localStorage.tasks) : [];
}

function displayTasks() {
  for (const task of TASKS) {
    taskListContainer.appendChild(addTaskCard(task));
  }
}

createTaskBtn.onclick = () => {
  modal.style.display = "block";
};

modalCloseBtn.onclick = () => {
  toggleModal();
};

window.onclick = (event) => {
  if (event.target == modal) {
    toggleModal();
  }
};

const toggleModal = () => {
  const display = isModalOpen ? "block" : "none";
  modal.style.display = display;
};

saveTaskForm.onsubmit = (event) => {
  event.preventDefault();
  const formData = new FormData(event.target);
  const formProps = Object.fromEntries(formData);

  const task = new Task(formProps.title, formProps.description);
  task.saveTask();
};

// Components
const addTaskCard = (task) => {
  const taskCard = document.createElement("article");
  const title = document.createElement("h3");
  const description = document.createElement("p");

  title.textContent = task.title;
  description.textContent = task.description;
  taskCard.classList.add("task-card");
  taskCard.appendChild(title);
  taskCard.appendChild(description);

  return taskCard;
};

// Classes
class Task {
  constructor(title, description) {
    this.title = title;
    this.description = description;
    this.created = new Date().toISOString();
  }

  saveTask() {
    const newTask = {
      title: this.title,
      description: this.description,
      created: this.created,
    };

    getTasks();
    TASKS.push(newTask);
    localStorage.setItem("tasks", JSON.stringify(TASKS));
    toggleModal();
  }
}

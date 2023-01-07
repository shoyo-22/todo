const createTaskBtn = document.getElementById("create-task");
const modal = document.getElementById("modal");
const modalCloseBtn = document.getElementById("close-modal");
const saveTaskForm = document.getElementById("saveTaskForm");
let isModalOpen = false;

let TASKS = [];

window.addEventListener("DOMContentLoaded", () => {
  getTasks();
});

function getTasks() {
  TASKS = localStorage.tasks ? JSON.parse(localStorage.tasks) : [];
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

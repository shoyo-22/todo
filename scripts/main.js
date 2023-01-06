const createTaskBtn = document.getElementById("create-task");
const modal = document.getElementById("modal");
const modalCloseBtn = document.getElementById("close-modal");
let isModalOpen = false;

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

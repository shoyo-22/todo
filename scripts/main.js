const createTaskBtn = document.getElementById("create-task");

createTaskBtn.addEventListener("click", () => {
  createModal();
});

function createModal() {
  const modal = document.querySelector(".blur-layer");

  modal.classList.remove("display-none");
}

const form = document.querySelector(".input-section");
const input = document.querySelector(".input-section input");
const button = document.querySelector(".add-button");
const taskList = document.querySelector(".task-list");

// === Load existing tasks ===
window.addEventListener("DOMContentLoaded", () => {
  const storedTasks = JSON.parse(localStorage.getItem("tasks")) || [];
  storedTasks.forEach((task) => addTaskToDOM(task.text));
});

// === Add new task ===
button.addEventListener("click", function (evt) {
  evt.preventDefault();

  const inputValue = input.value.trim();
  if (!inputValue) return alert("Please enter a task.");

  const newTask = {
    text: inputValue,
  };

  addTaskToDOM(newTask.text);
  saveToLocalStorage(newTask);
  input.value = "";
});

// === Add Task to DOM ===
function addTaskToDOM(taskText) {
  const taskItem = document.createElement("div");
  taskItem.classList.add("task-item");

  const taskContent = document.createElement("div");
  taskContent.classList.add("task-content");

  const taskCheckbox = document.createElement("div");
  taskCheckbox.classList.add("task-checkbox");

  const taskTextEl = document.createElement("span");
  taskTextEl.classList.add("task-text");
  taskTextEl.textContent = taskText;

  const deleteButton = document.createElement("button");
  deleteButton.classList.add("delete-button");
  deleteButton.textContent = "✕";

  taskContent.appendChild(taskCheckbox);
  taskContent.appendChild(taskTextEl);
  taskItem.appendChild(taskContent);
  taskItem.appendChild(deleteButton);
  taskList.appendChild(taskItem);

  // delete logic
  deleteButton.addEventListener("click", () => {
    taskItem.remove();
    removeFromLocalStorage(taskText);
  });
}

// === LocalStorage Helpers ===
function saveToLocalStorage(task) {
  const oldTasks = JSON.parse(localStorage.getItem("tasks")) || [];
  oldTasks.push(task);
  localStorage.setItem("tasks", JSON.stringify(oldTasks));
}

function removeFromLocalStorage(taskText) {
  const oldTasks = JSON.parse(localStorage.getItem("tasks")) || [];
  const updated = oldTasks.filter((t) => t.text !== taskText);
  localStorage.setItem("tasks", JSON.stringify(updated));
}

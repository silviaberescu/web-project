let todo = JSON.parse(localStorage.getItem("todo")) || [];
const todoInput = document.getElementById("todoInput");
const todoList = document.getElementById("todoList");
const todoCount = document.getElementById("todoCount");
const addButton = document.querySelector(".btn");
const clearbutton = document.getElementById("clearbutton");
const Activebutton = document.getElementById("Activebutton");
const Allbutton = document.getElementById("Allbutton");
const Completedbutton = document.getElementById("Completedbutton");
let activeButtonId = "";

document.addEventListener("DOMContentLoaded", function () {
  todoInput.addEventListener("keydown", function (event) {
    if (event.key === "Enter") {
      event.preventDefault();
      addTask();
    }
  });
  clearbutton.addEventListener("click", deletecompleted);
  Activebutton.addEventListener("click", displayactive);
  Allbutton.addEventListener("click", displayTasks);
  Completedbutton.addEventListener("click", displaycheckedtasks);
  displayTasks();
});

function addTask() {
  const newTask = todoInput.value.trim();
  if (newTask !== "") {
    todo.push({ text: newTask, disabled: false });
    saveToLocalStorage();
    todoInput.value = "";
    displayTasks();
  }
}

function displayTasks() {
  todoList.innerHTML = "";
  let activeTaskCount = 0;
  todo.forEach((item, index) => {
    const p = document.createElement("p");
    p.innerHTML = `
      <div class="todo-container">
        <input type="checkbox" class="todo-checkbox" id="input-${index}" ${
      item.disabled ? "checked" : ""
    }>
        <p id="todo-${index}" class="${
      item.disabled ? "disabled" : ""
    }" onclick="editTask(${index})">${item.text}</p>
      </div>
    `;
    p.querySelector(".todo-checkbox").addEventListener("change", () =>
      toggleTask(index)
    );
    todoList.appendChild(p);
    if (!item.disabled) {
      activeTaskCount++;
    }
  });
  todoCount.textContent = activeTaskCount;
  updateClearButtonVisibility();
}

function editTask(index) {
  const todoItem = document.getElementById(`todo-${index}`);
  const existingText = todo[index].text;
  const inputElement = document.createElement("input");

  inputElement.value = existingText;
  todoItem.replaceWith(inputElement);
  inputElement.focus();

  inputElement.addEventListener("blur", function () {
    const updatedText = inputElement.value.trim();
    if (updatedText) {
      todo[index].text = updatedText;
      saveToLocalStorage();
    }
    displayTasks();
  });
}

function toggleTask(index) {
  todo[index].disabled = !todo[index].disabled;
  saveToLocalStorage();
  displayTasks();
}

function deletecompleted() {
  todo = todo.filter(task => !task.disabled);
  saveToLocalStorage();
  displayTasks();
}

function displayactive(){
  const activeTasks = todo.filter(task => !task.disabled);
  displayActiveTasks(activeTasks);
}

function displaycheckedtasks() {
  const completedTasks = todo.filter(task => task.disabled);
  displayCompletedTasks(completedTasks);
}

function saveToLocalStorage() {
  localStorage.setItem("todo", JSON.stringify(todo));
}

function toggleActiveButton() {
  const activeButton = document.getElementById("Activebutton");
  const allButton = document.getElementById("Allbutton");
  const completedButton = document.getElementById("Completedbutton");
  activeButton.classList.toggle("active");
  allButton.classList.remove("active");
  completedButton.classList.remove("active");
}

function toggleAllButton() {
  const allButton = document.getElementById("Allbutton");
  const activeButton = document.getElementById("Activebutton");
  const completedButton = document.getElementById("Completedbutton");
  allButton.classList.toggle("active");
  activeButton.classList.remove("active");
  completedButton.classList.remove("active");

}

function toggleCompletedButton() {
  const completedButton = document.getElementById("Completedbutton");
  const activeButton = document.getElementById("Activebutton");
  const allButton = document.getElementById("Allbutton");
  completedButton.classList.add("active"); 
  activeButton.classList.remove("active"); 
  allButton.classList.remove("active");
}

function displayActiveTasks(activeTasks) {
  todoList.innerHTML = "";
  activeTasks.forEach((item, index) => {
    const p = document.createElement("p");
    p.innerHTML = `
      <div class="todo-container">
        <input type="checkbox" class="todo-checkbox" id="input-${index}" ${
      item.disabled ? "checked" : ""
    }>
        <p id="todo-${index}" class="${
      item.disabled ? "disabled" : ""
    }" onclick="editTask(${index})">${item.text}</p>
      </div>
    `;
    p.querySelector(".todo-checkbox").addEventListener("change", () =>
      toggleTask(index)
    );
    todoList.appendChild(p);
  });
}

function displayCompletedTasks(completedTasks) {
  todoList.innerHTML = "";
  completedTasks.forEach((item, index) => {
    const p = document.createElement("p");
    p.innerHTML = `
      <div class="todo-container">
        <input type="checkbox" class="todo-checkbox" id="input-${index}" ${
      item.disabled ? "checked" : ""
    }>
        <p id="todo-${index}" class="${
      item.disabled ? "disabled" : ""
    }" onclick="editTask(${index})">${item.text}</p>
      </div>
    `;
    p.querySelector(".todo-checkbox").addEventListener("change", () =>
      toggleTask(index)
    );
    todoList.appendChild(p);
  });
}
function updateClearButtonVisibility() {
  const checkedTasks = todo.filter(task => task.disabled);
  if (checkedTasks.length > 0) {
    clearbutton.style.display = "inline";
  } else {
    clearbutton.style.display = "none"; 
  }
}

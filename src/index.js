/* 
  id: string,
  title: string,
  isComplete: boolean
*/
let todos = [];

// Selectors
const todoForm = document.querySelector(".todo-form");
const todoInput = document.querySelector(".todo-input");
const addTodoButton = document.querySelector(".add-todo");
const removeButton = document.querySelector(".remove-button");
const todosBox = document.querySelector(".todos-box");

// Functions
function generateId() {
  return Math.random().toString(36).replace("0.", "");
}

function initialTodos() {
  if (localStorage.getItem("todo-app") === null) return;
  const newTodos = JSON.parse(localStorage.getItem("todo-app"));
  todos = [...newTodos];
}

function renderTodos() {
  todosBox.innerHTML = "";
  todos.map((todo) => {
    const todolist = document.createElement("li");
    todolist.setAttribute("id", todo.id);

    const todoListMarkup = `
      <input type="checkbox" name="${todo.id}" id="${todo.id}" ${
      todo.isComplete ? "checked" : ""
    }>
    <label for="${todo.id}" ${
      todo.isComplete ? "style='text-decoration: line-through;'" : ""
    } >${todo.title}</label>
    <button class="remove-button" type="button">X</button>
    `;

    todolist.innerHTML = todoListMarkup;
    todosBox.appendChild(todolist);
  });
}

// Events
document.addEventListener("DOMContentLoaded", function () {
  initialTodos();
  renderTodos();
});

// Add Todo
addTodoButton.addEventListener("click", function () {
  const inputValue = todoInput.value;
  if (inputValue.value === "") return;

  const newTodo = {
    id: generateId(),
    title: String(inputValue),
    isComplete: false,
  };

  todos.push(newTodo);
  todoInput.value = "";
  localStorage.setItem("todo-app", JSON.stringify([...todos]));
  renderTodos();
});

// Remove Todo
todosBox.addEventListener("click", function (e) {
  if (e.target.classList.contains("remove-button")) {
    const todoId = e.target.closest("li").id;
    const newTodos = [...todos].filter((todo) => todo.id !== String(todoId));
    todos = newTodos;
    localStorage.setItem("todo-app", JSON.stringify([...todos]));
    renderTodos();
  }
});

// Edit Todo
todosBox.addEventListener("input", function (e) {
  const todoId = e.target.closest("li").id;
  const newTodos = [...todos].find((todo) => todo.id === String(todoId));

  newTodos.isComplete = !newTodos.isComplete;
  localStorage.setItem("todo-app", JSON.stringify([...todos]));
  renderTodos();
});

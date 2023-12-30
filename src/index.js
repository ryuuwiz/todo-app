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
    const deleteButton = document.createElement("button");
    deleteButton.classList.add("remove-button");
    deleteButton.setAttribute("type", "button");
    deleteButton.textContent = "X";
    todolist.textContent = todo.title + " ";
    todolist.setAttribute("id", todo.id);
    todolist.appendChild(deleteButton);
    todosBox.appendChild(todolist);
  });
}

// Events
document.addEventListener("DOMContentLoaded", function () {
  initialTodos();
  renderTodos();
});

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

todosBox.addEventListener("click", function (e) {
  if (e.target.classList.contains("remove-button")) {
    const todoId = e.target.closest("li").id;
    const newTodos = [...todos].filter((todo) => todo.id !== String(todoId));
    todos = newTodos;
    localStorage.setItem("todo-app", JSON.stringify([...todos]));
    renderTodos();
  }
});

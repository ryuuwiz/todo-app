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
const searchForm = document.querySelector(".search-form");
const searchInput = document.querySelector(".todo-search");
const searchButton = document.querySelector(".search-button");

// Functions
function generateId() {
  return Math.random().toString(36).replace("0.", "");
}

function renderSearch() {
  if (todos.length > 0) {
    searchForm.removeAttribute("hidden");
  } else {
    searchForm.setAttribute("hidden", "");
  }
}

function initialTodos() {
  if (localStorage.getItem("todo-app") === null) return;
  const newTodos = JSON.parse(localStorage.getItem("todo-app"));
  todos = [...newTodos];
}

function renderTodos() {
  renderSearch();
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
    <button class="remove-button" type="button"><i class="fa-solid fa-trash"></i></button>
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
  if (
    todoInput.value === "" ||
    todoInput.value === undefined ||
    todoInput.value === " "
  )
    return alert("Please fill the add todo input");
  console.log(todoInput.value);

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

// Search Todo
searchButton.addEventListener("click", function () {
  const searchValue = searchInput.value;
  if (
    searchInput.value === "" ||
    searchInput.value === undefined ||
    searchInput.value === " "
  )
    return alert("Please fill the search todo input");

  const searchTodo = [...todos].find(
    (todo) => todo.title === String(searchValue)
  );
  searchInput.value = "";
  todos = [];
  todos.push(searchTodo);

  renderTodos();
});

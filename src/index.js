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
const todosBox = document.querySelector(".todos-box");

// Functions
function generateId() {
  return Math.random().toString(36).replace("0.", "");
}

function renderTodos() {
  todosBox.innerHTML = "";
  todos.map((todo) => {
    const todolist = document.createElement("li");
    todolist.textContent = todo.title;
    todosBox.appendChild(todolist);
  });
}

// Events
document.addEventListener("DOMContentLoaded", function () {
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
  renderTodos();
});

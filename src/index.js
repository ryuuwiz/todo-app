// Data
let todos = [
  {
    id: generateId(),
    title: "lorem ipsum 1",
    isComplete: false,
  },
  {
    id: generateId(),
    title: "lorem ipsum 2",
    isComplete: false,
  },
  {
    id: generateId(),
    title: "lorem ipsum 3",
    isComplete: false,
  },
];

// Selectors
const todosBox = document.querySelector(".todos-box");

// Functions
function generateId() {
  return Math.random().toString(36).replace("0.", "");
}

function renderTodos() {
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

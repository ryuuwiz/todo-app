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

function generateId() {
  return Math.random().toString(36).replace("0.", "");
}

const todosBox = document.querySelector(".todos-box");

document.addEventListener("DOMContentLoaded", function () {
  todos.map((todo) => {
    const todolist = document.createElement("li");
    todolist.textContent = todo.title;
    todosBox.appendChild(todolist);
  });
});

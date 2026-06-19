const todoInput = document.getElementById("todoInput");
const addButton = document.getElementById("addButton");
const todoList = document.getElementById("todoList");
const activeCount = document.getElementById("activeCount");
const completedCount = document.getElementById("completedCount");

let todos = JSON.parse(localStorage.getItem("myTodos")) || [];

function saveTodos() {
  localStorage.setItem("myTodos", JSON.stringify(todos));
}

function renderTodos() {
  todoList.innerHTML = "";

  todos.forEach((todo, index) => {
    const li = document.createElement("li");
    li.className = "todo-item";

    if (todo.completed) {
      li.classList.add("completed");
    }

    const leftDiv = document.createElement("div");
    leftDiv.className = "todo-left";

    const checkbox = document.createElement("input");
    checkbox.type = "checkbox";
    checkbox.checked = todo.completed;

    checkbox.addEventListener("change", () => {
      todos[index].completed = checkbox.checked;
      saveTodos();
      renderTodos();
    });

    const span = document.createElement("span");
    span.className = "todo-text";
    span.textContent = todo.text;

    leftDiv.appendChild(checkbox);
    leftDiv.appendChild(span);

    const deleteButton = document.createElement("button");
    deleteButton.className = "delete-button";
    deleteButton.textContent = "削除";

    deleteButton.addEventListener("click", () => {
      todos.splice(index, 1);
      saveTodos();
      renderTodos();
    });

    li.appendChild(leftDiv);
    li.appendChild(deleteButton);
    todoList.appendChild(li);
  });

  updateCount();
}

function updateCount() {
  const activeTodos = todos.filter(todo => !todo.completed);
  const completedTodos = todos.filter(todo => todo.completed);

  activeCount.textContent = activeTodos.length;
  completedCount.textContent = completedTodos.length;
}

function addTodo() {
  const text = todoInput.value.trim();

  if (text === "") {
    alert("やることを入力してください");
    return;
  }

  todos.push({
    text: text,
    completed: false
  });

  todoInput.value = "";
  saveTodos();
  renderTodos();
}

addButton.addEventListener("click", addTodo);

todoInput.addEventListener("keydown", event => {
  if (event.key === "Enter") {
    addTodo();
  }
});

renderTodos();

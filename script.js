const taskForm = document.getElementById("taskForm");
const taskInput = document.getElementById("taskInput");
const taskList = document.getElementById("taskList");
const taskCount = document.getElementById("taskCount");

const filterAll = document.getElementById("filterAll");
const filterActive = document.getElementById("filterActive");
const filterCompleted = document.getElementById("filterCompleted");
const clearCompleted = document.getElementById("clearCompleted");

let tasks = [];
let currentFilter = "all"; // all | active | completed

function setActiveFilterButton() {
  [filterAll, filterActive, filterCompleted].forEach(btn => btn.classList.remove("active"));
  if (currentFilter === "all") filterAll.classList.add("active");
  if (currentFilter === "active") filterActive.classList.add("active");
  if (currentFilter === "completed") filterCompleted.classList.add("active");
}

function filteredTasks() {
  if (currentFilter === "active") return tasks.filter(t => !t.completed);
  if (currentFilter === "completed") return tasks.filter(t => t.completed);
  return tasks;
}

function updateCount() {
  const total = tasks.length;
  const completed = tasks.filter(t => t.completed).length;
  taskCount.textContent = `Total: ${total} | Completed: ${completed}`;
}

function render() {
  setActiveFilterButton();
  taskList.innerHTML = "";

  filteredTasks().forEach(task => {
    const li = document.createElement("li");
    if (task.completed) li.classList.add("completed");

    const checkbox = document.createElement("input");
    checkbox.type = "checkbox";
    checkbox.checked = task.completed;
    checkbox.addEventListener("change", () => {
      task.completed = checkbox.checked;
      render();
    });

    const title = document.createElement("span");
    title.className = "title";
    title.textContent = task.title;

    const editBtn = document.createElement("button");
    editBtn.textContent = "Edit";
    editBtn.addEventListener("click", () => {
      const newTitle = prompt("Edit task:", task.title);
      if (newTitle && newTitle.trim().length > 0) {
        task.title = newTitle.trim();
        render();
      }
    });

    const deleteBtn = document.createElement("button");
    deleteBtn.textContent = "Delete";
    deleteBtn.addEventListener("click", () => {
      tasks = tasks.filter(t => t.id !== task.id);
      render();
    });

    li.appendChild(checkbox);
    li.appendChild(title);
    li.appendChild(editBtn);
    li.appendChild(deleteBtn);

    taskList.appendChild(li);
  });

  updateCount();
}

taskForm.addEventListener("submit", (e) => {
  e.preventDefault();
  const title = taskInput.value.trim();
  if (!title) return;

  tasks.unshift({
    id: Date.now(),
    title,
    completed: false
  });

  taskInput.value = "";
  render();
});

// Filters
filterAll.addEventListener("click", () => {
  currentFilter = "all";
  render();
});
filterActive.addEventListener("click", () => {
  currentFilter = "active";
  render();
});
filterCompleted.addEventListener("click", () => {
  currentFilter = "completed";
  render();
});
clearCompleted.addEventListener("click", () => {
  tasks = tasks.filter(t => !t.completed);
  render();
});

// initial render
render();

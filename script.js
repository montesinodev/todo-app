const taskInput = document.getElementById("task-input");
const addTaskBtn = document.getElementById("add-task");
const taskList = document.getElementById("task-list");
const filters = document.querySelectorAll(".filter");
const themeToggle = document.getElementById("theme-toggle");

// Load tasks from localStorage
let tasks = JSON.parse(localStorage.getItem("tasks")) || [];
let currentFilter = "all";

// Add task
function addTask() {
  const taskText = taskInput.value.trim();
  if (!taskText) return;

  const task = { text: taskText, completed: false };
  tasks.push(task);
  saveTasks();
  renderTasks();
  taskInput.value = "";
}
addTaskBtn.addEventListener("click", addTask);
taskInput.addEventListener("keypress", e => {
  if (e.key === "Enter") addTask();
});

// Render tasks
function renderTasks() {
  taskList.innerHTML = "";
  tasks
    .filter(task => {
      if (currentFilter === "active") return !task.completed;
      if (currentFilter === "completed") return task.completed;
      return true;
    })
    .forEach((task, index) => {
      const li = document.createElement("li");
      li.className = `task ${task.completed ? "completed" : ""}`;
      li.innerHTML = `
        <span>${task.text}</span>
        <div class="task-buttons">
          <button onclick="toggleTask(${index})">✅</button>
          <button onclick="deleteTask(${index})">🗑️</button>
        </div>
      `;
      taskList.appendChild(li);
    });
}

// Toggle task completion
function toggleTask(index) {
  tasks[index].completed = !tasks[index].completed;
  saveTasks();
  renderTasks();
}

// Delete task
function deleteTask(index) {
  tasks.splice(index, 1);
  saveTasks();
  renderTasks();
}

// Save tasks
function saveTasks() {
  localStorage.setItem("tasks", JSON.stringify(tasks));
}

// Filters
filters.forEach(btn =>
  btn.addEventListener("click", () => {
    filters.forEach(b => b.classList.remove("active"));
    btn.classList.add("active");
    currentFilter = btn.dataset.filter;
    renderTasks();
  })
);

// Dark mode
themeToggle.addEventListener("click", () => {
  document.body.classList.toggle("dark");
  themeToggle.textContent =
    document.body.classList.contains("dark") ? "☀️" : "🌙";
});

// Initial render
renderTasks();

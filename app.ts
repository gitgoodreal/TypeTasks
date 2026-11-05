import {
  advanceTask,
  addTask,
  filterByStatus,
  type Task,
  type TaskStatus,
} from "./model.js";

type TaskFilter = TaskStatus | "all";

const taskForm = document.getElementById("task-form") as HTMLFormElement;
const titleInput = document.getElementById("task-title") as HTMLInputElement;
const taskList = document.getElementById("task-list") as HTMLUListElement;
const taskCount = document.getElementById("task-count") as HTMLSpanElement;
const remainingCount = document.getElementById(
  "remaining-count"
) as HTMLSpanElement;
const filterButtons = document.querySelectorAll<HTMLButtonElement>(
  ".filter-button"
);

let tasks: Task[] = [];
let activeFilter: TaskFilter = "all";

function isTaskStatus(value: string | undefined): value is TaskStatus {
  return (
    value === "todo" || value === "in-progress" || value === "done"
  );
}

function renderTasks(): void {
  const visibleTasks =
    activeFilter === "all"
      ? tasks
      : filterByStatus(tasks, activeFilter);

  taskList.replaceChildren();

  if (visibleTasks.length === 0) {
    const emptyItem = document.createElement("li");
    emptyItem.className = "empty-state";

    const sparkle = document.createElement("span");
    sparkle.setAttribute("aria-hidden", "true");
    sparkle.textContent = "✳";

    const message = document.createElement("p");
    message.textContent =
      tasks.length === 0
        ? "Your list is clear. Add a task to get started."
        : "No tasks in this view just yet.";

    emptyItem.append(sparkle, message);
    taskList.append(emptyItem);
  }

  for (const task of visibleTasks) {
    const item = document.createElement("li");
    item.className = `task-item${task.status === "done" ? " is-done" : ""}`;

    const title = document.createElement("span");
    title.className = "task-title";
    title.textContent = task.title;

    const badge = document.createElement("span");
    badge.className = "status-badge";
    badge.dataset.status = task.status;
    badge.textContent =
      task.status === "in-progress"
        ? "In progress"
        : task.status === "todo"
          ? "To do"
          : "Done";

    const action = document.createElement("button");
    action.className = "task-action";
    action.type = "button";
    action.textContent =
      task.status === "todo"
        ? "Start task"
        : task.status === "in-progress"
          ? "Mark done"
          : "Completed";
    action.disabled = task.status === "done";
    action.setAttribute(
      "aria-label",
      task.status === "todo"
        ? `Start ${task.title}`
        : task.status === "in-progress"
          ? `Complete ${task.title}`
          : `${task.title} completed`
    );
    action.addEventListener("click", () => {
      tasks = advanceTask(tasks, task.id);
      renderTasks();
    });

    item.append(title, badge, action);
    taskList.append(item);
  }

  const taskWord = tasks.length === 1 ? "task" : "tasks";
  taskCount.textContent = `${tasks.length} ${taskWord}`;
  remainingCount.textContent = String(
    tasks.filter((task) => task.status !== "done").length
  );

  for (const button of filterButtons) {
    const selected = button.dataset.status === activeFilter;
    button.classList.toggle("is-active", selected);
    button.setAttribute("aria-pressed", String(selected));
  }
}

taskForm.addEventListener("submit", (event: SubmitEvent) => {
  event.preventDefault();
  const title = titleInput.value.trim();

  if (title.length === 0) {
    titleInput.focus();
    return;
  }

  tasks = addTask(tasks, title);
  taskForm.reset();
  titleInput.focus();
  renderTasks();
});

for (const button of filterButtons) {
  button.addEventListener("click", () => {
    const status = button.dataset.status;
    if (status === "all" || isTaskStatus(status)) {
      activeFilter = status;
      renderTasks();
    }
  });
}

renderTasks();

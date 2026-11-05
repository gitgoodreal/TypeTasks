export function addTask(tasks, title) {
    const nextId = tasks.length === 0
        ? 1
        : Math.max(...tasks.map((task) => task.id)) + 1;
    const newTask = {
        id: nextId,
        title,
        status: "todo",
    };
    return [...tasks, newTask];
}
export function completeTask(tasks, id) {
    return tasks.map((task) => task.id === id ? { ...task, status: "done" } : task);
}
export function advanceTask(tasks, id) {
    return tasks.map((task) => {
        if (task.id !== id || task.status === "done") {
            return task;
        }
        return {
            ...task,
            status: task.status === "todo" ? "in-progress" : "done",
        };
    });
}
export function filterByStatus(tasks, status) {
    return tasks.filter((task) => task.status === status);
}
export function deleteTask(tasks, id) {
    return tasks.filter((task) => task.id !== id);
}

"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.renderTasks = void 0;
var renderTasks = function (tasks, tasksContainerElement) {
    tasksContainerElement.innerHTML = "";
    tasks.forEach(function (task, index) {
        var taskEl = document.createElement("li");
        if (task.category) {
            taskEl.classList.add(task.category);
        }
        var id = "task-".concat(index);
        var labelEl = document.createElement("label");
        labelEl.setAttribute("for", id);
        labelEl.innerText = task.name;
        var inputEl = document.createElement("input");
        inputEl.id = id;
        inputEl.type = "checkbox";
        inputEl.name = task.name;
        inputEl.checked = task.done;
        inputEl.addEventListener("change", function () {
            task.done = !task.done;
            console.log("object");
        });
        taskEl.appendChild(labelEl);
        taskEl.appendChild(inputEl);
        tasksContainerElement.appendChild(taskEl);
    });
};
exports.renderTasks = renderTasks;

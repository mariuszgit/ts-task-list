import { Task } from "../types/types";

export const renderTasks = (tasks: Task[], tasksContainerElement: HTMLElement) => {
    tasksContainerElement.innerHTML = "";
    tasks.forEach((task: Task, index: number) => {
      const taskEl: HTMLElement = document.createElement("li");
      if (task.category) {
        taskEl.classList.add(task.category);
      }
      const id: string = `task-${index}`;
  
      const labelEl: HTMLLabelElement = document.createElement("label");
      labelEl.setAttribute("for", id);
      labelEl.innerText = task.name;
  
      const inputEl: HTMLInputElement = document.createElement("input");
      inputEl.id = id;
      inputEl.type = "checkbox";
      inputEl.name = task.name;
      inputEl.checked = task.done;
      inputEl.addEventListener("change", () => {
        task.done = !task.done;
        console.log("object");
      });
  
      taskEl.appendChild(labelEl);
      taskEl.appendChild(inputEl);
      tasksContainerElement.appendChild(taskEl);
    });
  };
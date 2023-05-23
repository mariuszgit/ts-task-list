'use strict'

// const input2: HTMLInputElement = document.querySelector('#input2') as HTMLInputElement;
// const input1: HTMLInputElement = document.querySelector('#input1');
// const button = document.querySelector('button');
// console.log(button);

// function add(a: number, b: number): number {return a + b};

// button!.addEventListener('click', () => {
//   const sum = add(Number(input1.value), Number(input2.value));
//   console.log(sum)
// });

// _----------------------------------------------------------------------------------------------------

// const button = document.querySelector('button');

// function calculatePrice(price: number, hasDiscount: boolean) {
//   return (hasDiscount) ? price * 0.8 : price;
// }

// button?.addEventListener('click', (event) => {
//   event.preventDefault();
//   const price: number = 50;
//   const hasDiscount: boolean = new URLSearchParams(window.location.search).get("discount") === "true";
//   console.log(hasDiscount);
//   console.log(calculatePrice(price, hasDiscount));
// })

/* <li>
    <label for="task-1">Wyrzucić śmieci</label>
    <input type="checkbox" id="task-1" name="Wyrzucić śmieci" />
</li> */

const taskNameInputElement: HTMLInputElement = document.querySelector('#name')!;
const addButtonElement: HTMLButtonElement = document.querySelector('button')!;
const tasksContainerElement: HTMLElement = document.querySelector('ul.tasks')!;
const categoriesContainerElement: HTMLElement = document.querySelector('.categories')!;



const tasks: Task[] = [{name: 'Wyrzucić śmieci',  done: true}, {name: 'Nakarmić kota',  done: false, category: 'general'}];
const categories: Category[] = ['general', 'work', 'hobby'];
let selectedCategory: Category;

type Category = 'general' | 'work' | 'hobby';

interface Task {
    name: string;
    done: boolean;
    category?: Category;
  };

const renderTasks = () => {
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
  })
};

const renderCategories = () => {
  // <li>
  //     <input type="radio" name="category" id="category-hobby" value="hobby">
  //     <label for="category-hobby">hobby</label>
  // </li>
  categories.forEach(category => {
    const categoryEl: HTMLElement = document.createElement('li');
    const id = `category-${category}`;

    const inputEl: HTMLInputElement = document.createElement('input');
    inputEl.type = 'radio';
    inputEl.name = 'category';
    inputEl.id = id;
    inputEl.value = category;
    inputEl.addEventListener('change', () => {
      selectedCategory = category;
    })

    const labelEl: HTMLLabelElement = document.createElement('label');
    labelEl.setAttribute('for', id);
    labelEl.innerText = category;

    categoryEl.appendChild(inputEl);
    categoryEl.appendChild(labelEl)
    categoriesContainerElement.appendChild(categoryEl);
  })
};

renderCategories();

const addTask = (task: Task) => {
  tasks.push(task);
};

addButtonElement.addEventListener("click", (ev) => {
  ev.preventDefault();
  const newTask = {
    name: taskNameInputElement.value,
    done: false,
    category: selectedCategory
  };
  addTask(newTask);
  renderTasks();
  taskNameInputElement.value = '';
});

renderTasks();
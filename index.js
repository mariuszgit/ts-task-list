'use strict';
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
var taskNameInputElement = document.querySelector('#name');
var addButtonElement = document.querySelector('button');
var tasksContainerElement = document.querySelector('ul.tasks');
var categoriesContainerElement = document.querySelector('.categories');
var tasks = [{ name: 'Wyrzucić śmieci', done: true }, { name: 'Nakarmić kota', done: false, category: 'general' }];
var categories = ['general', 'work', 'hobby'];
var selectedCategory;
;
var renderTasks = function () {
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
var renderCategories = function () {
    // <li>
    //     <input type="radio" name="category" id="category-hobby" value="hobby">
    //     <label for="category-hobby">hobby</label>
    // </li>
    categories.forEach(function (category) {
        var categoryEl = document.createElement('li');
        var id = "category-".concat(category);
        var inputEl = document.createElement('input');
        inputEl.type = 'radio';
        inputEl.name = 'category';
        inputEl.id = id;
        inputEl.value = category;
        inputEl.addEventListener('change', function () {
            selectedCategory = category;
        });
        var labelEl = document.createElement('label');
        labelEl.setAttribute('for', id);
        labelEl.innerText = category;
        categoryEl.appendChild(inputEl);
        categoryEl.appendChild(labelEl);
        categoriesContainerElement.appendChild(categoryEl);
    });
};
renderCategories();
var addTask = function (task) {
    tasks.push(task);
};
addButtonElement.addEventListener("click", function (ev) {
    ev.preventDefault();
    var newTask = {
        name: taskNameInputElement.value,
        done: false,
        category: selectedCategory
    };
    addTask(newTask);
    renderTasks();
    taskNameInputElement.value = '';
});
renderTasks();

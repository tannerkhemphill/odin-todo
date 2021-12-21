import MenuIcon from './assets/bars-solid.svg';
import AddIcon from './assets/plus-solid.svg';
import { format } from 'date-fns';

export function generateHeader() {
    const header = document.createElement('div');
    header.id = 'header';
    const menu = document.createElement('div');
    menu.id = 'menu';
    let icon1 = new Image();
    icon1.src = MenuIcon;
    icon1.id = 'menu-icon';
    menu.appendChild(icon1);
    const title = document.createElement('div');
    title.id = 'title';
    const plus = document.createElement('div');
    plus.id = 'plus';
    let icon2 = new Image();
    icon2.src = AddIcon;
    plus.appendChild(icon2);
    header.appendChild(menu);
    header.appendChild(title);
    header.appendChild(plus);

    return header;
}

export function generateBackground() {
    const background = document.createElement('div');
    background.id = 'background';

    return background;
}

export function generateTodoList(project) {
    let list = project.getSortedTodoList();
    let todoList = document.createElement('div');
    todoList.classList.add('todo-list');
    for (let i = 0; i < list.length; i++) {
        let todoItem = list[i];
        let collapsibleContainer = document.createElement('div');
        collapsibleContainer.classList.add('collapsible-container');
        let todoContainer = document.createElement('div');
        todoContainer.dataset.index = i;
        todoContainer.classList.add('todo-container');
        let priorityBox = document.createElement('div');
        priorityBox.classList.add('priority-box');
        priorityBox.style.backgroundColor = todoItem.priority;
        let titleBox = document.createElement('div');
        titleBox.classList.add('title-box');
        titleBox.textContent = todoItem.title;
        let dateBox = document.createElement('div');
        dateBox.classList.add('date-box');
        dateBox.textContent = todoItem.dueDate;
        let delButton = document.createElement('button');
        delButton.classList.add('delete-todo-button');
        delButton.innerHTML = 'X';
        let expand = document.createElement('div');
        expand.classList.add('expand');
        let title = document.createElement('p');
        title.classList.add('expand-title');
        title.textContent = todoItem.title;
        let description = document.createElement('p');
        description.classList.add('expand-description');
        description.textContent = todoItem.description;
        expand.appendChild(title);
        expand.appendChild(description);
        todoContainer.appendChild(priorityBox);
        todoContainer.appendChild(titleBox);
        todoContainer.appendChild(dateBox);
        todoContainer.appendChild(delButton);
        collapsibleContainer.appendChild(todoContainer);
        collapsibleContainer.appendChild(expand);
        todoList.appendChild(collapsibleContainer);
    }

    return todoList;
}

export function generateProjects(projectList) {
    let list = projectList.projectList;
    let projects = document.createElement('div');
    projects.classList.add('project-list');
    let addProject = document.createElement('div');
    addProject.id = 'add-project';
    addProject.textContent = 'Add Project';
    projects.appendChild(addProject);
    for (let i = 0; i < list.length; i++) {
        let project = list[i];
        let projectContainer = document.createElement('div');
        projectContainer.dataset.index = i;
        projectContainer.classList.add('project-container');
        let nameBox = document.createElement('div');
        nameBox.classList.add('name-box');
        nameBox.textContent = project.name;
        let delButton = document.createElement('button');
        delButton.classList.add('delete-project-button');
        delButton.innerHTML = 'X';
        projectContainer.appendChild(delButton);
        projectContainer.appendChild(nameBox);
        projects.appendChild(projectContainer);
    }

    return projects;
}

export function generateAddProjectForm(){
    let container = document.createElement('div');
    container.id = 'add-project-container';

    let form = document.createElement('form');
    form.id = 'add-project-form';
    
    let input = document.createElement('input');
    input.type = 'text';
    input.name = 'project';
    input.id = 'project-input';
    input.placeholder = 'Project Name';
    input.maxLength = 20;
    input.required = true;

    let submit = document.createElement('input');
    submit.type = 'submit';
    submit.value = 'CREATE';
    submit.id = 'project-submit';

    form.appendChild(input);
    form.appendChild(submit);

    container.appendChild(form);

    return container;
}

export function generateAddTodoForm() {
    let container = document.createElement('div');
    container.id = 'add-todo-container';

    let form = document.createElement('form');
    form.id = 'add-todo-form';

    let titleInput = document.createElement('input');
    titleInput.id = 'title-input';
    titleInput.type = 'text';
    titleInput.name = 'title';
    titleInput.placeholder = 'Title';
    titleInput.maxLength = 20;
    titleInput.required = true;

    let descInput = document.createElement('textarea');
    descInput.id = 'description-input';
    descInput.name = 'description';
    descInput.placeholder = 'Description';
    descInput.maxLength = 100;
    descInput.required = true;

    let today = new Date();
    let year = today.getFullYear();
    let month = today.getMonth();
    let day = today.getDate();
    let hours = today.getHours();
    let minutes = today.getMinutes();

    let dateInput = document.createElement('input');
    dateInput.id = 'date-input';
    dateInput.type = 'text';
    dateInput.name = 'date';
    dateInput.defaultValue = format(new Date(year, month, day, hours, minutes), 'MM/dd/yyyy hh:mm aa');
    dateInput.maxLength = 20;
    dateInput.required = true;

    let priorityInput = document.createElement('input');
    priorityInput.id = 'priority-input';
    priorityInput.type = 'text';
    priorityInput.name = 'priority';
    priorityInput.placeholder = '1-3 (Highest-Lowest)';
    priorityInput.maxLength = 1;
    priorityInput.required = true;

    let submit = document.createElement('input');
    submit.type = 'submit';
    submit.value = 'CREATE';
    submit.id = 'todo-submit';

    form.appendChild(titleInput);
    form.appendChild(descInput);
    form.appendChild(dateInput);
    form.appendChild(priorityInput);
    form.appendChild(submit);

    container.appendChild(form);

    return container;
}

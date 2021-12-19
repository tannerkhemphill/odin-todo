import MenuIcon from './assets/bars-solid.svg';
import AddIcon from './assets/plus-solid.svg';
import { format } from 'date-fns';
import {Todo, Project} from './todo.js';

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
    const add = document.createElement('div');
    add.id = 'add';
    let icon2 = new Image();
    icon2.src = AddIcon;
    add.appendChild(icon2);
    header.appendChild(menu);
    header.appendChild(title);
    header.appendChild(add);

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
        todoContainer.classList.add('todo-container');
        let priorityBox = document.createElement('div');
        priorityBox.classList.add('priority-box');
        priorityBox.style.backgroundColor = todoItem.priority;
        let titleBox = document.createElement('div');
        titleBox.classList.add('title-box');
        titleBox.textContent = todoItem.title;
        let dateBox = document.createElement('div');
        dateBox.classList.add('date-box');
        dateBox.textContent = format(todoItem.dueDate, 'MM/dd/yyyy hh:mm aa');
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
        projectContainer.appendChild(nameBox);
        projects.appendChild(projectContainer);
    }

    return projects;
}

export function generateAddProjectForm(){
    let modal = document.createElement('div');
    modal.id = 'add-project-container';

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

    modal.appendChild(form);

    return modal;
}

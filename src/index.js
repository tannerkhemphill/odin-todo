import './style.css';
import { Todo, Project, ProjectList } from './todo.js';
import { generateHeader, generateBackground, generateTodoList, generateProjects, generateAddProjectForm, generateAddTodoForm } from './dom.js';

/*let projectList = new ProjectList();
let project0 = new Project('Default Project');
projectList.addProject(project0);

let selectedProject = projectList.projectList[0];

let todo1 = new Todo('Dentist Appointment', 'Teeth cleaning', '01/14/2022 02:00 PM', 'red', false);
let todo2 = new Todo('Gym', 'Workout', '01/13/2022 06:30 PM', 'green', true);
let todo3 = new Todo('Cook Dinner', 'Cook dinner after work', '01/14/2022 05:30 PM', 'yellow', false);

let project1 = new Project('My Project');
project1.addTodo(todo1);
project1.addTodo(todo2);
project1.addTodo(todo3);

projectList.addProject(project1);

localStorage.clear();
localStorage.setItem(project1.name, JSON.stringify(project1.todoList));

let project = JSON.parse(localStorage.getItem(project1.name) || '[]');
let todo = project[0];
console.log(todo._title); */

// localStorage.clear();

let projectList = new ProjectList();

if (localStorage.length > 0) {
    for (let i = 0; i < localStorage.length; i++) {
        let name = localStorage.key(i);
        let project = new Project(name);
        let todos = JSON.parse(localStorage.getItem(name));
        for (let j = 0; j < todos.length; j++) {
            let title = todos[j]._title;
            let desc = todos[j]._description;
            let date = todos[j]._dueDate;
            let prio = todos[j]._priority;
            let complete = todos[j]._isComplete;
            project.addTodo(new Todo(title, desc, date, prio, complete));
        }
        projectList.addProject(project);
    }
}
else {
    projectList.addProject(new Project('Default Project'));
}

let selectedProject = projectList.projectList[0];


const content = document.getElementById('content');

const header = generateHeader();
const title = header.childNodes[1];
title.textContent = selectedProject.name;
content.appendChild(header);

const background = generateBackground();
content.appendChild(background);

let todoList = generateTodoList(selectedProject);
background.appendChild(todoList);
generateTodoButtons();
generateDeleteTodoButtons();

let menu = document.getElementById('menu');
menu.addEventListener('click', function() {
    if (background.firstChild) {
        background.removeChild(background.firstChild);
        let projects = generateProjects(projectList);
        title.textContent = 'Project List';
        background.appendChild(projects);
        generateAddProjectButton();
        generateProjectButtons();
        generateDeleteProjectButtons()
    }
})

let plus = document.getElementById('plus');
plus.addEventListener('click', function() {
    if (background.firstChild) {
        background.removeChild(background.firstChild);
        let form = generateAddTodoForm();
        title.textContent = 'Create Todo';
        background.appendChild(form);
        generateCreateTodoButton();
    }
})

function generateAddProjectButton() {
    let add = document.getElementById('add-project');
    add.addEventListener('click', function() {
        if (background.firstChild) {
            background.removeChild(background.firstChild);
            let form = generateAddProjectForm();
            title.textContent = 'Create Project';
            background.appendChild(form);
            generateCreateProjectButton();
        }
    })
}

function generateCreateProjectButton() {
    let form = document.getElementById('add-project-form');
    form.addEventListener('submit', (event) => {
        event.preventDefault();
        title.textContent = 'Project List';
        let name = form.elements['project'].value;
        let newProject = new Project(name);
        projectList.addProject(newProject);
        localStorage.setItem(newProject.name, JSON.stringify(newProject.todoList));
        if (background.firstChild) {
            background.removeChild(background.firstChild);
            let projects = generateProjects(projectList);
            background.appendChild(projects);
            generateAddProjectButton();
            generateProjectButtons();
            generateDeleteProjectButtons();
        }
    })
}

function generateCreateTodoButton() {
    let form = document.getElementById('add-todo-form');
    form.addEventListener('submit', (event) => {
        event.preventDefault();
        let name = form.elements['title'].value;
        let desc = form.elements['description'].value;
        let date = form.elements['date'].value;
        let priority = form.elements['priority'].value;
        if (priority === '1') {
            priority = 'red';
        }
        else if (priority === '2') {
            priority = 'yellow';
        }
        else {
            priority = 'green';
        }
        selectedProject.addTodo(new Todo(name, desc, date, priority, false));
        localStorage.setItem(selectedProject.name, JSON.stringify(selectedProject.todoList));
        if (background.firstChild) {
            background.removeChild(background.firstChild);
            let todo = generateTodoList(selectedProject);
            background.appendChild(todo);
            generateTodoButtons();
            generateDeleteTodoButtons();
            title.textContent = selectedProject.name;
        }
    })
}

function generateProjectButtons() {
    let projects = document.getElementsByClassName('project-container');
    for (let i = 0; i < projects.length; i++) {
        projects[i].addEventListener("click", function() {
        if (background.firstChild) {
            background.removeChild(background.firstChild);
            selectedProject = projectList.projectList[parseInt(this.dataset.index)];
            let todo = generateTodoList(selectedProject);
            background.appendChild(todo);
            generateTodoButtons();
            generateDeleteTodoButtons();
            title.textContent = selectedProject.name;
            }
        })
    }
}

function generateDeleteProjectButtons() {
    let buttons = document.getElementsByClassName('delete-project-button');
    for (let i = 0; i < buttons.length; i++) {
        buttons[i].addEventListener("click", function(event) {
            event.stopPropagation();
            let projectElement = event.target.parentElement;
            selectedProject = projectList.projectList[parseInt(projectElement.dataset.index)];
            if (selectedProject.name !== 'Default Project') {
                projectList.removeProject(selectedProject);
                localStorage.removeItem(selectedProject.name);
            }
            if (background.firstChild) {
                background.removeChild(background.firstChild);
                let projects = generateProjects(projectList);
                background.appendChild(projects);
                generateAddProjectButton();
                generateProjectButtons();
            }
        })
    }
}

function generateTodoButtons() {
    let collapsibles = document.getElementsByClassName('todo-container');
    for (let i = 0; i < collapsibles.length; i++) {
        collapsibles[i].addEventListener("click", function() {
            this.classList.toggle("active");
            let expand = this.nextElementSibling;
            if (expand) {
                if (expand.style.maxHeight){
                    expand.style.maxHeight = null;
                } else {
                    expand.style.maxHeight = expand.scrollHeight + "px";
                } 
            }
        })
    }
}

function generateDeleteTodoButtons() {
    let buttons = document.getElementsByClassName('delete-todo-button');
    for (let i = 0; i < buttons.length; i++) {
        buttons[i].addEventListener('click', function(event) {
            event.stopPropagation();
            let todoElement = event.target.parentElement;
            let selectedTodo = selectedProject.todoList[parseInt(todoElement.dataset.index)];
            selectedProject.removeTodo(selectedTodo);
            localStorage.setItem(selectedProject.name, JSON.stringify(selectedProject.todoList));
            if (background.firstChild) {
                background.removeChild(background.firstChild);
                let todo = generateTodoList(selectedProject);
                background.appendChild(todo);
                generateTodoButtons();
                generateDeleteTodoButtons();
            }
        })
    }
}

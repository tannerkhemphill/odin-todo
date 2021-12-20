import './style.css';
import { Todo, Project, ProjectList } from './todo.js';
import { generateHeader, generateBackground, generateTodoList, generateProjects, generateAddProjectForm, generateAddTodoForm } from './dom.js';

let todo1 = new Todo('Dentist Appointment', 'Teeth cleaning', new Date(2021, 0, 14, 14), 'red', false);
let todo2 = new Todo('Gym', 'Workout', new Date(2021, 0, 13, 18, 30), 'green', true);
let todo3 = new Todo('Cook Dinner', 'Cook dinner after work', new Date(2021, 0, 13, 17, 30), 'yellow', false);

let project1 = new Project('My Project');
project1.addTodo(todo1);
project1.addTodo(todo2);
project1.addTodo(todo3);

let projectList = new ProjectList();
projectList.addProject(project1);

const content = document.getElementById('content');

const header = generateHeader();
const title = header.childNodes[1];
title.textContent = projectList.projectList[0].name;
content.appendChild(header);

const background = generateBackground();
content.appendChild(background);

let selectedProject = projectList.projectList[0];

let todoList = generateTodoList(selectedProject);
background.appendChild(todoList);

let menu = document.getElementById('menu');
menu.addEventListener('click', function() {
    if (background.firstChild) {
        background.removeChild(background.firstChild);
        let projects = generateProjects(projectList);
        title.textContent = 'Project List';
        background.appendChild(projects);
        generateAddProjectButton();
        generateProjectButtons();
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
        projectList.addProject(new Project(name));
        if (background.firstChild) {
            background.removeChild(background.firstChild);
            let projects = generateProjects(projectList);
            background.appendChild(projects);
            generateAddProjectButton();
            generateProjectButtons();
        }
    });
}

function generateCreateTodoButton() {
    let form = document.getElementById('add-todo-form');
    form.addEventListener('submit', (event) => {
        event.preventDefault();
        let name = form.elements['title'].value;
        let desc = form.elements['description'].value;
        let dateTime = form.elements['date'].value;
        let date = parseDate(dateTime);
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
        if (background.firstChild) {
            background.removeChild(background.firstChild);
            let todo = generateTodoList(selectedProject);
            background.appendChild(todo);
            generateTodoButtons();
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
            selectedProject = projectList.projectList[parseInt(this.dataset.index)]
            let todo = generateTodoList(selectedProject);
            background.appendChild(todo);
            generateTodoButtons();
            title.textContent = selectedProject.name;
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

function parseDate(dateString) {
    let string = dateString;
    let month = string.substring(0, 2);
    let day = string.substring(3, 5);
    let year = string.substring(6, 10);
    let hours = string.substring(11, 13);
    let minutes = string.substring(14, 16);

    month.length == 2 && month[0] === '0' ? month = parseInt(month[1]) - 1 : month = parseInt(month) - 1;
    day.length == 2 && day[0] === '0' ? day = parseInt(day[1]) : day = parseInt(day);
    year = parseInt(year);
    hours.length == 2 && hours[0] === '0' ? hours = parseInt(hours[1]) : hours = parseInt(hours);
    minutes.length == 2 && minutes[0] === '0' ? minutes = parseInt(minutes[1]) : minutes = parseInt(minutes);

    let date = new Date(year, month, day, hours, minutes);

    return date;
}
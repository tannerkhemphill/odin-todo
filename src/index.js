import './style.css';
import { Todo, Project, ProjectList } from './todo.js';
import { generateHeader, generateBackground, generateTodoList, generateProjects } from './dom.js';

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

let todoList = generateTodoList(projectList.projectList[0]);
background.appendChild(todoList);

let menu = document.getElementById('menu');
menu.addEventListener('click', function() {
    if (background.firstChild) {
        background.removeChild(background.firstChild);
        let projects = generateProjects(projectList);
        background.appendChild(projects);
        generateProjectButtons();
    };
})

function generateProjectButtons() {
    let projects = document.getElementsByClassName('project-container');
    for (let i = 0; i < projects.length; i++) {
        projects[i].addEventListener("click", function() {
        if (background.firstChild) {
            background.removeChild(background.firstChild);
            let todo = generateTodoList(projectList.projectList[parseInt(this.dataset.index)]);
            background.appendChild(todo);
            generateTodoButtons();
            title.textContent = projectList.projectList[parseInt(this.dataset.index)].name;
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
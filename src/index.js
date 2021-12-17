import './style.css';
import {Todo, Project} from './todo.js';
import { format } from 'date-fns';

let todo1 = new Todo('Dentist Appointment', 'Teeth cleaning', new Date(2021, 0, 14, 14), 1, false);
let todo2 = new Todo('Gym', 'Workout', new Date(2021, 0, 13, 18, 30), 3, true);
let todo3 = new Todo('Cook Dinner', 'Cook dinner after work', new Date(2021, 0, 13, 17, 30), 2, false);

let project1 = new Project();
project1.addTodo(todo1);
project1.addTodo(todo2);
project1.addTodo(todo3);
project1.removeTodo(todo2);

console.log(project1.todoList);
export class Todo {
    constructor(title, description, dueDate, priority, isComplete) {
        this.title = title;
        this.description = description;
        this.dueDate = dueDate;
        this.priority = priority;
        this.isComplete = isComplete;
    }

    get title() {
        return this._title;
    }

    get description() {
        return this._description;
    }

    get dueDate() {
        return this._dueDate;
    }

    get priority() {
        return this._priority;
    }

    get isComplete() {
        return this._isComplete;
    }

    set title(value) {
        this._title = value;
    }

    set description(value) {
        this._description = value;
    }

    set dueDate(value) {
        this._dueDate = value;
    }

    set priority(value) {
        this._priority = value;
    }

    set isComplete(value) {
        this._isComplete = value;
    }
}

export class Project {
    constructor(name) {
        this.name = name;
        this.todoList = [];
    }

    get name() {
        return this._name;
    }

    get todoList() {
        return this._todoList;
    }

    set name(newName) {
        this._name = newName;
    }

    set todoList(list) {
        this._todoList = list;
    }

    addTodo(todo) {
        this.todoList.push(todo);
        this.getSortedTodoList();
    }

    removeTodo(todo) {
        let index = this.todoList.findIndex(({ title }) => title === todo.title);
        this.todoList.splice(index, 1);
    }

    getSortedTodoList() {
        return this.todoList.sort(function(a, b) {
            return parseDate(a.dueDate) - parseDate(b.dueDate);
        });
    }
}

export class ProjectList {
    constructor() {
        this.projectList = [];
    }

    get projectList() {
        return this._projectList;
    }

    set projectList(list) {
        this._projectList = list;
    }

    addProject(project) {
        this.projectList.push(project);
    }

    removeProject(project) {
        let index = this.projectList.findIndex(({ name }) => name === project.name);
        this.projectList.splice(index, 1);
    }
}

export function parseDate(dateString) {
    let string = dateString;
    let month = string.substring(0, 2);
    let day = string.substring(3, 5);
    let year = string.substring(6, 10);
    let hours = string.substring(11, 13);
    let minutes = string.substring(14, 16);
    let ampm = string.substring(17, 19);

    month.length == 2 && month[0] === '0' ? month = parseInt(month[1]) - 1 : month = parseInt(month) - 1;
    day.length == 2 && day[0] === '0' ? day = parseInt(day[1]) : day = parseInt(day);
    year = parseInt(year);
    hours.length == 2 && hours[0] === '0' ? hours = parseInt(hours[1]) : hours = parseInt(hours);
    minutes.length == 2 && minutes[0] === '0' ? minutes = parseInt(minutes[1]) : minutes = parseInt(minutes);

    if (ampm === 'PM' && hours !== '12') {
        hours += 12;
    }

    let date = new Date(year, month, day, hours, minutes);

    return date;
}
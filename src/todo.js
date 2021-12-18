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
    }

    removeTodo(todo) {
        let index = this.todoList.findIndex(({ title }) => title === todo.title);
        this.todoList.splice(index, 1);
    }

    getSortedTodoList() {
        return this.todoList.sort(function(a, b) {
            return a.dueDate - b.dueDate;
        });
    }
}

export class ProjectList {
    constructor() {
        this.projectList = [new Project('Default Project')];
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
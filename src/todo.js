import { format } from 'date-fns';

class Todo {
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

class Project {
    constructor() {
        this.todoList = [];
    }

    get todoList() {
        return this._todoList;
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

export { Todo, Project };
import { observable, action, computed } from 'mobx';
import React from 'react';

class TodoStore {
    @observable todoInput = React.createRef();
    @observable filter = "all";
    @observable beforeEditCache = "";
    @observable idForTodo = 3;
    @observable todos = [
        {
            'id': 1,
            'title': 'React mobx firts item',
            'completed': false,
            'editing': false
        },
        {
            'id': 2,
            'title': 'React mobx Second item',
            'completed': false,
            'editing': false
        }
    ];

    @action addTodo = event => {
        if (event.key === 'Enter') {
            const todoInput = this.todoInput.current.value;

            if (todoInput.trim().length === 0) {
                return;
            }

            this.todos.push({
                id: this.idForTodo,
                title: todoInput,
                completed: false,
                editing: false
            });

            this.idForTodo++;
            this.todoInput.current.value = '';

        }
    };

    @action deleteTodo = (id) => {
        const index = this.todos.findIndex(item => item.id === id);
        this.todos.splice(index, 1);
    }

    @action checkTodo = (todo, event) => {
        const index = this.todos.findIndex(item => item.id === todo.id);
        todo.completed = !todo.completed;
        this.todos.splice(index, 1, todo);
    }

    @action editTodo = (todo, event) => {
        todo.editing = true;
        this.beforeEditCache = todo.title;

        const index = this.todos.findIndex(item => item.id === todo.id);
        this.todos.splice(index, 1, todo);
    }

    @action doneEdit = (todo, event) => {
        todo.editing = false;

        if (event.target.value.trim().length === 0) {
            todo.title = this.beforeEditCache;
        } else {
            todo.title = event.target.value;
        }

        const index = this.todos.findIndex(item => item.id === todo.id);

        this.todos.splice(index, 1, todo);
    }

    @action cancelEdit = (todo, event) => {
        const index = this.todos.findIndex(item => item.id === todo.id);
        todo.title = this.beforeEditCache;
        todo.editing = false;

        this.todos.splice(index, 1, todo);
    }

    @computed get remaining() {
        return this.todos.filter(todo => !todo.completed).length;
    }

    @computed get anyRemaining() {
        return this.remaining !== 0;
    }

    @action checkAllTodos = (event) => {
        this.todos.forEach((todo) => todo.completed = event.target.checked)
    }

    @action updateFilter = filter => {
        this.filter = filter;
    }

    @computed get todosFiltered() {
        if (this.filter === 'all') {
            return this.todos;
        } else if (this.filter === 'active') {
            return this.todos.filter(todo => !todo.completed);
        } else if (this.filter === 'completed') {
            return this.todos.filter(todo => todo.completed);
        }

        return this.todos;
    }

    @action clearCompleted = () => {
        this.todos = this.todos.filter(todo => !todo.completed);
    }

    @computed get todosCompletedCount() {
        return this.todos.filter(todo => todo.completed).length;
    }
}

const store = new TodoStore();
export default store;
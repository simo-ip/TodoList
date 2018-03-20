import * as ko from 'knockout';
import 'isomorphic-fetch';
import { Route, Router } from '../../router';

interface NavParams {
    id: number;
    page: string;
    request_: string;
}

interface TodoItem {
    todoId: number,
    description: string,
    isDone: boolean
}

interface TodoModel {
    pages: number,
    todoList: TodoItem[]
}

class TodoListViewModel {
    public that = this;
    public description = ko.observable();
    public totalPages: number;
    private currentPage: number;
    public todoList = ko.observableArray<TodoItem>();
    public todoItem: TodoItem;

    constructor(params: NavParams) {
        this.currentPage = params.id;
        this.getData();
    }

    public doSomething(e:any) {
        console.log(this.description());
        return false;
    }



    public handleCreate() {
        this.postData('api/todo/', { description: this.description() })
            .then((data: any) => {
                console.log(data)
                this.getData();
            }) // JSON from `response.json()` call
            .catch((error:any) => console.error(error))

        return false;
    }

    public handleUpdate(todo: TodoItem) {
        var url = 'api/todo/' + todo.todoId;
        var data = todo;

        fetch(url, {
            method: 'PUT', // or 'POST'
            body: JSON.stringify(data),
            headers: new Headers({
                'Content-Type': 'application/json'
            })
        }).then(res => res.json())
            .catch(error => console.error('Error:', error))
            .then(response => console.log('Success:', response));
    }

    public handleDelete(todo: TodoItem) {
        return fetch('api/todo/' + todo.todoId, {
            method: 'delete'
        })
        .then(response => response.json());
    }

    public getData() {
        fetch('api/todo/' + this.currentPage)
            .then(response => response.json() as Promise<TodoModel>)
            .then(data => {
                this.totalPages = data.pages;
                this.todoList(data.todoList)
            });
    }

    public postData(url:string, data:any) {
    // Default options are marked with *
    return fetch(url, {
            body: JSON.stringify(data), // must match 'Content-Type' header
            cache: 'no-cache', // *default, no-cache, reload, force-cache, only-if-cached
            credentials: 'same-origin', // include, same-origin, *omit
            headers: {
                'user-agent': 'Mozilla/4.0 MDN Example',
                'content-type': 'application/json'
            },
            method: 'POST', // *GET, POST, PUT, DELETE, etc.
            mode: 'cors', // no-cors, cors, *same-origin
            redirect: 'follow', // *manual, follow, error
            referrer: 'no-referrer', // *client, no-referrer
        })
        .then(response => response.json()) // parses response to JSON
    }
    
}

export default { viewModel: TodoListViewModel, template: require('./todo-list.html') };
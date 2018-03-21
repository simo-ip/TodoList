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

interface Pagination {
    url: string,
    caption: string
}

class TodoListViewModel {
    public totalPages: number;
    private currentPage: number;
    private pages = ko.observableArray<Pagination>(); 

    public description = ko.observable();
    public todoList = ko.observableArray<TodoItem>();
    public todoItem: TodoItem;

    constructor(params: NavParams) {
        this.currentPage = params.id;
        this.getData();
    }

    renderPages() {
        //console.log('renderPages' + this.totalPages);
        this.pages([]);
        for (var i = 1; i < this.totalPages+1; i++) {
            this.pages.push({
                url: '/todo/' + i,
                caption: i.toString()
            })
            console.log('renderPages'+i)
        }
    }

    handleCreate() {
        this.postData('api/todo/', { description: this.description() })
            .then((data: any) => {
                this.getData();
                this.description('');
            })
            .catch((error:any) => console.error(error))

        return false;
    }

    handleUpdate(todo: TodoItem) {
        let url = 'api/todo/' + todo.todoId;
        let data = todo;
        this.updateData(url, todo)
            .catch(error => console.error('Error:', error))
            .then(response => console.log('Success:', response));;        
    }

    handleDelete(todo: TodoItem) {
        this.deleteData(todo)
            .then(response => {
                this.getData();
            }).catch(error => console.error('Error:', error));;
    }

    getData() {
        fetch('api/todo/' + this.currentPage)
            .then(response => response.json() as Promise<TodoModel>)
            .then(data => {
                this.totalPages = data.pages;
                this.todoList(data.todoList);
                this.renderPages();
            });
    }

    postData(url:string, data:any) {
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

    updateData(url: string, data: any) {

        return fetch(url, {
            body: JSON.stringify(data), // must match 'Content-Type' header
            cache: 'no-cache', // *default, no-cache, reload, force-cache, only-if-cached
            credentials: 'same-origin', // include, same-origin, *omit
            headers: {
                'user-agent': 'Mozilla/4.0 MDN Example',
                'content-type': 'application/json'
            },
            method: 'PUT', // *GET, POST, PUT, DELETE, etc.
            mode: 'cors', // no-cors, cors, *same-origin
            redirect: 'follow', // *manual, follow, error
            referrer: 'no-referrer', // *client, no-referrer
        })
            .then(response => response)
    }

    deleteData(todo: TodoItem) {
        return fetch('api/todo/' + todo.todoId, {
            method: 'delete'
        }).then(response => response);
    }
}

export default { viewModel: TodoListViewModel, template: require('./todo-list.html') };
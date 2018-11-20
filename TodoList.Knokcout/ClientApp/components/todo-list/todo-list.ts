import * as ko from 'knockout';
import 'isomorphic-fetch';
import { Route, Router } from '../../router';
import { TodoService } from './todo-service';
import {TodoItem } from './todo-item';

interface NavParams {
    id: number;
    page: string;
    request_: string;
}

interface TodoModel {
    pages: number,
    todoList: TodoItem[]
}

interface Pagination {
    page: number,
    url: string,
    caption: string
}

class TodoListViewModel {
    private totalPages: number;
    private currentPage: number;
    private pages = ko.observableArray<Pagination>(); 

    private description = ko.observable().extend({required: "" });
    private todoList = ko.observableArray<TodoItem>();
    //private todoItem: TodoItem;

    private service: TodoService;
    private errMsg = ko.observable();
    private shouldShowMessage = ko.observable(false);

    constructor(params: NavParams) {
        this.currentPage = params.id;
        this.service = new TodoService('/api/todo/');
        this.loadData();
    }

    loadData() {
        this.shouldShowMessage(false);
        this.service.getData(this.currentPage)
            .then(response => response.json() as Promise<TodoModel>)
            .then(data => {
                this.totalPages = data.pages;
                this.todoList(data.todoList);
                this.renderPages();
            });
    }

    renderPages() {
        this.pages([]);
        for (var i = 1; i < this.totalPages+1; i++) {
            this.pages.push({
                page: i,
                url: '/todo/' + i,
                caption: i.toString()
            })
        }
    }

    handleCreate() {
        this.service.postData('api/todo/', { description: this.description() })
            .then(response => {
                if (!response.ok) {
                    throw Error(response.statusText);
                }
                console.log('Success:', response);
                return response.json();
            })
            .catch(error => {
                console.log('Error:', error)
                this.errMsg(error);
                this.shouldShowMessage(true);
            })
            .then(data => {
                if (data) {
                    console.log('data:', data)
                    this.loadData();
                    this.description('');
                }
            })
        return false;
    }

    handleUpdate(todo: TodoItem) {
        let url = 'api/todo/' + todo.todoId;
        let data = todo;
        this.service.updateData(todo)
            .catch(error => console.log('Error:', error))
            .then(response => console.log('Success:', response));      
    }

    handleDelete(todo: TodoItem) {
        this.service.deleteData(todo.todoId)
            .then(response => {
                this.loadData();
            }).catch(error => console.error('Error:', error));;
    }
}

export default { viewModel: TodoListViewModel, template: require('./todo-list.html') };
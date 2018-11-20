import { Component, OnInit, OnChanges } from '@angular/core';
import { NgForm } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import 'rxjs/add/operator/map';
import { TodoService } from './../../services/todo.service';
import { Todo } from "../../models/Todo";


@Component({
    moduleId: "module.id",
    selector: 'todo',
    templateUrl: './todo.component.html'
})
export class TodoComponent implements OnInit, OnChanges {
    todos: Todo[];
    model: Todo;
    errMsg: string;
    totalPages: number;
    pages: any;
    currentPage: number;

    constructor(private _todoService: TodoService,
        private _route: ActivatedRoute) {

    }

    ngOnInit() {
        this.todos = [];
        this.model = {
            description: '',
            isDone: false,
            todoId: 0
        };
        

        //var id = this._route.snapshot.paramMap.get('id');
        //console.log(id);

        this._route.url.subscribe(url => {
            var id = this._route.snapshot.paramMap.get('id');
            console.log(id);
            if (id) {
                this.currentPage = Number(id)
            };

            this._todoService.getTodos(this.currentPage)
                .map(res => res.json())
                .subscribe(data => {
                
                    this.totalPages = data.pages;
                    this.todos = data.todoList;

                    console.log('totalPages'+this.totalPages);
                    this.pages = new Array(this.totalPages);
                    console.log('pages'+this.pages);

                }, err => this.errMsg = err);

        });

        

    }

    ngOnChanges() {
        var id = this._route.snapshot.paramMap.get('id');
        console.log(id);
    }

    add(form: NgForm) {
        if (form.invalid)
            return;

        this._todoService.add(this.model)
            .subscribe(
            data => {
                this.todos.unshift(data.json()),
                    this.model.description = ''
                form.resetForm();
            },
            err => this.errMsg = err
            );
    }


    update(form: NgForm) {
        if (form.invalid)
            return;

        this._todoService.updateTodo(form.value)
            .subscribe(
            data => console.log('success: ', data),
            err => this.errMsg = err
            );
    }

    delete(form: NgForm) {
        var todos = this.todos;
        var todoId = form.value.todoId;

        this._todoService.deleteTodo(todoId)
            .subscribe(
            data => {
                for (var i = 0; i < this.todos.length; i++) {
                    if (this.todos[i].todoId == todoId) {
                        todos.splice(i, 1);
                    }
                }
            }, err => this.errMsg = err
            );
    }

}

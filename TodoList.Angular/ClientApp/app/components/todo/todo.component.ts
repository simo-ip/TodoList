import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import 'rxjs/add/operator/map';
import { TodoService } from './../../services/todo.service';
import { Todo } from "../../models/Todo";


@Component({
    moduleId: "module.id",
    selector: 'todo',
    templateUrl: './todo.component.html'
})
export class TodoComponent implements OnInit {
    todos: Todo[];
    model: Todo;
    errMsg: string;
    totalPages: number;
    currentPage: number;

    constructor(private _todoService: TodoService) {

    }

    ngOnInit() {
        this.todos = [];
        this.model = {
            description: '',
            isDone: false,
            todoId: 0
        };
        this._todoService.getTodos()
            .map(res => res.json())
            .subscribe(todos => this.todos = todos, err => this.errMsg = err);

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

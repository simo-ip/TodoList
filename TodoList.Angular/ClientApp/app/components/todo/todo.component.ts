import { Component, OnInit } from '@angular/core';
import { Form } from '@angular/forms';
import 'rxjs/add/operator/map';
import { TodoService } from './../../services/todo.service';
import { Todo } from "../../models/Todo";


@Component({
    moduleId: "module.id",
    selector: 'todo',
    templateUrl: 'todo.component.html'
})
export class TodoComponent implements OnInit {
    todo: Todo;
    todos: Todo[];
    errorMessage: string;

    constructor(private _todoService: TodoService) {
        //this.todo.description = 'test 1';
    }

    ngOnInit() {
        this.todo = {
            todoId: 0,
            description: '',
            isDone: false
        };

        this.todos = [];
        this._todoService.getTodos()
            .map(res => res.json())
            .subscribe(todos => this.todos = todos);

    }

    add(model: Todo) {
        console.log('form submitted');
        console.log(model);

        this._todoService.saveTodo(model)
            .subscribe(success => {
                this.todos.unshift(model);
                this.todos.pop();
                this.todo.description = '';
            }, error => this.errorMessage = error);
    };

    update(model: Todo) {
        console.log('form submitted');
        console.log(model);

        this._todoService.updateTodo(model)
            .subscribe(success => {

            }, error => this.errorMessage = error);
    };

    //addTodo($event: any, todoText: any) {
    //    if ($event.which === 1) {
    //        var result;
    //        var newTodo = {
    //            text: todoText.value,
    //            isCompleted: false,
    //            id: undefined
    //        };

    //        result = this._todoService.saveTodo(newTodo);
    //        result.subscribe(x => {
    //            this.todos.push(newTodo)
    //            todoText.value = '';
    //        });
    //    }
    //}

    setEditState(todo : any, state : any) {
        if (state) {
            todo.isEditMode = state;
        } else {
            delete todo.isEditMode;
        }
    }

    updateTodoText($event: any, todo: any) {
        if ($event.which === 13) {
            todo.text = $event.target.value;
            var _todo = {
                _id: todo.id,
                text: todo.text,
                isCompleted: todo.isCompleted
            };

            this._todoService.updateTodo(_todo)
                .subscribe(data => {
                    this.setEditState(todo, false)
                });
        }
    }

    updateStatus(todo : any) {
        console.log(todo.id);
        var _todo = {
            _id: todo.id,
            text: todo.text,
            isCompleted: !todo.isCompleted
        };

        this._todoService.updateTodo(_todo)
            .subscribe(data => {
                todo.isCompleted = !todo.isCompleted;
            });
    }

    deleteTodo(todo : any) {
        var todos = this.todos;
        debugger;
        this._todoService.deleteTodo(todo.todoId)
            .subscribe(data => {

                for (var i = 0; i < this.todos.length; i++) {
                    if (this.todos[i].todoId == todo.todoId) {
                        todos.splice(i, 1);
                    }
                }

            });
    }

}

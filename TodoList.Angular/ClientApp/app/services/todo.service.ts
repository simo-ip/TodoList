import { Injectable } from '@angular/core';
import { Http, Headers } from '@angular/http';
import 'rxjs/add/operator/map';
import { Todo } from '../models/Todo';

@Injectable()
export class TodoService {
    constructor(public _http: Http) {
        
    }
    getTodos(page: number) {
        return this._http.get('/api/todo/' + page);
    }

    add(todo: Todo) {
        var headers = new Headers();
        headers.append('Content-Type', 'application/json');
        return this._http.post('/api/todo', JSON.stringify(todo), { headers: headers });
    }

    updateTodo(todo: Todo) {
        var headers = new Headers();
        headers.append('Content-Type', 'application/json');
        return this._http.put('/api/todo/' + todo.todoId, JSON.stringify(todo), { headers: headers });
    }

    deleteTodo(id: number) {
        return this._http.delete('/api/todo/' + id);
    }

}
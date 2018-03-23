import { TodoItem } from './todo-item';

export class TodoService {

    constructor(private url: string) {

    }


    getData(page: number) {
        return fetch(this.url + page)
            .then(response => response)
    }

    postData(url: string, data: any) {
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
        }).then(responce => responce);            
    }

    updateData(data: TodoItem) {

        return fetch(this.url + data.todoId, {
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
            .then(response => console.log('Success:', response))
            .catch(error => console.log('Error:', error));
    }

    deleteData(id: number) {
        return fetch(this.url + id, {
            method: 'delete'
        }).then(response => response);
    }
}
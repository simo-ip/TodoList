import Pagination from '../../pagination.js';
import Utils from '../../services/Utils.js';

let getTodoList = async (page) => {
    const options = {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json'
        }
    };
    try {
        const response = await fetch(`./api/todo/` + page, options);
        const json = await response.json();
        console.log(json);
        return json;
    } catch (err) {
        console.log('Error getting documents', err);
    }
};



let TodoList = {
    data: {},
    render: async () => {
        let a = Utils.parseRequestURL();
        let p = a.id ? a.id : 1; 
        let data = await getTodoList(p);
        TodoList.data = data;
        TodoList.data.CurrentPage = Number(p);
        let view =  /*html*/`
            <section class="section">
                <h1> Home </h1>
                <ul>
                    ${ data.todoList.map(post =>
                        /*html*/`<li><a href="#/p/${post.todoId}">${post.description}</a></li>`)
                        .join('\n ')
                    }
                </ul>
            </section>`;

        let html = `<div class="text-center">
                    <h1>To-Do <small>List</small></h1>
                    <form id="CreateTodo" class="form-inline">
                        <div id="errorMsg" class="text-danger list-unstyled"></div>
                        <div class="form-group">
                            <input name="Description" class="form-control" placeholder="Enter task" />
                        </div>
                        <div class="form-group">
                            <button type="submit" value="Create" class="btn btn-primary">Add</button>
                        </div>
                        <ul id="validation-errors" class="text-danger list-unstyled"></ul>
                    </form>
                    <hr />
                        ${ data.todoList.map(post =>
                        /*html*/`
                            <form class="editTodo form-inline">
                                <div class="text-danger"></div>
                                <input type="hidden" name="TodoId" value="${post.todoId}" />
                                <div class="form-group">
                                    <div class="checkbox">
                                        <input type="checkbox" name="IsDone" value="${post.IsDone}" />
                                    </div>
                                </div>
                                <div class="form-group">
                                    <input name="Description" class="form-control" value="${post.description}" required/>
                                </div>
                                <div class="btn-group">
                                    <button type="submit" name="submitButton" value="Save" class="btn btn-success" title="Save"><span class="glyphicon glyphicon-floppy-disk"></span></button>
                                    <button type="button" value="${post.todoId}" class="btn btn-danger deleteButton" title="Delete"><span class="glyphicon glyphicon-remove"></span></button>
                                </div>
                                <ul id="validation-errors" class="text-danger list-unstyled"></ul>
                            </form>
                                <br />`
                            ).join('\n ')
                        }
                    <br />
                    <ul class="pagination">

                    </ul>
                    </div>`;
            return html;
        }
        , after_render: async () => {
            Pagination.render(TodoList.data);

            document.getElementById("CreateTodo").addEventListener("submit", (e, data) => {
                e.preventDefault();
                console.log('add');
            });


            let deleteButtons = document.getElementsByClassName("deleteButton");
            for (var i = 0; i < deleteButtons.length; i++) {
                deleteButtons.item(i).addEventListener('click', (e, data) => {
                    e.preventDefault();
                    console.log('delete');
                });
            }

            
            let editButtons = document.getElementsByClassName("editTodo");
            for (var j = 0; j < editButtons.length; j++) {
                editButtons.item(j).addEventListener('submit', (e, data) => {
                    e.preventDefault();
                    console.log('edit');
                });
            }
        }
    };

export default TodoList;
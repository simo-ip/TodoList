import Pagination from '../../pagination.js';
import Utils from '../../services/Utils.js';
import ModelBinder from '../../services/ModelBinder.js';
import Page from "../../page.js";

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

let Todo = {
    TodoId: 0,
    Description: '',
    IsDone: false
};

let TodoModel = {
    getData: function (url) {
        return $.getJSON(url);
    },
    add: function (url, data) {
        return $.ajax({
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            type: "POST",
            url: url,
            data: data
        });
    },
    save: function (url, data) {
        return $.ajax({
            type: "PUT",
            url: url,
            data: data
        });
    },
    delete: function (url) {
        return $.ajax({
            type: "DELETE",
            url: url
        });
    }
};

let TodoViewModel = {
    baseApiUrl: '/api/todo/',
    model: TodoModel,
    data: {},
    state: {},
    render: async () => {
        let a = Utils.parseRequestURL();
        let p = a.id ? a.id : 1;
        let data = await getTodoList(p);
        TodoViewModel.data = data;
        TodoViewModel.data.CurrentPage = Number(p);
        let view =  /*html*/`<div class="text-center">
                    <h1>To-Do <small>List</small></h1>
                    <form id="CreateTodo" class="form-inline">
                        <div id="errorMsg" class="text-danger list-unstyled"></div>
                        <div class="form-group">
                            <input data-model="Description" name="Description" class="form-control" placeholder="Enter task" />
                        </div>
                        <div class="form-group">
                            <button type="submit" value="Create" class="btn btn-primary">Add</button>
                        </div>
                        <ul id="validation-errors" class="text-danger list-unstyled"></ul>
                    </form>
                    <div class="results">
                        <h1 data-binding="Description"></h1>
                    </div>
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
        return view;
    },

    after_render: async () => {
        Pagination.render(TodoViewModel.data);

        document.getElementById("CreateTodo").addEventListener("submit", (e) => {
            e.preventDefault();
            console.log('add');
            TodoViewModel.add(e);
        });


        let deleteButtons = document.getElementsByClassName("deleteButton");
        for (var i = 0; i < deleteButtons.length; i++) {
            deleteButtons.item(i).addEventListener('click', function (e, data) {
                e.preventDefault();
                console.log('delete');
                TodoViewModel.delete(e, data);
            });
        }


        let editButtons = document.getElementsByClassName("editTodo");
        for (var j = 0; j < editButtons.length; j++) {
            editButtons.item(j).addEventListener('submit', (e, data) => {
                e.preventDefault();
                console.log('edit');
                TodoViewModel.edit(e, data);
            });
        }

        console.log('todo');

        TodoViewModel.state = ModelBinder.create({
            Id: null,
            Description: '',
            IsDone: false
        });

        ModelBinder.applayBindings(TodoViewModel.state);

        ModelBinder.render(TodoViewModel.state);

    },
    getData: function (url) {

        /*
        TodoViewModel.model.getData(url)
            .done(function (data) {
                TodoViewModel.renderView(data);
            })
            .fail(function (xhr, status, error) {
                $('#errorMsg').text(error.Message)
            });
        */
    },
    add: function (e) {
        e.preventDefault();
        //if ($("#CreateTodo").valid()) {

        var url = TodoViewModel.baseApiUrl; //"/api/todo/";
        var todo = JSON.stringify(TodoViewModel.state); //$("#CreateTodo").serialize();
        TodoViewModel.model.add(url, todo)
            .done(function (data) {
                //TodoViewModel.getData(TodoViewModel.baseApiUrl + 1);
                console.log(data);
            })
            .fail(function (xhr, status, error) {
                $('#errorMsg').text(xhr.responseJSON.Message);
            });
        //}
    },
    edit: function (e, data) {
        e.preventDefault();

        var $form = $(e.target);
        if ($form.valid()) {
            var todo = TodoViewModel.getFormData($form);

            var url = TodoViewModel.baseApiUrl + todo.TodoId;
            TodoViewModel.model.save(url, todo)
                .done(function (data) {
                    //TodoViewModel.getData(TodoViewModel.baseApiUrl + TodoViewModel.currentPage);
                })
                .fail(function (xhr, status, error) {
                    $('#errorMsg').text(xhr.responseJSON.Message)
                });
        }

    },
    delete: function (e) {
        e.preventDefault();
        var url = TodoViewModel.baseApiUrl + $(this).val();
        TodoViewModel.model.delete(url)
            .done(function (data) {
                //TodoViewModel.getData(TodoViewModel.baseApiUrl + TodoViewModel.currentPage);
            })
            .fail(function (xhr, status, error) {
                $('#errorMsg').text(xhr.responseJSON.Message)
            });
    },
};




export default TodoViewModel;
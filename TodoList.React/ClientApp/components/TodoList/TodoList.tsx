import * as React from 'react';
import { render } from 'react-dom';
import { RouteComponentProps, withRouter } from 'react-router';
import { Link, NavLink } from 'react-router-dom';
import axios from 'axios';
import { TodoItems } from './TodoItems';
import { AddTodoForm } from './AddTodoForm';
import { Pagination } from './Pagination';

export class TodoList extends React.Component<RouteComponentProps<{}>, {}> {
    apiUrl: string;
    _inputElement: any;
    state: any;

    constructor(props:any) {
        super(props);

        this.state = {
            isLoading: true,
            items: [],
            totalPages: 1,
            currentPage: 1
        };
        console.log('isLoading = true')
        this.apiUrl = 'http://localhost:26496/api/todo'

        this.addItem = this.addItem.bind(this);
        this.deleteItem = this.deleteItem.bind(this);
        this.saveItem = this.saveItem.bind(this);
    }

    componentWillReceiveProps(nextProps) {
        this.state.currentPage = nextProps.match.params.id;
        this.loadData(this.state.currentPage);
    }


    componentWillMount() {

    }

    // Lifecycle method
    componentDidMount() {        
        this.loadData(1);
    }

    loadData(id:number) {
        // Make HTTP reques with Axios
        this.setState({ isLoading: true });

        axios.get(this.apiUrl + '/' + id)
            .then((res) => {
                // Set state with result
                this.setState({ items: res.data.todoList });
                this.setState({ totalPages: res.data.pages})
                this.setState({ isLoading: false });
                console.log('res.data.pages=' + res.data.pages)
            });
    }

    addItem(_inputElement:any) {
        console.log('addItem()')
        
        if (_inputElement.value !== "") {
            // Assemble data
            const todo = { description:_inputElement.value }
            // Update data
            axios.post(this.apiUrl, todo)
                .then((res) => {
                    this.loadData(this.state.currentPage)
                });
        }
    }

    saveItem(e) {
        if (e.target.description.value !== "") {
            // Assemble data
            const todo = {
                todoId: e.target.todoId.value,
                description: e.target.description.value,
                isDone: e.target.isDone.value == 'on' ? true : false
            }
            // Update data
            axios.put(this.apiUrl + '/' + todo.todoId, todo)
                .then((res) => {
                    
                });
            console.log(this.apiUrl);
            console.log(todo);
        }
        e.preventDefault();
    }

    deleteItem(key) {
        axios.delete(this.apiUrl + '/' + key)
            .then((res) => {
                this.loadData(this.state.currentPage)
            })
    }

    renderTable() {
        return <TodoItems entries={this.state.items}
            save={this.saveItem}
            delete={this.deleteItem} />
    }

    render() {
        let contents = this.state.isLoading
            ? <p>Loading ...</p>
            : this.renderTable();

        return (
            <div className="text-center">
                <h1>To-Do <small>List</small></h1>
                <AddTodoForm add={this.addItem} />                
                <hr />
                {contents}
                <br />
                <Pagination totalPages={this.state.totalPages} />
            </div>
        );
    }
}
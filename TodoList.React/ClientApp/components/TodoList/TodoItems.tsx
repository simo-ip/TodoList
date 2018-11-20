import * as React from 'react';
import { Component } from 'react';

export class TodoItems extends Component<any, {}> {

    state: any;

    constructor(props) {
        super(props);

        this.state = {
            entries: this.props.entries
        }

        this.createTasks = this.createTasks.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    createTasks(item) {

        return <div key={item.todoId}>
            <form className="form-inline" onSubmit={this.handleSubmit}>
                    <div className="form-group">
                    <input type="hidden" className="form-control" name="todoId" defaultValue={item.todoId} />
	                </div>
                    <div className="form-group">
                        <div className="checkbox checkbox-inline">
                        <input type="checkbox" name="isDone" defaultChecked={item.isDone}  />
		                </div>
                    </div>
                    <div className="form-group">
                    <input type="text" name="description" defaultValue={item.description}  className="form-control"></input>
                    </div>
                    <div className="form-group">
                        <button type="submit" className="btn btn-success"><span className="glyphicon glyphicon-floppy-disk"></span></button>
                        <button type="button" className="btn btn-danger" onClick={() => this.handleDelete(item.todoId)}><span className="glyphicon glyphicon-remove"></span></button>
                    </div >
                </form>
                <br />
            </div>

    }

    handleSubmit(event) {
        this.props.save(event);
    }

    handleDelete(key) {
        this.props.delete(key);
    }

    render() {
        var todoEntries = this.state.entries;
        var listItems = todoEntries.map(this.createTasks);

        return (

            <div>
                {listItems}
            </div>

        );
    }
};
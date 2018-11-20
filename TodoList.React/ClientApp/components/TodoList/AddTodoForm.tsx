import * as React from 'react';
import { Component } from 'react';

export class AddTodoForm extends Component<any, {}> {
    _inputElement: any;

    constructor(props) {
        super(props);

        this.state = {
            entries: this.props.entries
        }

        this.handleSubmit = this.handleSubmit.bind(this);
    }

    handleSubmit(event) {
        this.props.add(this._inputElement);
        this._inputElement.value = "";
        event.preventDefault();
    }

    render() {
        return <div>
            <form onSubmit={this.handleSubmit} className="form-inline">
                <div className="form-group">
                    <input ref={(a) => this._inputElement = a}
                        className="form-control" placeholder="enter task">
                    </input>
                </div>
                <div className="form-group">
                    <button type="submit" className="btn btn-primary">add my</button>
                </div >
            </form>
        </div>
    }
}
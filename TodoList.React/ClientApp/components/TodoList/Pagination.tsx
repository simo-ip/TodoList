import * as React from 'react';
import { Component } from 'react';
import { Link, NavLink } from 'react-router-dom';

export class Pagination extends Component<any, {}> {

    state: any;

    constructor(props) {
        super(props);

        this.state = {
            totalPages: this.props.totalPages
        }
    }

    componentWillReceiveProps(nextProps) {
        this.setState({ totalPages: this.props.totalPages })
    }


    componentWillMount() {

    }

    // Lifecycle method
    componentDidMount() {
        this.setState({ totalPages: this.props.totalPages })
    }

    render() {
        const pages = [];
        for (let i = 1; i <= this.state.totalPages; i++) {
            pages.push(
                <li key={i}>
                    <NavLink to={'/todo/' + i} activeClassName='active'>{i}</NavLink>
                </li>
            );
        }

        return (
                    <ul className="pagination">
                        {pages}
                    </ul>
        );
    }
}
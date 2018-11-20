import * as React from 'react';
import { Link, NavLink } from 'react-router-dom';

export class NavMenu extends React.Component<{}, {}> {
    public render() {
        return <div>
            <div className='navbar navbar-inverse navbar-fixed-top'>
                <div className='navbar-header'>
                    <button type='button' className='navbar-toggle' data-toggle='collapse' data-target='.navbar-collapse'>
                        <span className='sr-only'>Toggle navigation</span>
                        <span className='icon-bar'></span>
                        <span className='icon-bar'></span>
                        <span className='icon-bar'></span>
                    </button>
                    <Link className='navbar-brand' to={ '/' }>TodoList.React</Link>
                </div>
                <div className='navbar-collapse collapse'>
                    <ul className='nav navbar-nav'>
                        <li>
                            <NavLink to={ '/' } exact activeClassName='active'>
                                <span className='glyphicon glyphicon-home'></span> Home
                            </NavLink>
                        </li>
                        <li>
                            <NavLink to={'/about'} activeClassName='active'>
                                <span className='glyphicon glyphicon-th-list'></span> About
                            </NavLink>
                        </li>
                        <li>
                            <NavLink to={ '/contact' } activeClassName='active'>
                                <span className='glyphicon glyphicon-education'></span> Contact
                            </NavLink>
                        </li>
                        <li>
                            <NavLink to={'/todo/1'} activeClassName='active'>
                                <span className='glyphicon glyphicon-th-list'></span> Todo list
                            </NavLink>
                        </li>
                    </ul>
                </div>
            </div>
        </div>;
    }
}

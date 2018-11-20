import * as React from 'react';
import { Route } from 'react-router-dom';
import { Layout } from './components/Layout';
import { Home } from './components/Home';
import { About } from './components/About';
import { Contact } from './components/Contact';
import { TodoList } from './components/TodoList/TodoList';

export const routes = <Layout>
    <Route exact path='/' component={Home} />
    <Route path='/about' component={About} />
    <Route path='/contact' component={Contact} />
    <Route path='/todo/:id' component={TodoList} />
</Layout>;

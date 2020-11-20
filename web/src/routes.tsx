import React from 'react'
import { BrowserRouter, Route, Switch } from 'react-router-dom'
import Home from './pages/Home'
import Board from './pages/Board'


const Routes = () => (
    <BrowserRouter>
        <Switch>
            <Route path='/' exact component={Home}/>
            <Route path='/dashboard/:id' component={Board}/>
            <Route path='/' component={() => <h1> 404 - Page not found </h1>}/>
        </Switch>
    </BrowserRouter>
)

export default Routes
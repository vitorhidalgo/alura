import React from 'react';
import ReactDOM from 'react-dom';
import './css/reset.css';
import './css/timeline.css';
import './css/login.css';
import App from './App';
import Login from './components/Login';
import Logout from './components/Logout';
import {BrowserRouter as Router,Route,Switch,Redirect,matchPath} from 'react-router-dom';
import registerServiceWorker from './registerServiceWorker';

ReactDOM.render(
    (
        <Router>
            <Switch>
                <Route exact path="/" component={Login}/>
                <Route exact path="/timeline/:login?" render={verificaAutenticacao}/>
                <Route path="/logout" component={Logout}/>
            </Switch>
        </Router>
    ), 
    document.getElementById('root')
);

function verificaAutenticacao(nextState, replace) { 
    const match = matchPath('/timeline', {
        path: nextState.match.url,
        exact: true
    })  

    let valida = (match !== null) ? match.isExact : false;

    if (valida && localStorage.getItem('auth-token') === null) { 
        return <Redirect to={{
            pathname: '/',
            state:  {msg: 'Faça login para acessar esta página'}
        }}/>
    }
    return <App/>
}

registerServiceWorker();

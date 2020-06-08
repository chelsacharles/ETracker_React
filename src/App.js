import React, {Component} from 'react';
import {Router, Route, browserHistory, Redirect} from "react-router";
import './App.css';
import Login from './components/Login';
import Home from './components/Home';
import Register from './components/Registration';


class App extends Component{
  render(){
    return(
      <Router history={browserHistory}>   
            <Redirect from="/" to="/Login" />
            <Route> 
        <Route exact path="/" component={Login}/>
        <Route exact path="/Login" component={Login} />
        <Route exact path={"/Home/:id/:name"} component={Home} />
        <Route exact path="/Register" component={Register}/>
        </Route>
      </Router>
    );
  }
}

export default App;

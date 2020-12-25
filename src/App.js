import React from 'react';
import {Switch, Route} from 'react-router-dom';
import GlobalStateProvider, { globalContext} from './Context/GlobalState';
import Home from './Components/Home';
import Register from './Components/Register';
import Login from './Components/Login';
import User from './Components/UserPage';
import './App.css';

class App extends React.Component {
  render() { 
    return (
    <div className="App">
      <GlobalStateProvider>
        <Switch>
          <Route exact path='/' component={Home}></Route>
          <Route path='/Register' component={Register}></Route>
          <Route exact path='/Login' component={Login}></Route>
          <Route path='/Login/User' component={User}></Route>
        </Switch>
      </GlobalStateProvider>
    </div>
  );
  }
}
App.contextType = globalContext;


export default App;


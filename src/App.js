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
          <Route exact path='https://github.com/SDHeizler/ReactLoginProject/' ><Home></Home></Route>
          <Route path='https://github.com/SDHeizler/ReactLoginProject/Register' ><Register></Register></Route>
          <Route exact path='https://github.com/SDHeizler/ReactLoginProject/Login' ><Login></Login></Route>
          <Route path='https://github.com/SDHeizler/ReactLoginProject/Login/User' ><User></User></Route>
        </Switch>
      </GlobalStateProvider>
    </div>
  );
  }
}
App.contextType = globalContext;


export default App;


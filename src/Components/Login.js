import React from 'react';
import GlobalStateProvider, {globalContext} from '../Context/GlobalState';
class Login extends React.Component {
    render() { 
        return ( 
            <GlobalStateProvider>
             <div>
                <form onSubmit={(e) => this.context.loginFormSubmit(e)} className='container CreateAccountForm'>
                    <label>Email</label>
                    <input 
                    onChange={(e) => this.context.loginEmailChange(e)} 
                    htmlFor='Email' 
                    type='email' 
                    required name='LoginEmail' 
                    value={this.context.state.LoginEmail} 
                    placeholder='Enter Email'></input>
                    <label>Password</label>
                    <input 
                    onChange={(e) => this.context.loginPasswordChange(e)} 
                    htmlFor='Password' 
                    type='password' 
                    required 
                    name='LoginPassword' 
                    value={this.context.state.LoginPassword} 
                    placeholder='Enter Password'></input>
                    <button className='btn-primary' type='Submit'>Login</button>
                </form>
            </div>
            </GlobalStateProvider>
         );
    }
}
Login.contextType = globalContext; 
export default Login;
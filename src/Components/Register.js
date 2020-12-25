import React from 'react';
import GlobalStateProvider, {globalContext} from '../Context/GlobalState'
class Register extends React.Component {
    render() { 
        return ( 
        <GlobalStateProvider>
            <div>
                <form className='container CreateAccountForm'>
                    <label>UserName</label>
                    <input  
                    onChange={(e) => this.context.onChange(e)} 
                    htmlFor='UserName' 
                    type='text' 
                    required 
                    name='RegisterUsername' 
                    value={this.context.state.RegisterUsername} 
                    placeholder='Enter Username'></input>
                    <label>Email</label>
                    <input  
                    onChange={(e) => this.context.onChange(e)} 
                    htmlFor='Email' 
                    type='email' 
                    required 
                    name='RegisterEmail' 
                    value={this.context.state.RegisterEmail} 
                    placeholder='Enter Email'></input>
                    <label>Password</label>
                    <input  
                    onChange={(e) => this.context.onChange(e)} 
                    htmlFor='Password' 
                    type='password' 
                    required 
                    name='RegisterPassword' 
                    value={this.context.state.RegisterPassword} 
                    placeholder='Enter Password'></input>
                    <ul className='CreateAccountUl'>
                        <li style={{textDecoration:this.context.state.CharacterLength ? 'line-through' : ''}}>Password Must be at least 8 characters long</li>
                        <li style={{textDecoration:this.context.state.CapitalLetter ? 'line-through' : ''}}>Must include a Capital letter</li>
                        <li style={{textDecoration:this.context.state.SpecialCharacter ? 'line-through' : ''}}>Must include a symbol ex. !,@,#,$,%,^,&,*</li>
                    </ul>
                    <label>Confirm Password</label>
                    <input  
                    onChange={(e) => this.context.onChange(e)} htmlFor='ConfirmPassword' 
                    type='password' 
                    required 
                    name='ConfirmPassword' 
                    value={this.context.state.ConfirmPassword} placeholder='Confirm Password'></input>
                    <button className='btn-primary' type='Submit'>Create Account</button>
                </form>
            </div>
        </GlobalStateProvider>
         );
    }
}
Register.contextType = globalContext;
export default Register;
import React from 'react';
import GlobalStateProvider, {globalContext} from '../Context/GlobalState'
class Register extends React.Component {
    render() { 
        return ( 
        <GlobalStateProvider>
            <div>
                <form onSubmit={(e) => this.context.registerformSubmit(e)} className='container CreateAccountForm'>
                    <label>UserName</label>
                    <input  
                    onChange={(e) => this.context.registerUsernameChange(e)} 
                    htmlFor='UserName' 
                    type='text' 
                    required 
                    name='RegisterUsername' 
                    value={this.context.state.RegisterUsername} 
                    placeholder='Enter Username'></input>
                    <label>Email</label>
                    <input  
                    onChange={(e) => this.context.registerEmailChange(e)} 
                    htmlFor='Email' 
                    type='email' 
                    required 
                    name='RegisterEmail' 
                    value={this.context.state.RegisterEmail} 
                    placeholder='Enter Email'></input>
                    <label>Password</label>
                    <input
                    onChange={(e) => this.context.registerPasswordChange(e)} 
                    htmlFor='Password' 
                    type='password' 
                    required 
                    name='RegisterPassword' 
                    value={this.context.state.RegisterPassword} 
                    placeholder='Enter Password'></input>
                    <ul className='CreateAccountUl'>
                        <li style={{textDecoration:this.context.state.CharacterLength ? 'line-through' : '', border:this.context.state.InvalidCharacterLength}}>Password Must be at least 8 characters long</li>
                        <li style={{textDecoration:this.context.state.CapitalLetter ? 'line-through' : '', border:this.context.state.InvalidCapitalLetter}}>Must include a Capital letter</li>
                        <li style={{textDecoration:this.context.state.SpecialCharacter ? 'line-through' : '', border:this.context.state.InvalidSpecialCharacter}}>Must include a symbol ex. !,@,#,$,%,^,&,*</li>
                    </ul>
                    <label>Confirm Password</label>
                    <input
                    style={{border:this.context.state.InvalidConfirmPassword}}
                    onChange={(e) => this.context.confirmPasswordChange(e)} htmlFor='ConfirmPassword' 
                    type='password' 
                    required 
                    name='ConfirmPassword' 
                    value={this.context.state.ConfirmPassword} placeholder='Confirm Password'></input>
                    <p className='RegisterConfirmPasswordError'
                    style={{display:this.context.state.InvalidConfirmPasswordWarning}} >Passwords do not match</p>
                    <button className='btn-primary' type='Submit'>Create Account</button>
                </form>
            </div>
        </GlobalStateProvider>
         );
    }
}
Register.contextType = globalContext;
export default Register;
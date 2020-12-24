import React from 'react';
class Register extends React.Component {
    render() { 
        return ( 
            <div>
                <form className='container CreateAccountForm'>
                    <label>UserName</label>
                    <input type='text' required name='UserName' value='' placeholder='Enter UserName'></input>
                    <label>Email</label>
                    <input type='text' required name='Email' value='' placeholder='Enter Email'></input>
                    <label>Password</label>
                    <input type='text' required name='Password' value='' placeholder='Enter Password'></input>
                    <label>Confirm Password</label>
                    <input type='text' required name='ConfirmPassword' value='' placeholder='Confirm Password'></input>
                    <button className='btn-primary' type='Submit'>Submit</button>
                </form>
            </div>
         );
    }
}
 
export default Register;
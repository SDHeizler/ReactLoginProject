import React from 'react';
import GlobalStateProvider, {globalContext} from '../Context/GlobalState';
class User extends React.Component {
    render() { 
        return ( 
            <GlobalStateProvider>
            <div>
                <nav className='navbar UserNav'>
                    <h1 className='navbar-brand'>Hello {this.context.state.RegisterUsername}</h1>
                    <button className='btn-danger'>Logout</button>
                </nav>
                <div className=' UserInputDivContainer'>
                    <input onChange={(e) => this.context.onChange(e)} name='UserPost' type='text' placeholder='Enter posts' value={this.context.state.UserPost}></input>
                    <button className='btn-primary'>Add Post</button>
                </div>
                <ul className='container UserPostList'>
                    <li>Dummy Post Dummy Post Dummy Post Dummy Post</li>
                    <li>Dummy Post</li>
                    <li>Dummy Post</li>
                </ul>
            </div>
            </GlobalStateProvider>
         );
    }
}
User.contextType = globalContext;
export default User;
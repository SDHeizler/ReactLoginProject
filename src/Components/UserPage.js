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
                <form onSubmit={(e) => this.context.addPostSubmit(e)} className=' UserInputDivContainer'>
                    <input onChange={(e) => this.context.inputPostChange(e)} name='UserPost' type='text' placeholder='Enter posts' value={this.context.state.UserPost}></input>
                    <button type='Submit' className='btn-primary'>Add Post</button>
                </form>
                <ul className='container UserPostList'>
                    {this.context.state.UserPosts.map((ele) => {
                        return (
                            <li className='UserPostListItem' key={ele.id}>{ele.post}<button onClick={(id) => this.context.deletePostClick(ele.id)}>X</button></li>
                        );
                    })}
                </ul>
            </div>
            </GlobalStateProvider>
         );
    }
}
User.contextType = globalContext;
export default User;
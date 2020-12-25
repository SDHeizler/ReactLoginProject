import React from 'react';

// CreateContext
export const globalContext = React.createContext();

// GlobalState
class GlobalStateProvider extends React.Component {
    state = {
        Title:'React Test Title',
        LoginEmail:'',
        LoginPassword:'',
        RegisterUsername:'Test User',
        RegisterEmail:'',
        RegisterPassword:'',
        ConfirmPassword:'',
        CharacterLength:true,
        CapitalLetter:false,
        SpecialSymbol:false,
        UserPosts:[],
        UserPost:'',
    }
    onChange = (e) => {
        let value = e.target.value;
        if(e.target.name === 'LoginEmail'){
            this.setState({
                ...this.state,
                LoginEmail:value
            })
        } else if(e.target.name === 'LoginPassword'){
            this.setState({
                ...this.state,
                LoginPassword:value
            })
        } else if(e.target.name === 'RegisterUsername'){
            this.setState({
                ...this.state,
                RegisterUsername:value
            })
        } else if(e.target.name === 'RegisterEmail'){
            this.setState({
                ...this.state,
                RegisterEmail:value
            })
        } else if(e.target.name === 'RegisterPassword'){
            this.setState({
                ...this.state,
                RegisterPassword:value
            })
        } else if(e.target.name === 'UserPost'){
            this.setState({
                ...this.state,
                UserPost:value
            })
        }else{
             this.setState({
                 ...this.state,
                ConfirmPassword:value
            })
        }
    }
    render() { 
        return ( 
            <globalContext.Provider value={{state:this.state, onChange:this.onChange}}>
                {this.props.children}
            </globalContext.Provider>
         );
    }
};
 export default GlobalStateProvider;



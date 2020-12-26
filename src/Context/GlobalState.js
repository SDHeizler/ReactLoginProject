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
        CharacterLength:false,
        CapitalLetter:false,
        SpecialSymbol:false,
        UserPosts:[],
        UserPost:'',
    };
    loginEmailChange = (e) => {
         let value = e.target.value;
            this.setState({
                ...this.state,
                LoginEmail:value
            })
    };
    loginPasswordChange = (e) => {
         let value = e.target.value;
        this.setState({
                ...this.state,
                LoginPassword:value
            })
    };
    registerUsernameChange = (e) => {
        let value = e.target.value;
        this.setState({
                ...this.state,
                RegisterUsername:value
            })
    };
    registerEmailChange = (e) => {
         let value = e.target.value;
        this.setState({
                ...this.state,
                RegisterEmail:value
            })
    };
    registerPasswordChange = (e) => {
         let value = e.target.value;
         let capRegex = /[A-Z]/;
         let specSymbolRegex = /(?=.*[!@#$%^&*])/;
        this.setState({
                ...this.state,
                RegisterPassword:value,
                CharacterLength:this.state.RegisterPassword.length >= 8 ? true : false,
                CapitalLetter:capRegex.test(this.state.RegisterPassword) !== true || this.state.RegisterPassword.length <= 1 ? false : true,
                SpecialCharacter: specSymbolRegex.test(this.state.RegisterPassword) !== true || this.state.RegisterPassword.length <= 1 ? false: true,
            });
    };
    confirmPasswordChange = (e) => {
         let value = e.target.value;
        this.setState({
                ...this.state,
                ConfirmPassword:value
            })
    };
   
    render() { 
        return ( 
            <globalContext.Provider value={
                {state:
                this.state, 
                loginEmailChange:this.loginEmailChange, 
                loginPasswordChange:this.loginPasswordChange,
                registerUsernameChange:this.registerUsernameChange,
                registerEmailChange:this.registerEmailChange,
                registerPasswordChange:this.registerPasswordChange,
                confirmPasswordChange:this.confirmPasswordChange    
                }}>
                {this.props.children}
            </globalContext.Provider>
         );
    }
};
 export default GlobalStateProvider;



import React from 'react';
import {redirect} from 'react-router-dom';
import axios from 'axios';
// CreateContext
export const globalContext = React.createContext();

// GlobalState
class GlobalStateProvider extends React.Component {
    state = {
        Title:'React Test Title',
        LoginEmail:'',
        LoginPassword:'',
        RegisterUsername:'',
        RegisterEmail:'',
        RegisterPassword:'',
        ConfirmPassword:'',
        CharacterLength:false,
        CapitalLetter:false,
        SpecialSymbol:false,
        UserPosts:[{id:0, post:'Dummy post 1'}, {id:1, post:'Dummy post 2'},{id:2, post:'Dummy post 3'}],
        UserPost:'',
        RegisterButtonDisabled:false,
        InvalidCharacterLength:'',
        InvalidSpecialSymbol:'',
        InvalidCapitalLetter:'',
        InvalidConfirmPassword:'',
        InvalidConfirmPasswordWarning:'none',
        RegisterAccountSuccess:false,
        LoginFailedWarning:false,
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
            SpecialSymbol: specSymbolRegex.test(this.state.RegisterPassword) !== true || this.state.RegisterPassword.length <= 1 ? false: true,
            });
    };
    confirmPasswordChange = (e) => {
        let value = e.target.value;
        this.setState({
                ...this.state,
                ConfirmPassword:value
            })
    };
    registerformSubmit = (e) => {
        e.preventDefault();
        this.setState({
            ...this.state,
            InvalidCharacterLength:'',
            InvalidSpecialSymbol:'',
            InvalidCapitalLetter:'',
            InvalidConfirmPassword:'',
            InvalidConfirmPasswordWarning:'none',
            RegisterAccountSuccess:false,
        });
        let passMatchTest = this.state.RegisterPassword === this.state.ConfirmPassword ? true : false;
        if(this.state.SpecialSymbol && this.state.CharacterLength && this.state.CapitalLetter && passMatchTest){
            axios.post('http://localhost:8000/Register', {
                registerUsername:this.state.RegisterUsername,
                registerEmail:this.state.RegisterEmail,
                registerPassword:this.state.RegisterPassword
            })
            .then((response) => {
                    this.setState({
                        RegisterAccountSuccess:true,
                        RegisterUsername:'',
                        RegisterEmail:'',
                        RegisterPassword:'',
                        ConfirmPassword:'',
                        CharacterLength:false,
                        CapitalLetter:false,
                        SpecialSymbol:false,
                    })
            })
            .catch((err) => {
                console.log(err)
            })
        }else{
            if(!this.state.SpecialSymbol){
                this.setState({
                    ...this.state,
                    InvalidSpecialCharacter:'1px solid Red'
                })
            }
            if(!this.state.CharacterLength){
                this.setState({
                    ...this.state,
                    InvalidCharacterLength:'1px solid Red'
                })
            }
            if(!this.state.CapitalLetter){
                this.setState({
                    ...this.state,
                    InvalidCapitalLetter:'1px solid Red'
                })
            }
            if(!passMatchTest){
                this.setState({
                    ...this.state,
                    InvalidConfirmPassword:'3px solid Red',
                    InvalidConfirmPasswordWarning:'',
                })
            }
        }
    }
    loginFormSubmit = (e) => {
        e.preventDefault();
        console.log('Login Submit')
    }
    inputPostChange = (e) => {
        let value = e.target.value
        this.setState({
            ...this.state,
            UserPost:value
        })
    }
    addPostSubmit = (e) => {
        e.preventDefault();
        let newUserPost = {id:this.state.UserPosts.length, post:this.state.UserPost}
        this.setState({
            ...this.state,
            UserPosts:[...this.state.UserPosts, newUserPost],
            UserPost:''
        })
    }
    deletePostClick = (id) => {
        this.setState({
            ...this.state,
            UserPosts:this.state.UserPosts.filter((ele) => {
                if(ele.id !== id){
                    return ele
                }else{
                    return ''
                }
            })
        })
    }
    closeRegisterAccountSuccessClick = () => {
        this.setState({
            ...this.state,
            RegisterAccountSuccess:false
        })
    }
    closeLoginFailedWarningClick = () => {
        this.setState({
            ...this.state,
            LoginFailedWarning:false
        })
    }
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
                confirmPasswordChange:this.confirmPasswordChange,
                registerformSubmit:this.registerformSubmit,
                loginFormSubmit:this.loginFormSubmit,  
                inputPostChange:this.inputPostChange,
                addPostSubmit:this.addPostSubmit,
                deletePostClick:this.deletePostClick,
                closeRegisterAccountSuccessClick:this.closeRegisterAccountSuccessClick,
                closeLoginFailedWarningClick:this.closeLoginFailedWarningClick, 
                }}>
                {this.props.children}
            </globalContext.Provider>
         );
    }
};
 export default GlobalStateProvider;



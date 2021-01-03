import React from 'react';
import axios from 'axios';
import {withRouter} from 'react-router-dom'
// CreateContext
export const globalContext = React.createContext();

// GlobalState
class GlobalStateProvider extends React.Component {
    state = {
        LoginEmail:'',
        LoginPassword:'',
        RegisterUsername:'',
        RegisterEmail:'',
        RegisterPassword:'',
        ConfirmPassword:'',
        CharacterLength:false,
        CapitalLetter:false,
        SpecialSymbol:false,
        UserPosts:[],
        UserPost:'',
        RegisterButtonDisabled:false,
        InvalidCharacterLength:'',
        InvalidSpecialSymbol:'',
        InvalidCapitalLetter:'',
        InvalidConfirmPassword:'',
        InvalidConfirmPasswordWarning:'none',
        RegistrationError:'',
        RegisterAccountSuccess:false,
        LoginFailedWarning:false,
        UserID:'5fee40385cbb9e3a2caf7f3c',
        UserEmail:'',
        UserUsername:'',
        Loading:false,
        Redirect:false,
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
                this.setState({
                    ...this.state,
                    InvalidConfirmPasswordWarning:'',
                    RegistrationError:"User Already Exists"
                })
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
                    RegistrationError:"Password doesn't match"
                })
            }
        }
    }
    loginFormSubmit = async (e) => {
        e.preventDefault();
        this.setState({
            ...this.state,
            LoginFailedWarning:false
        })
        let res = await axios.post('http://localhost:8000/Login',{auth : {
            loginEmail:this.state.LoginEmail,
            loginPassword:this.state.LoginPassword
        }})
        .then((response) => {
            this.setState({
                ...this.state,
                LoginEmail:'',
                LoginPassword:'',
                UserID:response.data.id,
                UserEmail:response.data.email,
                UserUsername:response.data.username,
                Loading:true,
                LoginFailedWarning:false,
                Redirect:true
            })
            this.props.history.push(`/Login/User/${this.state.UserID}`)
        })
        .catch((error) => {
            this.setState({
                ...this.setState({
                    ...this.state,
                    LoginFailedWarning:true
                })
            })
        })
        return res;
    }
    inputPostChange = (e) => {
        let value = e.target.value
        this.setState({
            ...this.state,
            UserPost:value
        })
    }
    addPostSubmit = async (e) => {
        e.preventDefault();
        let newUserPost = {id:this.state.UserPosts.length, post:this.state.UserPost}
        let res = await
        axios.put(`http://localhost:8000/Login/User/${this.state.UserID}`, {
            params:{
                post:newUserPost
            }
        })
        .then((response) => {
            if(response){
                console.log(response)
                this.setState({
                    ...this.state,
                    UserPosts:response.data,
                    UserPost:''
                })
            }
        })
        .catch((error) => {
            console.log(error)
        });
        return res;
    }
    deletePostClick = async (id) => {
        let res = await
        axios.delete(`http://localhost:8000/Login/User/${this.state.UserID}`, {
            data:{
                deletePost:id
            }
        })
        .then((response) => {
            if(response){
                console.log(response)
                this.setState({
                    ...this.state,
                    UserPosts:response.data
                })
            }
        })
        .catch((error) => {
            console.log(error)
        });
        return res;
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
    getUserTodos = async () => {
        let res = await 
        axios.get(`http://localhost:8000/Login/User/${this.state.UserID}`)
        .then((response) => {
            if(response){
                this.setState({
                    ...this.state,
                    UserPosts:response.data
                })
            }
        })
        .catch((error) => {
            console.log(error)
        });
        return res;
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
                getUserTodos:this.getUserTodos, 
                }}>
                {this.props.children}
            </globalContext.Provider>
         );
    }
};
 export default withRouter(GlobalStateProvider);



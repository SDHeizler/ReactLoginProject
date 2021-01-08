import React from 'react';
import axios from 'axios';
import {withRouter} from 'react-router-dom';
import {v4 as uuidv4} from 'uuid';
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
        UserID:'',
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
                UserUsername:response.data.username,
                Loading:true,
                LoginFailedWarning:false,
                UserPosts:response.data.posts
            })
            localStorage.setItem("id", JSON.stringify(this.state.UserID));
            localStorage.setItem("token", JSON.stringify(response.data.token));
            this.props.history.push(`/Login/User/`)
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
        let getId = localStorage.getItem("id");
        let getToken = localStorage.getItem('token');
        let userId = JSON.parse(getId);
        let token = JSON.parse(getToken);
        let newUserPost = {id:uuidv4(), post:this.state.UserPost}
        let res = await
        axios.put(`http://localhost:8000/Login/User/${userId}`, {
            headers:{
                "Content-Type":"application/json",
                "x-auth-token":token
            },
            params:{
                post:newUserPost
            }
        })
        .then((response) => {
            if(response){
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
        let getId = localStorage.getItem("id");
        let getToken = localStorage.getItem('token');
        let userId = JSON.parse(getId);
        let token = JSON.parse(getToken);
        let res = await
        axios.delete(`http://localhost:8000/Login/User/${userId}`, {
            headers:{
                "Content-Type":"application/json",
                "x-auth-token":token
            },
            data:{
                deletePost:id
            }
        })
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
    getUserData = async () => {
        let getId = localStorage.getItem("id");
        let getToken = localStorage.getItem('token');
        let userId = JSON.parse(getId);
        let token = JSON.parse(getToken);
        if(!token){
            this.props.history.push('/Login')
        }else{
            let res = await 
        axios.get(`http://localhost:8000/Login/User/${userId}`, {
            headers:{
                "Content-Type":"application/json",
                'x-auth-token': token,
            },
            
        })
        .then((response) => {
            if(response){
                this.setState({
                    ...this.state,
                    UserID:response.data.id,
                    UserUsername:response.data.username,
                    UserPosts:response.data.posts
                })
            }
        })
        .catch((error) => {
            console.log(error)
            this.props.history.push('/Login')
        });
        return res;
        }
        
    }
    logOutClick = () => {
       this.setState({
            ...this.state,
            UserID:'',
            UserUsername:'',
            UserPosts:''
        });
        localStorage.removeItem("id");
        localStorage.removeItem("token");
        this.props.history.push('/');
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
                getUserData:this.getUserData,
                logOutClick:this.logOutClick, 
                }}>
                {this.props.children}
            </globalContext.Provider>
         );
    }
};
 export default withRouter(GlobalStateProvider);



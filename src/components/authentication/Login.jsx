import React from 'react';

class Login extends React.PureComponent {
   
    state = {
        username: '',
        password: '',
        confirm: '',
        email: '',
        page: this.props.location.pathname,
        error: false,
    }

    usernameRef = null;
    setUsernameRef = (ref) => {
      this.usernameRef=ref;
    };

    passwordRef = null;
    setPasswordRef = (ref) => {
        this.passwordRef=ref;
    };

    confirmPasswordRef = null;
    setConfirmPasswordRef = (ref) => {
        this.confirmPasswordRef=ref;
    };

    emailRef = null;
    setEmailRef = (ref) => {
        this.emailRef=ref;
    };


    render() {
        console.log('Login render')
        console.log(this.props.location.pathname)
        return (    
            <div className="Login">
                { 
                    this.state.error && 
                    <p className="error">Все поля должны быть заполнены</p> 
                }
                <label className="field"> 
                    <span>Имя пользователя: </span>  
                    <input data-field="username" type="text" 
                        defaultValue={this.state} ref={this.setUsernameRef} />  
                </label>
                <label className="field"> 
                    <span>Ваш пароль: </span>  
                    <input data-field="password" type="text" 
                        defaultValue={this.state} ref={this.setPasswordRef} />  
                </label>
                { 
                    this.state.page ==='/signup' &&
                        <React.Fragment>                          
                            <label className="field"> 
                                <span>Подтвердите Ваш пароль: </span>  
                                <input data-field="confirm" type="text" 
                                    defaultValue={this.state.confirm} ref={this.setConfirmPasswordRef} />
                            </label>
                            <label className="field"> 
                                <span>Ваш Email: </span>  
                                <input data-field="email" type="text" 
                                    defaultValue={this.state.email} ref={this.setEmailRef} />  
                            </label>
                        </React.Fragment>
                }
            </div>)
    }
}

export default Login;
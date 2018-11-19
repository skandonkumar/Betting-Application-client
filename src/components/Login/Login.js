import React from "react";
import './login.scss';
import FadeTransition from "./fadeTransition";
import axios from 'axios';
import {Redirect} from 'react-router-dom';


export default class MainLoginPage extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            isLoginOpen: true,
            isRegisterOpen: false,
            isChairpersonOpen: false
        };
    }

    showLoginBox() {
        this.setState({isLoginOpen: true, isRegisterOpen: false, isChairpersonOpen: false});
    }

    showRegisterBox() {
        this.setState({isRegisterOpen: true, isLoginOpen: false, isChairpersonOpen: false});
    }

    showChairpersonBox(){
        this.setState({isRegisterOpen: false, isLoginOpen: false, isChairpersonOpen: true});
    }

    render() {
        const chairperson_address = this.props.ch;
        const user_name = this.props.username;
        return (
            <div className="root-container">
                <div className="box-controller">
                    <div
                        className={"controller " + (this.state.isLoginOpen
                            ? "selected-controller"
                            : "")}
                        onClick={this
                            .showLoginBox
                            .bind(this)}>
                        Login
                    </div>
                    <div
                        className={"controller " + (this.state.isRegisterOpen
                            ? "selected-controller"
                            : "")}
                        onClick={this
                            .showRegisterBox
                            .bind(this)}>
                        Register
                    </div>
                    <div
                        className={"controller " + (this.state.isChairpersonOpen
                            ? "selected-controller"
                            : "")}
                        onClick={this
                            .showChairpersonBox
                            .bind(this)}>
                        Chairperson
                    </div>
                </div>

                <FadeTransition isOpen={this.state.isLoginOpen} duration={50}>
                    <div className="box-container">
                        <LoginBox/>
                    </div>
                </FadeTransition>
                <FadeTransition isOpen={this.state.isRegisterOpen} duration={50}>
                    <div className="box-container">
                        <RegisterBox/>
                    </div>
                </FadeTransition>
                <FadeTransition isOpen={this.state.isChairpersonOpen} duration={50}>
                    <div className="box-container">
                        <ChairpersonBox ch = {chairperson_address} contract = {this.props.contract} setAdminLogin={this.props.setAdminLogin}/>
                    </div>
                </FadeTransition>
            </div>
        );
    }
}

class ChairpersonBox extends React.Component{
    constructor(props){
        super(props);
        this.state = {
            ch : props.ch,
            address : "",
            success : false
        }
    }

    onLoginAddressChange(e) {
        this.setState({address: e.target.value});
    }

    LoginChairperson(e){
        e.preventDefault();
        if (this.state.ch === this.state.address) {
            this.setState({
                success: true
            })
        }
        else{
            this.setState({
                error:"Invalid address"
            })
        }
    }

    render(){
        const contract = this.props.contract;
        const chairperson = this.state.ch;

        if (this.state.success){
            this.props.setAdminLogin()
            return (<Redirect to={{pathname:"/giveRight", state:{ch:chairperson}}}/>)
        }
        return(
            <div className="inner-container">
                <div className="header">
                    Chairperson
                </div>
                <div className="box">
                    <div className="input-group">
                        <label htmlFor="address">Address</label>
                        <input
                            type="text"
                            name="chairperson-address"
                            className="login-input"
                            placeholder="Chairperson Address"
                            onChange={this
                                .onLoginAddressChange
                                .bind(this)}/>
                    </div>
                    <button
                        type="button"
                        className="login-btn"
                        onClick={this
                            .LoginChairperson
                            .bind(this)}>Chairperson Login
                    </button>
                    <small className="danger-error">{this.state.error?this.state.error:""}</small>
                </div>
            </div>
        );
    }
}

class LoginBox extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            username: "",
            password: "",
            errors: "",
            success : false,
            error : ""
        };
    }

    onLoginUsernameChange(e) {
        this.setState({username: e.target.value,
            errors: ""});
    }

    onLoginPasswordChange(e) {
        this.setState({password: e.target.value,
            errors: ""});
    }


    submitLogin(e) {
        e.preventDefault();
        axios
            .post("http://localhost:5000/api/login", this.state)
            .then(result => {
                if(result.data.errors){
                    return this.setState({errors : result.data})
                }
                if (result.data.error){
                    return this.setState({
                        error : result.data.message
                    })
                }
                this.setState({
                    user_data : result.data,
                    errors: "",
                    success : true
                })
            })
        console.log(this.state.username);
    }

    render() {
        const username = this.state.username;

        if (this.state.success){
            return (<Redirect to={{pathname:"/bet", state:{username:username}}}/>)
        }

        return (
            <div className="inner-container">
                <div className="header">
                    Login
                </div>
                <div className="box">

                    <div className="input-group">
                        <label htmlFor="username">Username</label>
                        <input
                            type="text"
                            name="username"
                            className="login-input"
                            placeholder="Username"
                            onChange={this
                                .onLoginUsernameChange
                                .bind(this)}
                        />
                    </div>

                    <div className="input-group">
                        <label htmlFor="password">Password</label>
                        <input
                            type="password"
                            name="password"
                            className="login-input"
                            placeholder="Password"
                            onChange={this
                                .onLoginPasswordChange
                                .bind(this)}
                        />
                    </div>

                    <button
                        type="button"
                        className="login-btn"
                        onClick={this
                            .submitLogin
                            .bind(this)}>Login
                    </button>

                    <small className="danger-error">{this.state.errors !== "" && this.state.errors.errors.username?this.state.errors.errors.username.msg:""}</small>
                    <small className="danger-error">{this.state.errors !== "" && this.state.errors.errors.password?this.state.errors.errors.password.msg:""}</small>
                    <small className="danger-error">{this.state.error !== ""?this.state.error:""}</small>
                </div>
            </div>
        );
    }

}

class RegisterBox extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            username: "",
            password: "",
            address: "",
            user_data:"",
            errors:"",
            success: false
        };
    }

    onUsernameChange(e) {
        this.setState({username: e.target.value});
    }

    onPasswordChange(e) {
        this.setState({password: e.target.value});
    }

    onAddressChange(e){
        this.setState({address: e.target.value});
    }

    submitRegister(e) {
        e.preventDefault();
        axios
            .post("http://localhost:5000/api/register", this.state)
            .then(result => {
                if(result.data.errors){
                    return this.setState({errors : result.data})
                }
                return this.setState({
                    user_data : result.data,
                    errors: "",
                    success : true
                })
            })
    }

    render() {

        if (this.state.success === true){
            alert("Successfully registered!");
        }

        return (
            <div className="inner-container">
                <div className="header">
                    Register
                </div>
                <div className="box">

                    <div className="input-group">
                        <label htmlFor="username">Username</label>
                        <input
                            id="uname"
                            type="text"
                            name="username"
                            className="login-input"
                            placeholder="Username"
                            onChange={this
                                .onUsernameChange
                                .bind(this)}/>
                    </div>

                    <div className="input-group">
                        <label htmlFor="password">Password</label>
                        <input
                            id="pwd"
                            type="password"
                            name="password"
                            className="login-input"
                            placeholder="Password"
                            onChange={this
                                .onPasswordChange
                                .bind(this)}/>
                    </div>

                    <div className="input-group">
                        <label htmlFor="address">Address</label>
                        <input
                            id="addr"
                            type="text"
                            name="address"
                            className="login-input"
                            placeholder="Address"
                            onChange={this
                                .onAddressChange
                                .bind(this)}/>
                    </div>

                    <button
                        type="button"
                        className="login-btn"
                        onClick={this
                            .submitRegister
                            .bind(this)}>Register
                    </button>
                    <small className="danger-error">{this.state.errors !== "" && this.state.errors.errors.username?this.state.errors.errors.username.msg:""}</small>
                    <small className="danger-error">{this.state.errors !== "" && this.state.errors.errors.address?this.state.errors.errors.address.msg:""}</small>
                    <small className="danger-error">{this.state.errors !== "" && this.state.errors.errors.password?this.state.errors.errors.password.msg:""}</small>
                </div>
            </div>
        );
    }
}
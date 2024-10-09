import React from 'react';
import {withRouter} from 'react-router-dom';
import { message } from 'antd';
import "../css/register.css";
import {login, register} from "../services/userService";
import cookie from "react-cookies";

class RegisterView extends React.Component{

    constructor(props){
        super(props);
        this.state = {
            username : "",
            password : "",
            passwordAgain : "",
            userEmail: "",
            passwordEqual : true,
        }
    }

    usernameChange=(e) => {
        let username=e.target.value;
        this.setState({username: username})
    }

    handlePasswordEqual=(password,passwordAgain)=> {
        if(password===passwordAgain||passwordAgain.length===0) {
            this.setState({
                passwordEqual: true
            })
            return;
        }
        this.setState({
            passwordEqual: false
        })
    }

    passwordChange=(e)=>{
        let password=e.target.value;
        this.setState({password:password})
        this.handlePasswordEqual(password,this.state.passwordAgain)
    }

    passwordAgainChange=(e)=>{
        let passwordAgain = e.target.value
        this.setState({passwordAgain: passwordAgain})
        this.handlePasswordEqual(this.state.password, passwordAgain)
    }

    userEmailChange = (e) => {
        let userEmail = e.target.value
        this.setState({userEmail: userEmail})
    }

    rightEmail = (userEmail) => {
        if(userEmail == null) {
            return false;
        } else {
            if(userEmail.match(/^\w+@\w+\.\w+$/i)){
                return true;
            }else{
                return false;
            }

        }
    }

    handleRegister=()=>{
        if(this.state.username.length === 0) {
            message.error("请输入用户名！")
            return;
        }
        if(this.state.password.length === 0) {
            message.error("请输入密码！")
            return;
        }
        if(this.state.username.length < 6) {
            message.error("用户名不能小于6")
            return;
        }
        if(this.state.password.length < 6) {
            message.error("用户密码不能小于6")
            return;
        }
        if(this.state.passwordAgain.length===0) {
            message.error("请输入重复密码！")
            return;
        }
        if(!this.state.passwordEqual) {
            message.error("两次输入的密码不一致！")
            return;
        }
        if(!this.rightEmail(this.state.userEmail)) {
            message.error("Email格式存在问题，请重新输入")
            return;
        }
        register(
            this.state.username,
            this.state.password,
            this.state.userEmail
        ).then((res) => {
            if(res.status === "USER_ALL_OK") {
                message.success("注册成功")
                cookie.save("username", res.username);
                this.props.history.push({pathname: "/login"})
            } else if(res.status === "USER_ALREADY_EXIST") {
                message.error("该用户已经注册！")
            }else {
                message.error("请检查输入！");
            }
        })
    }

    render() {
        return(
            <div className= "login_body_reg">
                <div className="login_containerNew">
                    <h1 className="page_title">EBOOK Register</h1>
                    <div className="login_box">
                        <div className="login_inputText">
                            <img src={require("../assets/image/username.png")} alt="用户名" />
                            <input type="text" placeholder="username" id="username"
                                   value={this.state.username}
                                   onChange={this.usernameChange}
                            />
                        </div>
                        <div className="login_inputText">
                            <img src={require("../assets/image/passport.png")} alt="用户密码"/>
                            <input type="password1" placeholder="password" id="password1"
                                   value={this.state.password}
                                   onChange={this.passwordChange}
                            />
                        </div>
                        <div className="login_inputText">
                            <img src={require("../assets/image/passport.png")} alt="确认用户密码"/>
                            <input type="password2" placeholder="make sure" id="password2"
                                   value={this.state.passwordAgain}
                                   onChange={this.passwordAgainChange}
                            />
                        </div>
                        <div className="login_inputText">
                            <img src={require("../assets/image/username.png")} alt="输入您的邮箱"/>
                            <input type="userEmail" placeholder="userEmail" id="userEmail"
                                   value={this.state.userEmail}
                                   onChange={this.userEmailChange}
                            />
                        </div>
                    </div>
                    <div className="login_buttonBox">
                        <button onClick={this.handleRegister}>register</button>
                    </div>
                </div>
            </div>
        );
    }
}

export default withRouter(RegisterView);
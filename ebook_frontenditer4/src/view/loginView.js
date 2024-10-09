import React from 'react';
import {withRouter} from 'react-router-dom';
import "../css/login.css";
import { message } from 'antd';
import { login } from '../services/userService';

class LoginView extends React.Component{

    constructor(props){
        super(props);
        this.state = {
            username : "",
            password : ""
        }
    }



    usernameChange=(e) => {
        this.setState({
            username : e.target.value
        })
    }

    passwordChange=(e) => {
        this.setState({
            password : e.target.value
        })
    }

    runLogin=()=>{
        if(this.state.username.length === 0 && this.state.password.length === 0) {
            message.error("请输入用户名与密码");
            return;
        } else if (this.state.username.length === 0) {
            message.error("请输入用户名");
            return;
        } else if (this.state.password.length === 0) {
            message.error("请输入密码");
            return;
        }
        login(
            this.state.username,
            this.state.password
        ).then((res) => {
            // alert(res);
            if(res.status === "USER_ALL_OK") {
                message.success("登录成功")
                localStorage.setItem("uid", res.uid);
                localStorage.setItem("type", res.type);
                localStorage.setItem("username", res.username);
                if(res.type === 0) {
                    this.props.history.push("/home");
                } else if(res.type === 1){
                    this.props.history.push("/admin");
                } else {
                    message.error("您的账号已被封禁！");
                }
            } else if(res.status === "USER_ACCOUNT_ILLEGAL") {
                message.error("您的账号已经被封禁，请联系管理员！")
            }else {
                message.error("请检查输入！");
            }
        })
    };

    runRegister=()=>{
        this.props.history.push("/register");
    }

    render() {
        return(
            <div className= "login_body">
                <div className="login_container">
                    <h1 className="page_title">EBOOK登录</h1>
                    <div className="login_box">
                        <div className="login_inputText">
                            <img src={require("../assets/image/username.png")} alt="用户名" />
                            <input type="text" placeholder="用户名" id="username"
                                   value={this.state.username}
                                   onChange={this.usernameChange}
                            />
                        </div>
                        <div className="login_inputText">
                            <img src={require("../assets/image/passport.png")} alt="用户密码"/>
                            <input type="password" placeholder="用户密码" id="password"
                                   value={this.state.password}
                                   onChange={this.passwordChange}
                            />
                        </div>
                    </div>
                    <div className="login_buttonBox">
                        <button onClick={this.runLogin}>用户登录</button>
                        <button onClick={this.runRegister}>新用户注册</button>
                    </div>
                </div>
            </div>
        );
    }
}

export default withRouter(LoginView);
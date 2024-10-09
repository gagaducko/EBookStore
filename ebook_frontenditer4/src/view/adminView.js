import '../css/cartView.css'
import { Table, Button, message } from 'antd'
import { CloseCircleFilled, SearchOutlined} from '@ant-design/icons'
import React, { Component } from "react";
import { Row, Col } from 'antd';
import { Layout } from 'antd';
import { Head } from "../components/header";
import { NavBar_Admin } from "../components/navBar_Admin.js";
import {banUsers, getAllUsers, unBanUsers} from "../services/AdminServices";

const { Content } = Layout;


export class AdminView extends React.Component {
    constructor(props){
        super(props);
        this.state = {
            userInfo: "",
            // 设置表格
            columns: [
                {
                    title: "UserId",
                    dataIndex: "uid",
                    key: "uid",
                },
                {
                    title: "用户名",
                    dataIndex: "username",
                    key: "username"
                },
                {
                    title: "用户密码",
                    dataIndex: "password",
                    key: "password"
                },
                {
                    title: "用户类型",
                    dataIndex: "type",
                    key: "type"
                },
                {
                    title: "操作",
                    dataIndex: "operation",
                    key: "operation",
                    render: (state) => (
                        <Button
                            type="primary"
                        >
                            <SearchOutlined />禁用/解禁
                        </Button>
                    )
                }
            ],
        };

        this.getAllUserInfo();
        this.buildTable = this.buildTable.bind(this);

    }

    getAllUserInfo = () => {
        getAllUsers().then((res) => {
            this.setState({
                userInfo: res
            })
        })
    }

    banOrUnBanUsers = (record) => {
        let type = null
        switch (record.type) {
            case "普通用户" :
                type = 0;
                break;
            case "管理员" :
                type = 1;
                break;
            case "非法用户" :
                type = 2;
                break;
        }
        if(type === 0) {
            banUsers(record.uid).then((res) => {
            })
            window.location.reload();
        } else if(type === 2) {
            unBanUsers(record.uid).then((res) => {
            })
            window.location.reload();
        } else {
            // alert("this user cannot be banned")
            message.error("this user cannot be banned");
        }
    }

    typeKind = (a) => {
        switch (a) {
            case 0:
                return "普通用户"
            case 1:
                return "管理员"
            case 2:
                return "非法用户"
        }
    }

    buildTable() {
        if(this.state.userInfo.length) {
            const data = this.state.userInfo.map((el, idx) => ({
                key: idx,
                uid: el.uid,
                username: el.username,
                password: el.password,
                type: this.typeKind(el.type)
            }))
            return (
                <Table className="cart-table" dataSource={data} columns={this.state.columns} onRow={(record) => {
                    return {
                        onClick: () => {
                            this.banOrUnBanUsers(record);
                        }
                    }
                }}></Table>
            )
        } else {
            return(
                <p className="cart-info">暂未查询到用户哦</p>
            )
        }
    }


    render(){
        return(
            <div>
                <Layout>
                    <Head />
                    <Layout>
                        <Row>
                            <Col span={4}>
                                <NavBar_Admin current="/admin" />
                            </Col>
                            <Col span={20}>
                                <Layout style={{ padding: '0 24px 24px', margin: '23px 0'}}>
                                    <Content style={{ padding: 24, margin: 0, minHeight: 620, background: '#fff'}}>
                                        <div className="root">
                                            <header className="cart-header">
                                                <h3 className="cart-title">用户管理</h3>
                                                <p className="cart-subtitle">管理ebook的用户</p>
                                            </header>
                                            <main className="cart-container">
                                                {this.buildTable()}
                                            </main>
                                            <footer className="cart-footer">
                                                点击按钮，对用户进行禁用或解禁
                                            </footer>
                                        </div>
                                    </Content>
                                </Layout>
                            </Col>
                        </Row>
                    </Layout>
                </Layout>
            </div>
        );
    }
}

export default AdminView;
import '../css/cartView.css'
import '../css/BookShow.css'
import {Table, Button, message, Input, DatePicker, Space} from 'antd'
import React, { Component } from "react";
import { Row, Col } from 'antd';
import { Layout } from 'antd';
import { Head } from "../components/header";
import { NavBar_Admin } from "../components/navBar_Admin.js";
import { getUserHot } from "../services/AdminServices";

const { RangePicker } = DatePicker;
const { Content } = Layout;


export class AdminUserHotView extends React.Component {
    constructor(props){
        super(props);
        this.state = {
            bookInfo: "",
            // 设置表格
            columns: [
                {
                    title: "用户编号",
                    dataIndex: "uid",
                    key: "uid"
                },
                {
                    title: "用户购书数量",
                    dataIndex: "bookNum",
                    key: "bookNum"
                },
                {
                    title: "时间内购买金额",
                    dataIndex: "consuming",
                    key: "consuming"
                }
            ],
        };

        this.getAllUserHotInfo();
        this.buildTable = this.buildTable.bind(this);

    }

    getAllUserHotInfo = (time) => {
        getUserHot(time).then((res) => {
            this.setState({
                bookInfo: res
            }, () => {
                // alert(this.state.bookInfo);
            })
        })
    }




    buildTable() {
        if(this.state.bookInfo.length) {
            const data = this.state.bookInfo.map((el, idx) => ({
                key: idx,
                uid: el.uid,
                bookNum: el.bookNum,
                consuming: el.consuming
            }))
            return (
                <Table className="cart-table" dataSource={data} columns={this.state.columns}></Table>
            )
        } else {
            return(
                <p className="cart-info">请选择时间段~</p>
            )
        }
    }




    onChange = (val1, val2) => {
        // alert(val1);
        // alert(val2);//val2 is timestamp
        this.getAllUserHotInfo(val2.toString());
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
                                                <h3 className="cart-title">用户购买榜</h3>
                                                <p className="cart-subtitle">用户某段时间内的购买量</p>
                                            </header>
                                            <div>
                                                <Space direction="vertical" size={12}>
                                                    <RangePicker showTime
                                                                 onChange = {this.onChange}
                                                    />
                                                </Space>
                                            </div>
                                            <main className="cart-container">
                                                {this.buildTable()}
                                            </main>
                                            <footer className="cart-footer">
                                                用户购买榜
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

export default AdminUserHotView;
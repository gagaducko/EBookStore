import '../css/cartView.css'
import '../css/BookShow.css'
import {Table, Button, message, Input, DatePicker, Space} from 'antd'
import React, { Component } from "react";
import { Row, Col } from 'antd';
import { Layout } from 'antd';
import { Head } from "../components/header";
import { NavBar } from "../components/navBar.js";
import {getUserBuy} from "../services/userService";

const { RangePicker } = DatePicker;
const { Content } = Layout;


export class UserBuyView extends React.Component {
    constructor(props){
        super(props);
        this.state = {
            bookInfo: "",
            // 设置表格
            columns: [
                {
                    title: "书籍编号",
                    dataIndex: "bid",
                    key: "bid"
                },
                {
                    title: "封面",
                    dataIndex: "image",
                    key: "image",
                    render: image => (
                        <img src={image} className="cart-image"></img>
                    )
                },
                {
                    title: "书籍名称",
                    dataIndex: "bookname",
                    key: "bookname"
                },
                {
                    title: "该书购买数量",
                    dataIndex: "bookNum",
                    key: "bookNum"
                }
            ],
        };

        this.getAllUserHotInfo = this.getAllUserHotInfo.bind(this);
        this.buildTable = this.buildTable.bind(this);

    }

    getAllUserHotInfo = (uid, time) => {
        getUserBuy(uid, time).then((res) => {
            this.setState((prevState, props) => ({
                bookInfo: res
            }), function ()  {
                // alert(this.state.bookInfo.bookConsumingList[0].book.bookname)
                // alert(this.state.bookInfo)
            })
        })
    }




    buildTable() {
        if(this.state.bookInfo) {
            // alert("go")
            const data = this.state.bookInfo.bookConsumingList.map((el, idx) => ({
                key: idx,
                bid: el.book.bid,
                image: el.book.image,
                bookNum: el.consuming,
                bookname: el.book.bookname,
            }))
            return (
                <Table className="cart-table" dataSource={data} columns={this.state.columns}></Table>
            )
        } else {
            // alert("sad")
            return(
                <p className="cart-info">请选择时间段~</p>
            )
        }
    }




    onChange = (val1, val2) => {
        // alert(val1);
        // alert(val2);//val2 is timestamp
        this.getAllUserHotInfo(localStorage.getItem("uid"), val2.toString());
    }



    render(){
        return(
            <div>
                <Layout>
                    <Head />
                    <Layout>
                        <Row>
                            <Col span={4}>
                                <NavBar current="/admin" />
                            </Col>
                            <Col span={20}>
                                <Layout style={{ padding: '0 24px 24px', margin: '23px 0'}}>
                                    <Content style={{ padding: 24, margin: 0, minHeight: 620, background: '#fff'}}>
                                        <div className="root">
                                            <header className="cart-header">
                                                <h3 className="cart-title">您的购买统计</h3>
                                                <p className="cart-subtitle">某段时间内的购买量</p>
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
                                                用户购买统计
                                                <p className="cart-descnum">共<span className="cart-totalnum">{this.state.bookInfo.bookNum}</span>件商品</p>
                                                <p className="cart-totalmoney">合计：<span className="cart-totalnum">{this.state.bookInfo.consuming}</span>元</p>
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

export default UserBuyView;
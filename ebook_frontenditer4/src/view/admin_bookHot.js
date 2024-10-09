import '../css/cartView.css'
import '../css/BookShow.css'
import {Table, Button, message, Input, DatePicker, Space} from 'antd'
import React, { Component } from "react";
import { Row, Col } from 'antd';
import { Layout } from 'antd';
import { Head } from "../components/header";
import { NavBar_Admin } from "../components/navBar_Admin.js";
import { getBookHot } from "../services/AdminServices";

const { RangePicker } = DatePicker;
const { Content } = Layout;


export class AdminBookHotView extends React.Component {
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
                    title: "书名",
                    dataIndex: "bookname",
                    key: "bookname"
                },
                {
                    title: "作者",
                    dataIndex: "author",
                    key: "author"
                },
                {
                    title: "时间内销量",
                    dataIndex: "consuming",
                    key: "consuming"
                }
            ],
        };

        this.getAllBookInfo();
        this.buildTable = this.buildTable.bind(this);

    }

    getAllBookInfo = (time) => {
        getBookHot(time).then((res) => {
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
                bid: el.book.bid,
                image: el.book.image,
                bookname: el.book.bookname,
                author: el.book.author,
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
        this.getAllBookInfo(val2.toString());
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
                                                <h3 className="cart-title">图书热销榜</h3>
                                                <p className="cart-subtitle">书籍某段时间内的销量</p>
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
                                                图书热销榜
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

export default AdminBookHotView;
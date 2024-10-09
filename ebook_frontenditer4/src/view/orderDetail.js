import {Row, Col, Radio, Button, message, Table} from 'antd'
import '../css/detailShow.css'
import React, { Component } from "react";
import { Layout } from 'antd';
import { Head } from "../components/header";
import { NavBar } from "../components/navBar";

const { Content } = Layout;

export class OrderDetail extends React.Component {

    constructor(props){
        super(props);
        this.state = {
            // 设置表格
            columns: [
                {
                    title: "参考图",
                    dataIndex: "image",
                    key: "image",
                    render: image => (
                        <img src={image} className="cart-image"></img>
                    )
                },
                {
                    title: "书名",
                    dataIndex: "name",
                    key: "name"
                },
                {
                    title: "购时价",
                    dataIndex: "price",
                    key: "price"
                },
                {
                    title: "数量",
                    dataIndex: "number",
                    key: "number"
                },
                {
                    title: "小计",
                    dataIndex: "total",
                    key: "total"
                }
            ],
            orderData: "",
            bookData: "",
            count: 2,
            total: 0
        };

        // alert(this.props.location.state.orderItem)
        this.TotalMoney = this.TotalMoney.bind(this)
        // this.buildTable = this.buildTable.bind(this)
        this.onBack = this.onBack.bind(this)
    }
    // 计算所有商品的总额
    TotalMoney(){
        let x = 0;
        for (var i = 0; i < this.state.orderData.length; i++) {
            x += this.state.orderData[i].bookPrice * this.state.orderData[i].bookNum;
        }
        return x;
    }
    // 创建表格
    buildTable(){
        if(this.state.count > 0) {
            let countTemp = this.state.count;
            this.setState({
                orderData: this.props.location.state.orderItem,
                count: countTemp - 1
            }, () => {
                // alert(this.state.orderData)
            })
        }
        if(this.state.orderData.length){
            // alert(this.state.orderData.length)
            // 说明购物车里有东西
            const data = this.state.orderData.map((el, idx) => ({
                key: idx,
                image: el.book.image,
                name: el.book.bookname,
                price: el.bookPrice,
                number: el.bookNum,
                total: el.bookPrice * el.bookNum,
            }))
            return (
                <Table className="cart-table" dataSource={data} columns={this.state.columns}></Table>
            )
        }else{
            return (
                <p className="cart-info">订单读取出错哦~请刷新</p>
            )
        }
    }
    // totalmoney get
    componentDidMount(){
        this.TotalMoney()
    }

    // 点击继续购物按钮，页面跳转到商品展览页面
    onBack(){
        // 页面跳转
        this.props.history.push({ pathname: "/order" })
    }
    render(){
        return(
            <div>
                <Layout>
                    <Head />
                    <Layout>
                        <Row>
                            <Col span={4}>
                                <NavBar current="/book" />
                            </Col>
                            <Col span={20}>
                                <Layout style={{ padding: '0 24px 24px', margin: '23px 0'}}>
                                    <Content style={{ padding: 24, margin: 0, minHeight: 620, background: '#fff'}}>
                                        <div className="root">
                                            <header className="cart-header">
                                                <h3 className="cart-title">所有订单详情</h3>
                                                <p className="cart-subtitle">web-EBook管理员</p>
                                            </header>
                                            <main className="cart-container">
                                                {this.buildTable()}
                                            </main>
                                            <footer className="cart-footer">
                                                <p className="cart-goback" onClick={this.onBack}>返回全部订单</p>
                                                <p className="cart-descnum">此单共<span className="cart-totalnum">{this.state.orderData.length}</span>种商品</p>
                                                <p className="cart-totalmoney">此单合计消费：<span className="cart-totalnum">{this.TotalMoney()}</span>元</p>
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
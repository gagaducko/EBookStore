import React, { Component } from "react";
import {Row, Col, Button, Table, Space, Input} from 'antd';
import { Layout } from 'antd';
import { SearchOutlined } from '@ant-design/icons';
import { DatePicker } from 'antd';
import { Head } from "../components/header";
import { NavBar } from "../components/navBar";
import {userFindOrderByBookName, userGetTimeOrder, userOrder} from "../services/orderService";
import {getAOrder, getOrderBookName, getTimeOrder} from "../services/AdminServices";

const { Content } = Layout;
const { RangePicker } = DatePicker;


export class OrderView extends React.Component {
    constructor(props){
        super(props);
        this.state = {
            // 设置表格
            columns: [
                {
                    title: "订单号",
                    dataIndex: "oid",
                    key: "oid",
                },
                {
                    title: "用户号",
                    dataIndex: "uid",
                    key: "uid"
                },
                {
                    title: "购买时间",
                    dataIndex: "time",
                    key: "time"
                },
                {
                    title: "操作",
                    dataIndex: "operation",
                    key: "operation",
                    render: () => (
                        <Button type="primary">
                            <SearchOutlined />详情
                        </Button>
                    )
                }
            ],
            orderData: "",
            recentOid: "",
            orderItem: ""
        };

        this.getOrderInfo(localStorage.getItem("uid"));

        this.buildTable = this.buildTable.bind(this)
        this.onChange = this.onChange.bind(this)
        this.onBack = this.onBack.bind(this)
    }

    getOrderInfo = (uid) => {
        userOrder(uid).then((res) => {
            this.setState((prevState, props) => ({
                orderData: res
            }), function ()  {
            })
        })
    }

    OrderDetail = (oid) => {
        // alert(oid);
        getAOrder(oid).then((res) => {
            // alert(res.length)
            this.setState({
                    orderItem: res
                },
                // 第二个参数：回调函数，用改变后的state值do something
                () => {
                    this.props.history.push({
                        pathname: "/orderDe",
                        state: {
                            orderItem: this.state.orderItem
                        }
                    })
                });
        })
    }


    // 点击继续购物按钮，页面跳转到商品展览页面
    onBack(){
        // 页面跳转
        this.props.history.push({ pathname: "/home" })
    }


    onSearch = (val) => {
        // alert(val)
        userFindOrderByBookName(localStorage.getItem("uid"), val.toString()).then((res) => {
            this.setState({
                orderData: res
            })
        })
    }

    onChange = (val1, val2) => {
        // alert(localStorage.getItem("uid"))
        userGetTimeOrder(localStorage.getItem("uid"), val2.toString()).then((res) => {
            this.setState({
                orderData: res
            })
        })
    }


    // 创建表格
    buildTable(){
        if(this.state.orderData.length){
            // 说明购物车里有东西
            const data = this.state.orderData.map((el, idx) => ({
                key: idx,
                oid: el.oid,
                uid: el.uid,
                time: el.createTime,
                operation: el
            }))
            return (
                <Table className="cart-table" dataSource={data} columns={this.state.columns} onRow={(record) => {
                    return {
                        onClick: () => {
                            // alert(record.oid)
                            this.OrderDetail(record.oid);
                        }
                    }
                }}></Table>
            )
        }else{
            return (
                <p className="cart-info">你还没有下过订单哦~</p>
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
                                <NavBar current="/book" />
                            </Col>
                            <Col span={20}>
                                <Layout style={{ padding: '0 24px 24px', margin: '23px 0'}}>
                                    <Content style={{ padding: 24, margin: 0, minHeight: 620, background: '#fff'}}>
                                        <div className="root">
                                            <header className="cart-header">
                                                <h3 className="cart-title">我的订单</h3>
                                                <p className="cart-subtitle">感谢您使用web-EBook哦!</p>
                                            </header>
                                            <div>
                                                <Space direction="vertical" size={12}>
                                                    <RangePicker showTime
                                                                 onChange = {this.onChange}
                                                    />
                                                </Space>
                                            </div>
                                            <div className="bosh-search-bookMan">
                                                <Input.Search
                                                    placeholder="输入书籍名称查询订单"
                                                    enterButton="Search"
                                                    size="large"
                                                    className="bosh-search"
                                                    onSearch={this.onSearch}
                                                ></Input.Search>
                                            </div>
                                            <main className="cart-container">
                                                {this.buildTable()}
                                            </main>
                                            <footer className="cart-footer">
                                                <p className="cart-goback" onClick={this.onBack}>继续购物</p>
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
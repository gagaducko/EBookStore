import '../css/cartView.css'
import '../css/BookShow.css'
import {Table, Button, message, Input} from 'antd'
import { DatePicker, Space } from 'antd';
import { CloseCircleFilled, SearchOutlined} from '@ant-design/icons'
import React, { Component } from "react";
import { Row, Col } from 'antd';
import { Layout } from 'antd';
import { Head } from "../components/header";
import { NavBar_Admin } from "../components/navBar_Admin.js";
import {
    addBook,
    banUsers,
    changeBook,
    deleteBookByIds,
    getAllBooks, getAllOrder,
    getAllUsers, getAOrder, getBook, getOrderBookName, getTimeOrder,
    unBanUsers
} from "../services/AdminServices";
const { RangePicker } = DatePicker;
const { Content } = Layout;


export class AdminOrderView extends React.Component {
    constructor(props){
        super(props);
        this.state = {
            orderInfo: "",
            orderItem: "",
            // 设置表格
            columns: [
                {
                    title: "订单编号",
                    dataIndex: "oid",
                    key: "oid"
                },
                {
                    title: "所属用户",
                    dataIndex: "uid",
                    key: "uid",
                },
                {
                    title: "购买时间",
                    dataIndex: "createTime",
                    key: "createTime"
                },
                {
                    title: "操作",
                    dataIndex: "operation",
                    key: "operation",
                    render: (state) => (
                        <Button
                            type="primary"
                        >
                            <SearchOutlined />查看订单详细信息
                        </Button>
                    )
                }
            ],
        };

        this.getAllOrderInfo();
        this.buildTable = this.buildTable.bind(this);
    }

    getAllOrderInfo = () => {
        getAllOrder().then((res) => {
            this.setState({
                orderInfo: res
            })
        })
    }

    getTheOrder = (oid) => {
        // alert(oid);
        getAOrder(oid).then((res) => {
            // alert(res.length)
            this.setState({
                orderItem: res
            },
                // 第二个参数：回调函数，用改变后的state值do something
                () => {
                this.props.history.push({
                    pathname: "/adminOrderDe",
                    state: {
                        orderItem: this.state.orderItem
                    }
                })
            });
        })
    }

    buildTable() {
        if(this.state.orderInfo.length) {
            const data = this.state.orderInfo.map((el, idx) => ({
                key: idx,
                oid: el.oid,
                uid: el.uid,
                createTime: el.createTime
            }))
            return (
                <Table className="cart-table" dataSource={data} columns={this.state.columns} onRow={(record) => {
                    return {
                        onClick: () => {
                            // alert(record.oid);
                            this.getTheOrder(record.oid);
                        }
                    }
                }}></Table>
            )
        } else {
            return(
                <p className="cart-info">暂未查询到订单哦</p>
            )
        }
    }




    onSearch = (val) => {
        // alert(val)

        getOrderBookName(val.toString()).then((res) => {
            this.setState({
                orderInfo: res
            })
        })
    }

    onChange = (val1, val2) => {
        // alert(val1);
        // alert(val2);//val2 is timestamp
        getTimeOrder(val2.toString()).then((res) => {
            this.setState({
                orderInfo: res
            })
        })
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
                                                <h3 className="cart-title">订单管理</h3>
                                                <p className="cart-subtitle">管理ebook的订单</p>
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
                                                订单管理用于查看所有订单，需要进入订单请点击订单
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

export default AdminOrderView;
import { connect } from 'react-redux'
import '../css/cartView.css'
import { Table, Button, message } from 'antd'
import { CloseCircleFilled } from '@ant-design/icons'
import { RemoveBook, ClearBook } from '../components/shoppingActions'
import React, { Component } from "react";
import { Row, Col } from 'antd';
import { Layout } from 'antd';
import { Head } from "../components/header";
import { NavBar } from "../components/navBar";
import {cartToOrder, showCart} from "../services/cartService";

const { Content } = Layout;


export class CartView extends React.Component {
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
                    title: "单价",
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
                },
                {
                    title: "操作",
                    dataIndex: "operation",
                    key: "operation",
                    render: (state) => (
                        <Button
                            type="primary"
                            onClick={() => this.onCloseClick(state)}
                        >
                            <CloseCircleFilled />删除
                        </Button>
                    )
                }
            ],
            cartData: "",
            bookData: "",
            total: 0
        };


        this.getCartInfo();

        this.TotalMoney = this.TotalMoney.bind(this)
        this.buildTable = this.buildTable.bind(this)
        this.onCloseClick = this.onCloseClick.bind(this)
        this.onSubmit = this.onSubmit.bind(this)
        this.onBack = this.onBack.bind(this)
    }

    getCartInfo = () => {
        showCart(localStorage.getItem("uid")).then((res) => {
            this.setState((prevState, props) => ({
                cartData: res
            }), function ()  {

            })
        })
    }

    // 计算所有商品的总额
    TotalMoney(){
        let x = 0;
        for (var i = 0; i < this.state.cartData.length; i++) {
            x += this.state.cartData[i].book.price * this.state.cartData[i].cartItem.bookNum;
        }
        return x;
    }

    // 点击删除按钮时提示删除商品成功
    onCloseClick(state){
        // this.TotalMoney()
        // // 点击删除按钮之后删除相应的东西
        // this.props.RemoveBook(state)
        // // 提示显示删除成功
        // message.success("商品删除成功")
    }
    // 创建表格
    buildTable(){
        if(this.state.cartData.length){
            // 说明购物车里有东西
            const data = this.state.cartData.map((el, idx) => ({
                key: idx,
                image: el.book.image,
                name: el.book.bookname,
                price: el.book.price,
                number: el.cartItem.bookNum,
                total: (el.book.price * el.cartItem.bookNum).toFixed(2),
                operation: el
            }))
            return (
                <Table className="cart-table" dataSource={data} columns={this.state.columns}></Table>
            )
        }else{
            return (
                <p className="cart-info">你的购物车里还没有书籍哦</p>
            )
        }
    }
    // 点击结算之后进行结算提示
    onSubmit(){
        cartToOrder(window.localStorage.getItem("uid")).then((res) => {
            message.success("结算成功，花费了"+this.TotalMoney()+"元")
            this.props.history.push({pathname: "/order"})
        })
    }


    componentDidMount(){
        this.TotalMoney()
    }


    // 点击继续购物按钮，页面跳转到商品展览页面
    onBack(){
        // 页面跳转
        this.props.history.push({ pathname: "/home" })
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
                                                <h3 className="cart-title">我的购物车</h3>
                                                <p className="cart-subtitle">感谢您使用web-EBook哦!</p>
                                            </header>
                                            <main className="cart-container">
                                                {this.buildTable()}
                                            </main>
                                            <footer className="cart-footer">
                                                <p className="cart-goback" onClick={this.onBack}>继续购物</p>
                                                <p className="cart-descnum">共<span className="cart-totalnum">{this.state.cartData.length}</span>种商品</p>
                                                <p className="cart-totalmoney">合计：<span className="cart-totalnum">{this.TotalMoney().toFixed(2)}</span>元</p>
                                                <p className="cart-submit" onClick={this.onSubmit}>结算</p>
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

// 将shoplist绑定到props
function mapStateToProps(state){
    return {
        shoplist: state.shoplist
    }
}
// 将方法绑定到props
function mapDispatchToProps(dispatch){
    return {
        RemoveBook: (data) => dispatch(RemoveBook(data)),
        ClearBook: (data) => dispatch(ClearBook(data))
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(CartView)
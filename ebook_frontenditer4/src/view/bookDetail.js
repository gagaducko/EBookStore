import { Row, Col, Radio, Button, message } from 'antd'
import '../css/detailShow.css'
import React, { Component } from "react";
import { Layout } from 'antd';
import { Head } from "../components/header";
import { NavBar } from "../components/navBar";
import {addToCart, getBookById} from "../services/bookService";

const { Content } = Layout;

export class BookInfo extends React.Component {
    constructor(props){
        super(props);
        this.state = {
            size: "",
            color: "",
            bookData: "",
        }

        let href = window.location.href;
        let bid = "";
        for (let i = href.length - 1; href[i] >= '0' && href[i] <= '9'; i--){
            bid +=href[i];
        }
        bid = bid.split("").reverse().join("");
        //根据bid，通过ajaxh获取书的详细信息
        getBookById(bid).then((res) => {
            this.setState({
                bookData: res
            }, () => {

            })
        })

        this.goBack = this.goBack.bind(this);
    }

    getType() {
        switch (this.state.bookData.type) {
            case 1:
                return "畅销书籍"
                break;
            case 2:
                return "人文历史"
                break;
            case 3:
                return "工具书类"
                break;
            case 4:
                return "自然科学"
                break;
            case 5:
                return "社会科学"
                break;
        }
    }

    // 返回商品展览页面
    goBack(){
        this.props.history.push({ pathname: "/home" })
    }

    //加入购物车
    addCart = () => {
        addToCart(window.localStorage.getItem("uid"), this.state.bookData.bid).then((res) => {
            message.success("添加成功！请及时结算")
            this.props.history.push({ pathname: "/cart"});
        })
    }


    render(){
        return (
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
                                            <Row className="detail-container">
                                                <Col span={12} className="detail-all_height, detail-left_page">
                                                    <img src={this.state.bookData.image} className="detail-info_image"></img>
                                                </Col>
                                                <Col span={12} className="detail-all_height">
                                                    <h3 className="detail-title">{this.state.bookData.bookname}</h3>
                                                    <p className="detail-desc">作者：{this.state.bookData.author}</p>
                                                    <p className="detail-desc">类型：{this.getType()}</p>
                                                    <p className="detail-price">版号：{this.state.bookData.isbn}</p>
                                                    <p className="detail-price">剩余库存：{this.state.bookData.inventory}</p>
                                                    <div className="detail-total">
                                                        <p className="detail-total_desc">简介：{this.state.bookData.description}</p>
                                                        <h3 className="detail-total_money">{this.state.bookData.price}元</h3>
                                                    </div>
                                                    <div className="detail-buttonGrop">
                                                        <Button type="primary" size="large" className="detail-button" onClick={this.addCart}>加入购物车</Button>
                                                        <Button type="link" onClick={this.goBack}>返回首页</Button>
                                                    </div>
                                                </Col>
                                            </Row>
                                        </div>
                                    </Content>
                                </Layout>
                            </Col>
                        </Row>
                    </Layout>
                </Layout>
            </div>
        )
    }
}



export default BookInfo;
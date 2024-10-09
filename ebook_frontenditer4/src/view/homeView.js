import React, { Component } from "react";
import { Row, Col } from 'antd';
import { Layout } from 'antd';
import { Head } from "../components/header";
import { NavBar } from "../components/navBar";
import { BookShow } from "../components/bookShow";

const { Content } = Layout;

const bookData = [];

export default class HomeView extends Component {
    constructor(props) {
        super(props);
        this.state = {
            checkLogin: false,
            bookData:bookData
        }
    }

    render() {
        if(localStorage.getItem("uid") == null) { }
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
                                        <BookShow bookData = {this.state.bookData}/>
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
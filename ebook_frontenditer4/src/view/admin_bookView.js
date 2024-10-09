import '../css/cartView.css'
import '../css/BookShow.css'
import {Table, Button, message, Input} from 'antd'
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
    getAllBooks,
    getAllUsers, getBook,
} from "../services/AdminServices";
import CollectionCreateForm from "../components/form";
import DeleteForm from "../components/form_del";
import CreateForm from "../components/form_add";

const { Content } = Layout;


export class AdminBookView extends React.Component {
    constructor(props){
        super(props);
        this.state = {
            bookInfo: "",
            visible:false,
            visible_del: false,
            visible_add: false,
            currentDetailData: "", // 当前需要传递给子组件的数据，用于显示form表单初始值
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
                    title: "ISBN",
                    dataIndex: "isbn",
                    key: "isbn"
                },
                {
                    title: "库存量",
                    dataIndex: "inventory",
                    key: "inventory"
                },
                {
                    title: "价格",
                    dataIndex: "price",
                    key: "price"
                },
                {
                    title: "操作",
                    dataIndex: "operation",
                    key: "operation",
                    render: (state) => (
                        <Button
                            type="primary"
                        >
                            <SearchOutlined />修改书籍信息
                        </Button>
                    )
                }
            ],
        };

        this.getAllBookInfo();
        this.buildTable = this.buildTable.bind(this);

    }

    getAllBookInfo = () => {
        getAllBooks().then((res) => {
            this.setState({
                bookInfo: res
            })
        })
    }

    onCreate_add = (values) => {
        addBook(values).then()
        this.changeVisible_add(false);
        window.location.reload();
    }

    onCreate_del = (values) => {
        deleteBookByIds(values.bid).then()
        this.changeVisible_del(false);
        window.location.reload();
    }



    buildTable() {
        if(this.state.bookInfo.length) {
            const data = this.state.bookInfo.map((el, idx) => ({
                key: el.bid,
                bid: el.bid,
                image: el.image,
                bookname: el.bookname,
                author: el.author,
                isbn: el.isbn,
                type: el.type,
                description: el.description,
                inventory: el.inventory,
                price: el.price
            }))
            return (
                <Table className="cart-table" dataSource={data} columns={this.state.columns} onRow={(record) => {
                    return {
                        onClick: () => {
                            this.changeVisible(true, record);
                        }
                    }
                }}></Table>
            )
        } else {
            return(
                <p className="cart-info">暂未查询到书籍哦</p>
            )
        }
    }

    // 数据修改
    onCreate = values => {
        // console.log('form接收数据: ', values);
        changeBook(values).then()
        this.changeVisible(false);
        window.location.reload();
    };

    getTheBookData = (record) => {
        const data = {
            bid: record.key,
            bookname: record.bookname,
            image: record.image,
            author: record.author,
            description: record.description,
            isbn: record.isbn,
            inventory: record.inventory,
            price: record.price,
            type: record.type
        }
        // alert(data.isbn)
        return data;
    }

    addABook =  () => {
        this.changeVisible_add(true);

    }

    onSearch = (val) => {
        // alert(val)
        getBook(val).then((res) => {
            this.setState({
                bookInfo: res
            })
        })
    }

    deleteABook = () => {
        this.changeVisible_del(true);
    }

    // 弹框显示状态、及当前需要展示的数据赋值
    changeVisible = (status, record) =>{
        this.setState({
            visible:status,
        })
        if(record != undefined){
            this.setState({
                currentDetailData: this.getTheBookData(record)
            })
        }
    }

    // 弹框显示状态、及当前需要展示的数据赋值
    changeVisible_del = (status) =>{
        this.setState({
            visible_del:status,
        })
    }

    changeVisible_add = (status) =>{
        this.setState({
            visible_add:status,
        })
    }


    render(){
        return(
            <div>

                <div>
                    <div style={{padding:'20px'}}>
                    </div>
                    <CollectionCreateForm
                        visible={this.state.visible}
                        submitMap={this.onCreate}
                        onCancel={() => {
                            this.changeVisible(false);
                        }}
                        currentDetailData={this.state.currentDetailData}
                    />
                </div>

                <div>
                    <div style={{padding:'20px'}}>
                    </div>
                    <CreateForm
                        visible={this.state.visible_add}
                        submitMap={this.onCreate_add}
                        onCancel={() => {
                            this.changeVisible_add(false);
                        }}
                        currentDetailData = {false}
                    />
                </div>

                <div>
                    <div style={{padding:'20px'}}>
                    </div>
                    <DeleteForm
                        visible={this.state.visible_del}
                        submitMap={this.onCreate_del}
                        onCancel={() => {
                            this.changeVisible_del(false);
                        }}
                        currentDetailData = {false}
                    />
                </div>

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
                                                <h3 className="cart-title">书籍管理</h3>
                                                <p className="cart-subtitle">管理ebook的书籍</p>
                                            </header>
                                            <div className="bosh-search-bookMan">
                                                <Input.Search
                                                placeholder="input search text"
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
                                                点击按钮，添加/删除书籍
                                                &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                                                &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                                                &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                                                &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                                                &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                                                &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                                                &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                                                &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                                                &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                                                &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                                                &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                                                &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                                                &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                                                &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                                                &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                                                &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                                                &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                                                &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                                                &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                                                &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                                                &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                                                &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                                                <p className="cart-submit" onClick={this.addABook}>添加书籍</p>
                                                &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                                                &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                                                &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                                                &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                                                &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                                                <p className="cart-submit" onClick={this.deleteABook}>删除书籍</p>
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

export default AdminBookView;
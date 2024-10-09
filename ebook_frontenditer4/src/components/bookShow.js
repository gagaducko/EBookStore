import React  from "react";
import '../css/BookShow.css'
import BookCard from './bookCard'
import { Input, Pagination } from 'antd'
import {getAllBooks, getBook, getTest} from "../services/AdminServices";


export class BookShow extends React.Component {
    constructor(props){
        super(props)
        this.state = {
            bookData: [],
            list: [],
            page: 1
        };
        //请求数据
        this.getAllBookInfo();
        // this.buildPage = this.buildPage.bind(this)
        this.onSearch = this.onSearch.bind(this)
    }

    //get all book info
    getAllBookInfo = () => {
//        getTest().then((res) => {
//            console.log(res);
//        }, () => {
//        })
//        getAllBooks().then((res) => {
//            this.setState({
//                bookData: res
//            }, () => {
//            })
//        })
    }


    // 点击搜索按钮会进行数据的筛选
    onSearch(val){
    alert(1);
       getTest().then((res) => {
                            console.log(res);
                        }, () => {

                        })

    }

    render = () => {
        return (
            <div className="bosh-root">
                <Input.Search
                    placeholder="input search text"
                    enterButton="Search"
                    size="large"
                    className="bosh-search"
                    onSearch={this.onSearch}
                ></Input.Search>
                <div className="bosh-container">
                    {
                        this.state.bookData.map(function (row, rowidx) {
                            // alert(this.state.bookData[rowidx].bookname)
                            return (<BookCard bookData={this.state.bookData[rowidx]}/>)
                        }, this)
                    }
                </div>
                <footer className="bosh-footer">
                    <Pagination
                    defaultCurrent={1}
                    ></Pagination>
                </footer>
            </div>
        )
    }
}

export default BookShow;
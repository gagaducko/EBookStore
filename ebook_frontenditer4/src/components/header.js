import React  from "react";
import 'antd/dist/antd.min.css';
import { Layout } from 'antd';
import { Link } from "react-router-dom";
import "../css/com_headNav.css"
const { Header } = Layout;

export class Head extends React.Component {
    constructor(props) {
        super(props);

    }

    render() {
        return(
            <Layout>
                <Header className="header">
                    <div className="navBar">
                        <Link to="/home" className="title">
                            <img src={require("../assets/image/title.png")} alt=""></img>
                        </Link>
                    </div>
                </Header>
            </Layout>
        );
    }
}

export default Head;
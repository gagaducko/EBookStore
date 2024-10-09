import React from "react";
import "../css/com_headNav.css";
import 'antd/dist/antd.min.css';
import { Layout, Menu} from 'antd';
import { Link } from "react-router-dom";
import { HomeOutlined,TeamOutlined, LaptopOutlined, AppstoreOutlined, ToolOutlined} from '@ant-design/icons';
const Sider = Layout;

export class NavBar extends React.Component {
    constructor(props) {
        super(props);
        this.state={
            isOpen: false,
            theme: "dark"
        };
    }
    render() {
        const isOpen = this.props.isOpen;
        let defaultOpenArray = [];
        isOpen? defaultOpenArray = ['sub1']:defaultOpenArray = [];
        return(
            <Sider  className="site-layout-background" id="siderNav">
                    <Menu mode="inline"
                        defaultSelectedKeys={['book']}
                        defaultOpenKeys={defaultOpenArray}
                        selectedKeys={[this.props.current]}
                        theme="dark"
                        id="navBarMenu"
                    >
                    <Menu.Item key="book" icon={<LaptopOutlined />}>
                            <Link to="/home">商品名录</Link>
                    </Menu.Item>
                    <Menu.Item key="cart" icon={<HomeOutlined />}>
                        <Link to="/cart">购物车</Link>
                    </Menu.Item>
                    <Menu.Item key="order" icon={<HomeOutlined />}>
                        <Link to="/order">我的订单</Link>
                    </Menu.Item>
                    <Menu.Item key="getUserBuy" icon={<HomeOutlined />}>
                        <Link to="/getUserBuy">购买统计</Link>
                    </Menu.Item>
                    <Menu.Item key="class" icon={<TeamOutlined />}>
                        <Link to="/">退出登录</Link>
                    </Menu.Item>
                </Menu>
            </Sider>
        );
    }
}


export default NavBar;
import React from "react";
import "../css/com_headNav.css";
import 'antd/dist/antd.min.css';
import { Layout, Menu} from 'antd';
import { Link } from "react-router-dom";
import { HomeOutlined,TeamOutlined, LaptopOutlined, AppstoreOutlined, ToolOutlined} from '@ant-design/icons';
const { SubMenu } = Menu;
const Sider = Layout;

export class NavBar_Admin extends React.Component {
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
                      defaultSelectedKeys={['admin']}
                      defaultOpenKeys={defaultOpenArray}
                      selectedKeys={[this.props.current]}
                      theme="dark"
                      id="navBarMenu"
                >
                    <Menu.Item key="UserManagement" icon={<HomeOutlined />}>
                        <Link to="/admin">用户管理</Link>
                    </Menu.Item>
                    <Menu.Item key="cart" icon={<HomeOutlined />}>
                        <Link to="/adminBook">书籍管理</Link>
                    </Menu.Item>
                    <Menu.Item key="order" icon={<HomeOutlined />}>
                        <Link to="/adminOrder">订单管理</Link>
                    </Menu.Item>
                    <SubMenu key="class" icon={<LaptopOutlined />} title="统计">
                        <Menu.Item key="adminBookHot">
                            <Link to="/adminBookHot">热消榜</Link>
                        </Menu.Item>
                        <Menu.Item key="adminSoldHot">
                            <Link to="/adminSoldHot">畅销榜</Link>
                        </Menu.Item>
                    </SubMenu>
                </Menu>
            </Sider>
        );
    }
}

export default NavBar_Admin;
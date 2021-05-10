import { Menu } from 'antd';
import { Link } from 'react-router-dom';
import { useState } from 'react';
import { ROUTERS } from '../../constants/router';
import logo from '../../img/hgny.png'

const { SubMenu } = Menu;
export default function MenuAdmin() {
    const [current, setCurrent] = useState();
    const handleClick = e => {
        setCurrent(e.key)
    };
    return (
        <Menu onClick={handleClick} selectedKeys={[current]} mode="horizontal">
            <Menu.Item key="setting:8"><Link to={ROUTERS.HOME}><img width='140px' height='30px' src={logo} /></Link></Menu.Item>
            <SubMenu key="shoe" title="Quản Lý Giày">
                <Menu.Item key="setting:1"><Link to={ROUTERS.READ_PRODUCT}>Xem/Sửa Giày</Link></Menu.Item>
                <Menu.Item key="setting:2"><Link to={ROUTERS.ADD_PRODUCT}>Thêm Giày</Link></Menu.Item>
                <SubMenu key="color" title="Quản Lý Màu">
                    <Menu.Item key="setting:3"><Link to={ROUTERS.READ_COLOR}>Xem/Sửa Màu</Link></Menu.Item>
                    <Menu.Item key="setting:4"><Link to={ROUTERS.ADD_COLOR}>Thêm Màu</Link></Menu.Item>
                </SubMenu>
                <SubMenu key="size" title="Quản Lý Size">
                    <Menu.Item key="setting:5"><Link to={ROUTERS.READ_SIZE}>Xem/Sửa Size</Link></Menu.Item>
                    <Menu.Item key="setting:6"><Link to={ROUTERS.ADD_SIZE}>Thêm Size</Link></Menu.Item>
                </SubMenu>
                <SubMenu key="type" title="Quản Lý Kiểu Giày">
                    <Menu.Item key="setting:11"><Link to={ROUTERS.READ_TYPE}>Xem/Sửa Kiểu Giày</Link></Menu.Item>
                    <Menu.Item key="setting:12"><Link to={ROUTERS.ADD_TYPE}>Thêm Kiểu Giày</Link></Menu.Item>
                </SubMenu>
            </SubMenu>
            <Menu.Item key="setting:7"><Link to={ROUTERS.READ_ORDER}>Quản Lý Hóa Đơn</Link></Menu.Item>
            <Menu.Item key="setting:9"><Link to={ROUTERS.READ_USER}>Quản Lý Người Dùng</Link></Menu.Item>
            <Menu.Item key="setting:10"><Link to={ROUTERS.STATISTIC}>Quản Lý Thống Kê</Link></Menu.Item>
            <SubMenu key="sales" title="Quản Lý Khuyến Mãi">
                <Menu.Item key="addsale"><Link to={ROUTERS.ADD_SALE}>Thêm Khuyến Mãi</Link></Menu.Item>
                <Menu.Item key="editsale"><Link to={ROUTERS.READ_SALE}>Xem/Sửa Khuyến Mãi</Link></Menu.Item>
            </SubMenu>
            <SubMenu key="banner" title="Quản Lý Banner">
                <Menu.Item key="addbanner"><Link to={ROUTERS.ADD_BANNER}>Thêm Banner</Link></Menu.Item>
                <Menu.Item key="editbanner"><Link to={ROUTERS.READ_BANNER}>Xem/Sửa Banner</Link></Menu.Item>
            </SubMenu>
            <SubMenu key="news" title="Quản Lý Tin Tức">
                <Menu.Item key="addnews"><Link to={ROUTERS.ADD_NEWS}>Thêm Tin Tức</Link></Menu.Item>
                <Menu.Item key="editnews"><Link to={ROUTERS.READ_NEWS}>Xem/Sửa Tin Tức</Link></Menu.Item>
            </SubMenu>
        </Menu>
    )
}
import React, { useState, useEffect } from 'react';
import LeftMenu from '../Header/Components/LeftMenu'
import RightMenu from '../Header/Components/RightMenu'
import { Drawer, Button, Layout } from 'antd';
import { ROUTERS } from '../../constants/router'
import { MenuOutlined } from "@ant-design/icons";
import { NavLink } from 'react-router-dom';
import { useLocation } from "react-router-dom";
import ProductCart from '../../components/Cart'

import logo from '../../img/hgny.png'
import './style.css'

function Header() {

	const [visible, setVisible] = useState(false);

	const showDrawer = () => {
		setVisible(!visible);
	};




	const { pathname: location } = useLocation();
	useEffect(() => {
		setVisible(false);
	}, [location]);

	return (
		<nav className="navbar">
			{/* <Layout> */}

			<Layout.Header className="nav-header">
				<div className="logo">
					<NavLink className="logoIn" to={ROUTERS.HOME}><img src={logo} className="nav-logo" alt="Logo" /></NavLink>
				</div>
				<div className="navbar-menu">
					<div className="leftMenu">
						<LeftMenu mode={"horizontal"} />
					</div>

					<Button className="menuButton" type="text" onClick={showDrawer}>
						<MenuOutlined />
					</Button>
					<ProductCart />

					<div className="rightMenu">
						<RightMenu mode={"horizontal"} />
					</div>



					<Drawer
						title={<img src={logo} className="nav-logo" alt="Logo" />}
						placement="right"
						closable={true}
						onClose={showDrawer}
						visible={visible}
						style={{ zIndex: 99999 }}
					>
						<LeftMenu mode={"inline"} />
						<RightMenu mode={"inline"} />
					</Drawer>
				</div>


			</Layout.Header>
			{/* </Layout> */}
		</nav>
	);
}

export default Header;
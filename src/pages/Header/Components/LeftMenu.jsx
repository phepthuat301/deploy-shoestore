import React from 'react';
import { Menu } from 'antd';
import { NavLink } from 'react-router-dom'
import { ROUTERS } from '../../../constants/router';

function LeftMenu({mode}) {

  return (
    <>
    <Menu mode={mode}>
      <Menu.Item key="home">
        <NavLink to={ROUTERS.HOME}>TRANG CHỦ</NavLink>
      </Menu.Item>
      <Menu.Item key="contact">
        <NavLink to={ROUTERS.PRODUCT_LIST}>SẢN PHẨM</NavLink>
      </Menu.Item>
      <Menu.Item key="news">
        <NavLink to={ROUTERS.NEWS}>TIN TỨC & KHUYẾN MÃI</NavLink>
      </Menu.Item>
    </Menu>

    </>
  )
}

export default LeftMenu;

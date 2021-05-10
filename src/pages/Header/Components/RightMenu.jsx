import React from 'react';
//CSS
import { Menu } from 'antd';
import { UserOutlined, LoginOutlined, LogoutOutlined } from "@ant-design/icons";
import LogoUser from '../../../img/icon-header-01.png'
import { Link } from 'react-router-dom';
//ROUTER
import { ROUTERS } from '../../../constants/router';
//REDUX 
import { useSelector, useDispatch } from "react-redux";
import { logoutAction } from '../../../redux/actions';


function RightMenu({ mode }) {
  const dispatch = useDispatch();
  const user = useSelector(state => state.userReducer);
  const { userInfo } = user;
  return (
    <div className="nav-menu-right">
      <Menu mode={mode}>
        <Menu.SubMenu
          title={
            <>
              <Link to={userInfo.length === 0 ? ROUTERS.LOGIN : ROUTERS.PROFILE}><img src={LogoUser} alt="Logo User" /></Link>
            </>
          }
        >
          {userInfo.length > 0
            ? (
              <>
                <Menu.Item key="login">
                  <LoginOutlined />Chào {userInfo[0]?.hoten} !
                </Menu.Item>
                <Menu.Item key="about-us">
                  <UserOutlined /><Link to={ROUTERS.PROFILE}>Profile</Link>
                </Menu.Item>
                <Menu.Item key="log-out" onClick={() => dispatch(logoutAction())}>
                  <LogoutOutlined /><span>Logout</span>
                </Menu.Item>
                {userInfo[0]?.role === "admin" ?(
                  <Menu.Item key="admin">
                  <UserOutlined /><Link to={ROUTERS.READ_PRODUCT}>Admin Control</Link>
                </Menu.Item>
                ):null}
              </>
              
            ) : (
              null
            )
          }
        </Menu.SubMenu>
      </Menu>
    </div>
  )
}

export default RightMenu;

//REACT
import React, { useState, useEffect } from 'react'
//CSS
import { Form, Tabs, Input, Button } from 'antd';
import './style.css'
import { EditTwoTone } from '@ant-design/icons';
//Components
import { ROUTERS } from '../../constants/router'
import history from '../../utils/history'
import OrderList from './OrderList';

//REACT REDUX
import { useSelector, useDispatch } from "react-redux";
import { updatePasswordAction, removeUserOrderAction, getUserOrderAction } from '../../redux/actions';

function Profile() {
    const dispatch = useDispatch();
    const getUserInfo = useSelector((state) => state.userReducer);
    const { userInfo , orderList } = getUserInfo;
    useEffect(() => {
        dispatch(getUserOrderAction(userInfo[0]?.id_user));
        return () => {  
            dispatch(removeUserOrderAction())
          }
    }, []);
    const { TabPane } = Tabs;
    const [isEdit, setIsEdit] = useState(false)
    if(userInfo.length === 0){
        history.push(ROUTERS.LOGIN)
    }
    return (
        <div className="content">
            <div className="profile-holder">
                <Tabs defaultActiveKey="1" type="card" size={'large'}>
                    <TabPane tab="Thông tin tài khoản" key="1">
                        <div className="user-profile-details">
                            <h2 className="user-profile-name">
                                {userInfo[0]?.hoten}
                            </h2>
                            <span>Email</span> <br />
                            <h5>{userInfo[0]?.email}</h5>
                            <span>Địa chỉ</span> <br />
                            <h5>{userInfo[0]?.diachi}</h5>
                            <span>Số điện thoại</span>
                            <h5>{userInfo[0]?.sodienthoai}</h5>
                            {isEdit
                                ? (
                                    <Form onFinish={(values)=>{
                                        dispatch(updatePasswordAction(values.oldPass,values.newPass,userInfo[0]?.id_user))
                                        setIsEdit(false);
                                    }}>
                                        <Form.Item
                                            name="oldPass"
                                            className="form-in"
                                            rules={[
                                                {
                                                    required: true,
                                                    message: 'Vui lòng nhập mật khẩu cũ!',
                                                },
                                                {
                                                    min: 8,
                                                    message: 'Mật khẩu của bạn phải dài ít nhất 8 ký tự!'
                                                },
                                                {
                                                    whitespace: false,
                                                    message: 'Vui lòng không dùng khoảng trắng để đặt mật khẩu!'
                                                },
                                            ]}
                                            hasFeedback
                                        >
                                            <Input.Password placeholder="Nhập mật khẩu cũ..." />
                                        </Form.Item>
                                        <Form.Item
                                            name="newPass"
                                            className="form-in"
                                            dependencies={['oldPass']}
                                            rules={[
                                                {
                                                    required: true,
                                                    message: 'Vui lòng nhập mật khẩu mới!',
                                                },
                                                {
                                                    min: 8,
                                                    message: 'Mật khẩu của bạn phải dài ít nhất 8 ký tự!'
                                                },
                                                {
                                                    whitespace: false,
                                                    message: 'Vui lòng không dùng khoảng trắng để đặt mật khẩu!'
                                                },
                                                ({ getFieldValue }) => ({
                                                    validator(_, value) {
                                                        if (!value || getFieldValue('oldPass') !== value) {
                                                            return Promise.resolve();
                                                        }
                                                        return Promise.reject(new Error('Mật khẩu mới phải khác mật khẩu cũ'));
                                                    },
                                                }),
                                            ]}
                                            hasFeedback
                                        >
                                            <Input.Password placeholder="Nhập mật khẩu mới..." />
                                        </Form.Item>

                                        <Form.Item
                                            name="re-new-pass"
                                            className="form-in"
                                            dependencies={['new-pass']}
                                            hasFeedback
                                            rules={[
                                                {
                                                    required: true,
                                                    message: 'Vui lòng nhập mật khẩu mới!',
                                                },
                                                {
                                                    min: 8,
                                                    message: 'Mật khẩu của bạn phải dài ít nhất 8 ký tự!'
                                                },
                                                {
                                                    whitespace: false,
                                                    message: 'Vui lòng không dùng khoảng trắng để đặt mật khẩu!'
                                                },
                                                ({ getFieldValue }) => ({
                                                    validator(_, value) {
                                                        if (!value || getFieldValue('newPass') === value) {
                                                            return Promise.resolve();
                                                        }
                                                        return Promise.reject(new Error('Mật khẩu bạn vừa nhập không khớp với mật khẩu trước đó!'));
                                                    },
                                                }),
                                            ]}
                                        >
                                            <Input.Password placeholder="Xác nhận mật khẩu mới..." />
                                        </Form.Item>
                                        <Form.Item>
                                            <Button className="btn-signin" type="primary" htmlType="submit">
                                                Đổi Mật Khẩu
                                            </Button>
                                        </Form.Item>
                                    </Form>
                                )
                                : (
                                    <>
                                        <span>Mật Khẩu</span><EditTwoTone onClick={() => setIsEdit(true)} style={{ fontSize: '20px' }} />
                                        <h5>***********</h5>
                                    </>
                                )
                            }
                        </div>
                        <div className="edit">
                            <button
                                className="checkout-button user-profile-edit"
                                onClick={() => history.push(ROUTERS.EDIT_PROFILE)}
                                type="button"
                            >
                                Chỉnh sửa thông tin
                            </button>
                        </div>
                    </TabPane>
                    <TabPane tab="Đơn hàng" key="2">
                        <OrderList orderList = {orderList}/>
                    </TabPane>

                </Tabs>
            </div>
        </div>
    )
}

export default Profile

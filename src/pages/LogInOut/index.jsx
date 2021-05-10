import React, { useEffect } from 'react'
import { useSelector, useDispatch } from "react-redux";
//CSS
import '../LogInOut/styles.css'
import { Form, Input, Button, Tabs } from 'antd';
//Components
import { registerAction, loginAction, logoutAction } from '../../redux/actions';
import { ROUTERS } from '../../constants/router';
import { Link } from 'react-router-dom';
function LogInOut() {
    //REDUX 
    const dispatch = useDispatch();
    const user = useSelector(state => state.userReducer);
    const { userInfo } = user;
    //Form Layout & FORM LINH TINH
    const layout = {
        wrapperCol: {
            span: 10,
        },
    };
    const tailLayout = {
        wrapperCol: {

        },
    };
    const { TabPane } = Tabs;

    const onFinishReg = (values) => {
        dispatch(registerAction(values))
    }
    const onFinishLog = (values) => {
        dispatch(loginAction(values))
    };
    return (
        <div className="form container">
            {userInfo.length > 0
                ? <div>
                    <h1>Xin chào {userInfo[0]?.username}</h1>
                    <Button onClick={() => dispatch(logoutAction())}>Log Out</Button>
                </div>
                : <Tabs defaultActiveKey="1">
                    <TabPane tab="Đăng Nhập" key="1">
                        <Form
                            {...layout}
                            name="basic"
                            type="flex"
                            justify="center"
                            align="middle"
                            initialValues={{
                                remember: true,
                            }}
                            onFinish={onFinishLog}
                        >
                            <Form.Item
                                className="form-in"
                                name="usernameLog"
                                rules={[
                                    {
                                        required: true,
                                        message: 'Please input your username!',
                                    },
                                ]}
                            >
                                <Input placeholder="Nhập email/ tên tài khoản..." />
                            </Form.Item>

                            <Form.Item
                                className="form-in"
                                name="passwordLog"
                                rules={[
                                    {
                                        required: true,
                                        message: 'Please input your password!',
                                    },
                                ]}
                            >
                                <Input.Password placeholder="Nhập mật khẩu..." />
                            </Form.Item>
                            <Link to={ROUTERS.FORGOT_PASSWORD}>Quên Mật Khẩu?</Link>
                            <Form.Item {...tailLayout}>
                                <Button className="btn-signin" type="primary" htmlType="submit">
                                    Đăng Nhập
                                </Button>
                            </Form.Item>
                        </Form>
                    </TabPane>
                    <TabPane tab="Đăng Ký" key="2">
                        <Form
                            {...layout}
                            type="flex"
                            justify="center"
                            align="middle"
                            name="basicReg"
                            initialValues={{
                                remember: true,
                            }}
                            onFinish={onFinishReg}
                            scrollToFirstError
                        >
                            <Form.Item
                                className="form-in"
                                name="hoten"
                                rules={[
                                    {
                                        required: true,
                                        message: 'Vui lòng điền họ tên vào khung',
                                    },
                                ]}
                            >
                                <Input placeholder="Nhập họ tên của bạn..." />
                            </Form.Item>

                            <Form.Item
                                className="form-in"
                                name="username"
                                rules={[
                                    {
                                        required: true,
                                        message: 'Vui lòng nhập tên tài khoản bạn muốn tạo',
                                    },
                                    {
                                        min: 6,
                                        message: 'Tài khoản phải có độ dài ít nhất 6 ký tự'
                                    },
                                ]}
                            >
                                <Input placeholder="Nhập tên tài khoản..." />
                            </Form.Item>

                            <Form.Item
                                className="form-in"
                                name="email"
                                rules={[
                                    {
                                        type: 'email',
                                        message: 'Email bạn nhập không hợp lệ!',
                                    },
                                    {
                                        required: true,
                                        message: 'Vui lòng nhập Email!',
                                    },
                                ]}
                            >
                                <Input placeholder="Nhập email của bạn..." />
                            </Form.Item>

                            <Form.Item
                                name="password"
                                className="form-in"
                                rules={[
                                    {
                                        required: true,
                                        message: 'Vui lòng nhập mật khẩu!',
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
                                <Input.Password placeholder="Nhập mật khẩu..." />
                            </Form.Item>

                            <Form.Item
                                name="confirm"
                                className="form-in"
                                dependencies={['password']}
                                hasFeedback
                                rules={[
                                    {
                                        required: true,
                                        message: 'Vui lòng nhập mật khẩu',
                                    },
                                    {
                                        whitespace: false,
                                        message: 'Vui lòng không dùng khoảng trắng để đặt mật khẩu!'
                                    },
                                    ({ getFieldValue }) => ({
                                        validator(_, value) {
                                            if (!value || getFieldValue('password') === value) {
                                                return Promise.resolve();
                                            }
                                            return Promise.reject(new Error('Mật khẩu bạn vừa nhập không khớp với mật khẩu trước đó!'));
                                        },
                                    }),
                                ]}
                            >
                                <Input.Password placeholder="Xác nhận mật khẩu..." />
                            </Form.Item>

                            <Form.Item
                                className="form-in"
                                name="sodienthoai"
                                rules={[
                                    { required: true, 
                                        message: 'Vui lòng nhập số điện thoại!' 
                                    },
                                    {
                                        min: 9,
                                        message: 'Số điện thoại bạn vừa nhập không đúng định dạng'

                                    },
                                    {
                                        required: true, 
                                        pattern: new RegExp("^[0-9]*$"),
                                        message: "Số điện thoại chỉ bao gồm số, không bao gồm ký tự khác!"
                                      }
                                ]}
                            >
                                <Input placeholder="Nhập số điện thoại" addonBefore="+84" style={{ width: '100%' }} minLength="9" maxlength="10" />
                            </Form.Item>

                            <Form.Item
                                className="form-in"
                                name="diachi"
                                rules={[
                                    {
                                        required: true,
                                        message: 'Vui lòng nhập địa chỉ!',
                                    },
                                ]}
                            >
                                <Input placeholder="Nhập địa chỉ..." />
                            </Form.Item>

                            <Form.Item {...tailLayout}>
                                <Button className="btn-signin" type="primary" htmlType="submit">
                                    Đăng Ký
                            </Button>
                            </Form.Item>
                        </Form>
                    </TabPane>
                </Tabs>
            }

        </div>
    )
}

export default LogInOut

import React from 'react'
//Components
import { ROUTERS } from '../../constants/router'
import history from '../../utils/history'
//CSS
import { Form, Input } from 'antd';
import { CheckOutlined, ArrowLeftOutlined } from '@ant-design/icons';
//REACT REDUX
import { useSelector, useDispatch } from "react-redux";
//Action
import { updateUserInfoAction } from '../../redux/actions';
function EditProfile() {
    const dispatch = useDispatch();
    const getUserInfo = useSelector((state) => state.userReducer);
    const { userInfo } = getUserInfo;
    const [editForm] = Form.useForm();
    if(userInfo.length === 0){  
        history.push(ROUTERS.LOGIN)
    }
    return (
        <div className="content">
            <div className="profile-holder">
                <div className="user-profile-details">
                    <h4>Thay Đổi Thông Tin Cá Nhân</h4>

                    <Form
                        // {...formItemLayout}
                        form={editForm}
                        layout='vertical'
                        initialValues={
                            {
                                hoten: userInfo[0]?.hoten,
                                diachi: userInfo[0]?.diachi,
                                email: userInfo[0]?.email,
                                sodienthoai: userInfo[0]?.sodienthoai,
                            }
                        }
                        onFinish={(values)=>{
                            const newVal = {
                                ...values,
                                id_user: userInfo[0]?.id_user,
                            }
                            dispatch(updateUserInfoAction(newVal));
                        }}
                    >
                        <Form.Item
                            label="Họ Tên"
                            name="hoten"
                            className="full-name"
                            rules={[
                                {
                                    required: true,
                                    message: 'Vui lòng nhập Họ Tên!',
                                },
                            ]}
                        >
                            <Input placeholder="Họ Tên" />
                        </Form.Item>
                        <Form.Item
                            label="Email"
                            className="form-in"
                            name="email"
                            rules={[
                                {
                                    type: 'email',
                                    message: 'Email bạn vừa nhập không đúng!',
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
                            name="diachi"
                            label="Địa Chỉ"
                            rules={[
                                {
                                    required: true,
                                    message: 'Vui lòng nhập địa chỉ!',
                                },
                            ]}
                        >
                            <Input placeholder="Nhập địa chỉ..." />
                        </Form.Item>
                        <Form.Item
                            name="sodienthoai"
                            label="Số điện thoại"
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
                            <Input placeholder="Nhập số điện thoại..." addonBefore="+84" style={{ width: '100%' }} minLength="9" maxlength="10"/>
                        </Form.Item>

                    </Form>
                </div>
                <div className="checkout-shipping-action">

                <button onClick={() => history.push(ROUTERS.PROFILE)} className="button-muted back-button"
                    type="button"
                >
                    <ArrowLeftOutlined /> &nbsp;
                    Quay Lại
                </button>

                <button onClick={() => editForm.submit()} className="next-step-button complete-button"
                    type="button"
                >
                    <CheckOutlined />
                    &nbsp;
                    Xác nhận
                </button>
            </div>
            </div>
        </div>
    )
}

export default EditProfile

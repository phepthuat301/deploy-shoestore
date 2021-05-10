import React, { useState } from 'react'
import "antd/dist/antd.css";
import { Form, Input, Select } from 'antd';
import { ArrowRightOutlined, ArrowLeftOutlined } from '@ant-design/icons';
//Components
import { ROUTERS } from '../../../constants/router'
import history from '../../../utils/history'
//Redux
import { useSelector, useDispatch } from "react-redux";
import { createInvoice } from '../../../redux/actions'

function ShippingForm() {
    const getUser = useSelector(state => state.userReducer);
    const getCart = useSelector(state => state.cartReducer);
    const getLoading = useSelector(state => state.checkoutReducer);
    const { userInfo } = getUser;
    const { cartItems } = getCart;
    const { loading } = getLoading;
    if (cartItems.length === 0) {
        history.push(ROUTERS.CHECKOUT_STEP_1)
    }
    let totalPrice = 0;
    function calculateTotal(arr) {
        totalPrice = arr.reduce((acc, val) => acc + val, 0);
    };
    calculateTotal(cartItems.map((item) => item.giakm * item.soluong))
    const dispatch = useDispatch();
    const [shippingForm] = Form.useForm();
    const [payment, setPayment] = useState('');
    const formLayout = 'vertical';
    const onFinish = (values) => {
        const invoice = {
            ...values,
            id_user: userInfo[0]?.id_user,
            cartItems,
            totalPrice,
        }
        dispatch(createInvoice(invoice));
    };
    function handleChange(value) {
        setPayment(value)
    }
    return (
        <>
            <div className="checkout-shipping-wrapper">
                <div className="checkout-shipping-form">
                    <div className="checkout-fieldset">
                        <Form
                            // {...formItemLayout}
                            form={shippingForm}
                            layout={formLayout}
                            initialValues={
                                userInfo.length > 0
                                    ? {
                                        hoten: userInfo[0]?.hoten,
                                        email: userInfo[0]?.email,
                                        diachi: userInfo[0]?.diachi,
                                        sodienthoai: userInfo[0]?.sodienthoai,
                                    }
                                    : {
                                        remember: true,
                                    }
                            }
                            onFinish={onFinish}
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
                                    {
                                        required: true,
                                        message: 'Vui lòng nhập số điện thoại!',
                                    },
                                ]}
                            >
                                <Input placeholder="Nhập số điện thoại..." addonBefore="+84" style={{ width: '100%' }} />
                            </Form.Item>

                            <Form.Item
                                label="Phương Thức Thanh Toán"
                                name="loaithanhtoan"
                                rules={[
                                    {
                                        required: true,
                                        message: 'Vui lòng chọn loại thanh toán...!',
                                    },
                                ]}
                            >
                                <Select placeholder="Chọn phương thức thanh toán..." onChange={handleChange}>
                                    <Select.Option value="cod">COD - Thanh toán khi nhận hàng</Select.Option>
                                    <Select.Option value="online">Thanh toán online - Chuyển khoản</Select.Option>
                                </Select>
                            </Form.Item>
                            {payment === "online"
                                ? <div className="checkout-collapse-sub checkout-fieldset-collapse">
                                    <p>Thông Tin Chuyển Khoản:</p>
                                    <p>VIETCOMBANK - 0041000311172</p>
                                    <p>Tran Ha Nam</p>
                                </div>
                                : null
                            }

                        </Form>
                    </div>
                </div>
            </div>
            {loading && <div style={{textAlign:'center'}}>Đang Thanh Toán...</div>}
            <div className="checkout-shipping-action">

                <button onClick={() => history.push(ROUTERS.CHECKOUT_STEP_1)} className="button-muted"
                    type="button"
                >
                    <ArrowLeftOutlined /> &nbsp;
                    Quay Lại
                </button>

                <button onClick={() => shippingForm.submit()} className="next-step-button"
                    type="button"
                >
                    Xác nhận
                    &nbsp;
                    <ArrowRightOutlined />
                </button>
            </div>
        </>
    )
}

export default ShippingForm;

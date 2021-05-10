//REACT
import React from 'react';
import { useSelector } from "react-redux";
//CSS
import { ArrowRightOutlined, ShopOutlined } from '@ant-design/icons';
import './style.css';
//Component
import { StepTracker } from '../components';
import { ROUTERS } from '../../../constants/router'
import ProductItem from '../../../components/Cart/ProductItem';
import history from '../../../utils/history'


function OrderSummary() {
    const cart = useSelector((state) => state.cartReducer);
    const { cartItems } = cart;
    function calculateTotal(arr) {
        if (!arr || arr?.length === 0) return 0;

        const totalPrice = arr.reduce((acc, val) => acc + val, 0);

        return totalPrice.toLocaleString("vi-VN");
    };
    return (
        <div className="checkout">
            <StepTracker current={1} />
            <div className="checkout-step1">
                <h3 style={{ textAlign: 'center' }}>Thông Tin Giỏ Hàng</h3>
                <span style={{ display: 'block', textAlign: 'center' }}>
                    Kiểm tra lại sản phẩm trong giỏ của bạn
                </span>
                <br />

                   <ProductItem />

                <div className="product-total-checkout">
                    <p className="product-total-title">Tổng tiền:</p>
                    <h2 className="amount-checkout">
                        {calculateTotal(cartItems.map((item) => item.giakm * item.soluong))} VNĐ
                    </h2>
                </div>
                <div className="checkout-shipping-action">

                        <button onClick={()=>history.push(ROUTERS.PRODUCT_LIST)} className="button-muted"
                            type="button"
                        >
                            <ShopOutlined /> &nbsp;
                            Tiếp Tục Mua
                         </button>

                        <button onClick={()=>history.push(ROUTERS.CHECKOUT_STEP_2)} className="next-step-button"
                            type="button"
                        >
                            Tiếp Theo
                            &nbsp;
                            <ArrowRightOutlined />
                        </button>
                </div>
            </div>
        </div>
    )
}

export default OrderSummary

import React from 'react'
import '../../css/cart.css'

// Components
import { ROUTERS } from '../../constants/router'
import { useSelector, useDispatch } from "react-redux";
import { clearCart} from "../../redux/actions/";
import CartItem from './CartItem';
import history from '../../utils/history'
function Cart() {
    const dispatch = useDispatch();
    const cart = useSelector((state) => state.cartReducer);
    const { cartItems } = cart;
    function calculateTotal(arr){
        if (!arr || arr?.length === 0) return 0;
      
        const totalPrice = arr.reduce((acc, val) => acc + val, 0);
      
        return totalPrice.toLocaleString("vi-VN");
      };
    return (
        <>
            <CartItem cartItems={cartItems}/>
            <div className="product-checkout">
                <div className="product-total">
                    <p className="product-total-title">
                        Tổng tiền: &nbsp;
                    </p>
                    <h2 className="product-total-amount">
                        {calculateTotal(cartItems.map((item) => item.giakm * item.soluong))} VNĐ
                    </h2>
                </div>
                <div className="button-cart">
                    <button onClick={() => dispatch(clearCart())} className="delete-cart-button">Xóa Giỏ Hàng</button>
                    <button onClick={()=>history.push(ROUTERS.CHECKOUT_STEP_1)} className="checkout-button">Thanh Toán</button>
                </div>
            </div>
        </>
    )
}

export default Cart;
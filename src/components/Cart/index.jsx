import React, { useState } from 'react'
import Cart from './Cart'
import { Drawer, Badge } from 'antd';
import ShoppingLogo from '../../img/icon-header-02.png'
import { useSelector } from "react-redux";

function ProductCart() {
    const cart = useSelector((state) => state.cartReducer);
    const { cartItems } = cart;
    const [visible, setVisible] = useState(false);


    const showDrawerCart = () => {
        setVisible(!visible);
    }

    return (
        <div className="product-cart">
            <div className="cart-icon">
                <Badge count={cartItems.length}>
                    <img src={ShoppingLogo} className="shopping-logo" alt="LogoShopping" onClick={showDrawerCart} />
                </Badge>
            </div>
            <div className="product-drawer">
                <Drawer
                    title={"Giỏ Hàng"}
                    placement="right"
                    closable={true}
                    onClose={showDrawerCart}
                    visible={visible}
                    style={{ zIndex: 99999 }}
                >
                    <Cart />
                </Drawer>
            </div>
        </div>
    )
}

export default ProductCart

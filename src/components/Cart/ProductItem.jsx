//React
import React from 'react';
import { useSelector, useDispatch } from "react-redux";

//Components
import { removeFromCart, plusQtyItem, minusQtyItem } from "../../redux/actions/";

//Library
import { MinusOutlined, PlusOutlined } from '@ant-design/icons';


function CartItem() {

    const dispatch = useDispatch();
    const cart = useSelector((state) => state.cartReducer);
    const { cartItems } = cart;
    return (
        <div className="shopping-cart-2">
        {cartItems.length == 0
            ? <h4>Giỏ Hàng Của Bạn Trống</h4>
            : cartItems.map((item, index) => {
                return (
                    <div className="item-2">
                        <div className="buttons-2">
                            <span onClick={() => dispatch(removeFromCart(index))} className="delete-btn-2"></span>
                        </div>

                        <div className="image-2">
                            <img src={`/Gallery/${item.hinhanh}`} width="130px" height="80px" alt="Image Product" className="img-product-cart-2" />
                        </div>

                        <div className="description-2">
                            <span className="product-name-2">{item.tengiay}</span>
                            <span>{item.tenmagiay}</span>
                            <span>{item.color}</span>
                            <span>Kích Thước: {item.sosize}</span>
                            <div className="total-price-2">{item.soluong} x {item.giakm.toLocaleString("vi-VN")} VNĐ</div>
                        </div>


                        {/* <div className="description">
                        </div> */}

                        <div className="quantity-2">
                            <button onClick={() => dispatch(plusQtyItem(index))} className="plus-btn-2" type="button" name="button" disabled={item.soluong === item.maxSoluong ? true : false}>
                                <PlusOutlined />
                            </button>
                            <input type="text" name="name" value={item.soluong} />
                            <button onClick={() => dispatch(minusQtyItem(index))} className="minus-btn-2" type="button" name="button" disabled={item.soluong === 1 ? true : false}>
                                <MinusOutlined />
                            </button>
                        </div>

                       
                    </div>
                )
            })}
    </div>
    )
}

export default CartItem
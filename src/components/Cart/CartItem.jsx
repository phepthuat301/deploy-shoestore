import { MinusOutlined, PlusOutlined } from '@ant-design/icons';
import { removeFromCart, plusQtyItem, minusQtyItem } from "../../redux/actions/";
import { useDispatch } from "react-redux";
function CartItem(props) {
    const dispatch = useDispatch();
    const {cartItems} = props;
    return (
        <div className="shopping-cart">
        {cartItems.length == 0
            ? <h4>Giỏ Hàng Của Bạn Trống</h4>
            : cartItems.map((item, index) => {
                return (
                    <div className="item">
                        <div className="buttons">
                            <span onClick={() => dispatch(removeFromCart(index))} className="delete-btn"></span>
                        </div>

                        <div className="image">
                            <img src={`/Gallery/${item.hinhanh}`} width="130px" height="80px" alt="Image Product" className="img-product-cart" />
                        </div>

                        <div className="description">
                            <span className="product-name">{item.tengiay}</span>
                            <span>{item.tenmagiay}</span>
                            <span>{item.color}</span>
                            <span>Kích Thước: {item.sosize}</span>
                            <div className="total-price">{item.soluong} x {item.giakm.toLocaleString("vi-VN")} VNĐ</div>
                        </div>


                        {/* <div className="description">
                        </div> */}

                        <div className="quantity">
                            <button onClick={() => dispatch(plusQtyItem(index))} className="plus-btn" type="button" name="button" disabled={item.soluong === item.maxSoluong ? true : false}>
                                <PlusOutlined />
                            </button>
                            <input type="text" name="name" value={item.soluong} />
                            <button onClick={() => dispatch(minusQtyItem(index))} className="minus-btn" type="button" name="button" disabled={item.soluong === 1 ? true : false}>
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
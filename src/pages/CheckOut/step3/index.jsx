import React, { useEffect } from 'react'
//REDUX
import { useDispatch, useSelector } from "react-redux";
import { clearCart , changeCheckoutStatus } from '../../../redux/actions'
//Components
import history from '../../../utils/history';
import { ROUTERS } from '../../../constants/router';
import { StepTracker } from '../components'

function Payment() {
    const getCheckout = useSelector(state => state.checkoutReducer);
    const { checkout } = getCheckout;
    if (checkout === false) {
        history.push(ROUTERS.HOME);
    }
    const dispatch = useDispatch();
    useEffect(() => {
        dispatch(clearCart());
        return () => {
            dispatch(changeCheckoutStatus());
        }
    }, []);
    
    
    return (
        <div className="checkout-step3">
            <StepTracker current={3} />
            <div className="checkout-step3">
                <h4>Đơn hàng của bạn đã được ghi nhận!</h4>
                <p style={{ textAlign: 'center' }}>Thời gian giao hàng khoảng 4 - 5 ngày.</p>
                <h4>Cảm ơn quý khách đã tin tưởng mua hàng của chúng tôi!</h4>
            </div>
        </div>
    )
}

export default Payment

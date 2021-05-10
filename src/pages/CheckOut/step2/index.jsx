import React from 'react'
//CSS
import './style.css'
//Components
import { StepTracker } from '../components'
import ShippingForm from './ShippingForm'
function ShippingDetails() {
    return (
        <div className="checkout">
            <StepTracker current={2} />
            <div className="checkout-step2">
                <h3 style={{ textAlign: 'center' }}>Thông Tin Giao Hàng</h3>
                <ShippingForm/>
            </div>
        </div>
    )
}

export default ShippingDetails

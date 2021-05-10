import { Form, Input, Button } from 'antd';
import { LoadingOutlined } from '@ant-design/icons';
import Countdown from "react-countdown";
//REACT && REDUX
import { useState } from 'react'
import { useDispatch, useSelector } from "react-redux";
import { userResetPasswordAction } from '../../../redux/actions';
export default function ForgotPassword() {
    const dispatch = useDispatch();
    const user = useSelector(state => state.userReducer);
    const { loadingReset, checkTime } = user;
    const [disabled, setDisabled] = useState(false)
    //COUNT DOWN

    // Renderer callback with condition
    const renderer = ({ minutes, seconds, completed }) => {
        if (completed) {
            setDisabled(false);
            return null;
        } else {
            // Render a countdown
            setDisabled(true);
            return (
                <>
                    <span>
                        Vui lòng đợi <span style={{ color: 'red' }}> {minutes}:{seconds} </span> trước khi gửi mail khác!
                </span>
                    <h4>Vui lòng kiểm tra cả mục Thư Rác của bạn!</h4>
                </>
            );
        }
    };
    console.log(checkTime)
    return (
        <Form
            style={{ width: "500px", margin: 'auto', marginTop: '50px' }}
            name="basic"
            layout="vertical"
            initialValues={{
                remember: true,
            }}
            onFinish={(values) => {
                dispatch(userResetPasswordAction(values.email));
                setDisabled(true);
            }}
        >
            <Form.Item
                label="Email:"
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
            {checkTime.tokenTime && <Countdown date={checkTime && checkTime.tokenTime} renderer={renderer} />}
            <Form.Item>
                {!disabled && (
                    <Button className="btn-signin" type="primary" htmlType="submit">
                        Gửi Mail
                    </Button>
                )}

            </Form.Item>
            {loadingReset && (
                <LoadingOutlined style={{ fontSize: 40 }} spin />
            )}
        </Form>
    )
}
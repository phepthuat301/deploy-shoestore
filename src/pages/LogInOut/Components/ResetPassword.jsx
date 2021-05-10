import { Form, Input, Button } from 'antd';
import swal from 'sweetalert';
//REACT REDUX
import { useSelector, useDispatch } from "react-redux";
import React, { useEffect } from 'react'
import { checkAuthResetAction, removeResetUserAction, userAuthResetPwdAction } from '../../../redux/actions';
//HISTORY && ROUTER
import history from '../../../utils/history';
import { ROUTERS } from '../../../constants/router';

export default function ResetPassword(props) {
    
    const {match} = props;
    //REDUX 
    const dispatch = useDispatch();
    const user = useSelector(state => state.userReducer);
    const { resetUser } = user;
    useEffect(() => {
        dispatch(checkAuthResetAction(match.params.id));
        return () => {
            dispatch(removeResetUserAction())
        }
    }, []);
    if(resetUser === "token not found"){
        history.push('/')
    }
    if(resetUser === "token expired"){
        history.push(ROUTERS.FORGOT_PASSWORD)
        swal("Đường dẫn đã hết hạn", "Vui lòng gửi lại email khác", "error")
    }
    if(resetUser === "success"){
        history.push(ROUTERS.LOGIN)
        swal("Bạn Đã Đổi Mật Khẩu Thành Công","Vui Lòng Đăng Nhập","success")
    }
    return (
        <Form
            style={{ width: "500px", margin: 'auto', marginTop: '50px' }}
            name="basic"
            layout="vertical"
            initialValues={{
                remember: true,
            }}
            onFinish={(value)=>{dispatch(userAuthResetPwdAction(value.password,resetUser.id_user))}}
        >
            <Form.Item
                name="password"
                className="form-in"
                rules={[
                    {
                        required: true,
                        message: 'Vui lòng nhập mật khẩu!',
                    },
                    {
                        min: 8,
                        message: 'Mật khẩu của bạn phải dài ít nhất 8 ký tự!'
                    },
                    {
                        whitespace: false,
                        message: 'Vui lòng không dùng khoảng trắng để đặt mật khẩu!'
                    },
                ]}
                hasFeedback
            >
                <Input.Password placeholder="Nhập mật khẩu mới..." />
            </Form.Item>

            <Form.Item
                name="confirm"
                className="form-in"
                dependencies={['password']}
                hasFeedback
                rules={[
                    {
                        required: true,
                        message: 'Vui lòng nhập mật khẩu',
                    },
                    {
                        whitespace: false,
                        message: 'Vui lòng không dùng khoảng trắng để đặt mật khẩu!'
                    },
                    ({ getFieldValue }) => ({
                        validator(_, value) {
                            if (!value || getFieldValue('password') === value) {
                                return Promise.resolve();
                            }
                            return Promise.reject(new Error('Mật khẩu bạn vừa nhập không khớp với mật khẩu trước đó!'));
                        },
                    }),
                ]}
            >
                <Input.Password placeholder="Xác nhận mật khẩu..." />
            </Form.Item>
            <Form.Item>
                <Button className="btn-signin" type="primary" htmlType="submit">
                    RESET PASSWORD
                </Button>
            </Form.Item>
        </Form>
    )
}
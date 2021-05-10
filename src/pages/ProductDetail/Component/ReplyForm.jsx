import React, { useState } from 'react';
import { useDispatch } from "react-redux";
import { createReplyAction } from '../../../redux/actions';
//
import { Form, Input, Button } from 'antd';

export default function ReplyForm(props) {
    const [isEdit, setIsEdit] = useState(false);
    const dispatch = useDispatch()
    const { userInfo, id_binhluan } = props
    const { TextArea } = Input;
    function replyForm() {
        return (
            <Form
                onFinish={(values) => {dispatch(createReplyAction({ ...values, id_binhluan}));setIsEdit(false)}}
                initialValues={
                    {
                        tenqtv: userInfo[0]?.hoten,
                    }
                }
                style={{ marginTop: '20px' }}
            >
                <Form.Item
                    name="tenqtv"
                    rules={[
                        {
                            required: true,
                            message: 'Vui lòng nhập tên!',
                        },
                    ]}
                >
                    <Input style={{ width: '100%' }} disabled />
                </Form.Item>
                <Form.Item
                    name="phanhoi"
                    rules={[
                        {
                            required: true,
                            message: 'Vui lòng nhập phản hồi!',
                        },
                    ]}
                >
                    <TextArea showCount maxLength={200} placeholder="Nhập phản hồi..." />
                </Form.Item>
                <Form.Item>
                    <div className="comment-button">
                        <button type="primary" htmlType="submit" className="send-review-btn" >
                            Gửi Phản Hồi
                        </button>
                        <button onClick={() => { setIsEdit(false) }} className="send-review-btn cancel-button">
                            Hủy
                        </button>
                    </div>
                </Form.Item>
            </Form>
        )
    }
    function reply() {
        return (
            <span className="reply-btn" onClick={() => setIsEdit(true)}>
                Gửi trả lời
            </span>
        )
    }
    return (
        <>
            {isEdit ? replyForm() : reply()}
        </>
    )
}
import { Form, Row, Select, Button, Input } from "antd";
import './style.css'
//REDUX && REACT
import { useDispatch } from "react-redux";
import { createColorAction } from "../../../redux/actions";
export default function AdminAddColor() {
    const dispatch = useDispatch();
    function onFinish(values) {
        dispatch(createColorAction(values))
    }
    return (
        <Row>
            <div style={{ textAlign: 'center', width: '100%', backgroundColor: '#f9f9f9' }}>
                <h4 style={{ marginTop: '30px' }}>Thêm Màu</h4>
            </div>
            <div className="content3">
                <div className="profile-holder">
                    <Form onFinish={onFinish}>
                        <Form.Item
                            name="color"
                            rules={[
                                {
                                    required: true,
                                    message: 'Vui lòng nhập màu giày!',
                                },
                            ]}
                        >
                            <Input placeholder="Nhập Màu..." style={{ width: '100%' }} />
                        </Form.Item>
                        <Form.Item
                            name="trangthai"
                            rules={[
                                {
                                    required: true,
                                    message: 'Vui lòng chọn trạng thái...',
                                },
                            ]}
                        >
                            <Select placeholder="Chọn tình trạng..." >
                                <Select.Option value="1">Kích Hoạt</Select.Option>
                                <Select.Option value="0">Không Kích Hoạt</Select.Option>
                            </Select>
                        </Form.Item>
                        <Form.Item>
                            <Button type="primary" htmlType="submit">
                                Thêm Màu
                        </Button>
                        </Form.Item>
                    </Form>
           </div>
           </div>
        </Row>
    )
}
import { Form, Row, Select, Button, Input } from "antd";
//REDUX && REACT
import { useDispatch } from "react-redux";
import { createSizeAction } from "../../../redux/actions";

export default function AdminAddSize() {
    const dispatch = useDispatch();
    function onFinish(values) {
        dispatch(createSizeAction(values))
    }
    return (
        <Row >
            <div style={{ textAlign: 'center', width: '100%', backgroundColor: '#f9f9f9' }}>
                <h4>Thêm Kích Thước</h4>
            </div>
            <div className="content3">
                <div className="profile-holder">
                <Form onFinish={onFinish}>
                    <Form.Item
                        name="sosize"
                        rules={[
                            {
                                required: true,
                                message: 'Vui lòng nhập size giày!',
                            },
                            {
                                required: true,
                                pattern: /^(?:\d*)$/,
                                message: "Size giày chỉ bao gồm ký tự số",

                            },
                            {
                                max: 2,
                                message: 'Số size vừa nhập không đúng'

                            },
                        ]}
                    >
                        <Input placeholder="Nhập Số Size" style={{ width: '100%' }}  />
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
                        <Select placeholder="Chọn tình trạng..." style={{width: '100%'}}>
                            <Select.Option value="1">Kích Hoạt</Select.Option>
                            <Select.Option value="0">Không Kích Hoạt</Select.Option>
                        </Select>
                    </Form.Item>
                    <Form.Item>
                        <Button type="primary" htmlType="submit">
                            Tạo Size
                        </Button>
                    </Form.Item>
                </Form>
            </div>
            </div>
        </Row>
    )
}
import { Form, Row, Select, Button, Input } from "antd";
//REDUX && REACT
import { useDispatch } from "react-redux";
import { createTypeAction } from "../../../redux/actions";
export default function AdminAddType() {
    const dispatch = useDispatch();
    function onFinish(values) {
        dispatch(createTypeAction(values))
    }
    return (
        <Row>
            <div style={{ textAlign: 'center', width: '100%', backgroundColor: '#f9f9f9' }}>
                <h4 style={{ marginTop: '30px' }}>Thêm Kiểu Giày</h4>
            </div>
            <div className="content3">
                <div className="profile-holder">
                    <Form onFinish={onFinish}>
                        <Form.Item
                            name="tenkieugiay"
                            rules={[
                                {
                                    required: true,
                                    message: 'Vui lòng nhập tên kiểu giày!',
                                },
                            ]}
                        >
                            <Input placeholder="Nhập tên kiểu giày..." style={{ width: '100%' }} />
                        </Form.Item>
                        <Form.Item
                            name="tinhtrang"
                            rules={[
                                {
                                    required: true,
                                    message: 'Vui lòng chọn tình trạng...',
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
                                Thêm Kiểu Giày
                        </Button>
                        </Form.Item>
                    </Form>
           </div>
           </div>
        </Row>
    )
}
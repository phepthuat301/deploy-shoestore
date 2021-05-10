import { useState } from "react"
import { EditTwoTone } from '@ant-design/icons';
import { Select, Form, Button, Tag } from "antd";
export default function UpdateStatus(props) {
    const { trangthai, id_donhang, UPDATEORDERSTATUS } = props
    const [isEdit, setIsEdit] = useState(false);
    function renderItemView() {
        return (
            <>
                {trangthai === 0 && <Tag color="geekblue">Chờ Xác Nhận</Tag>}
                {trangthai === 1 && <Tag color="lime">Đã Xác Nhận</Tag>}
                {trangthai === 2 && <Tag color="blue">Đang Giao Hàng</Tag>}
                {trangthai === 3 && <Tag color="green">Giao Hàng Thành Công</Tag>}
                {trangthai === 4 && <Tag color="red">Hủy Đơn</Tag>}
                <EditTwoTone onClick={() => setIsEdit(true)} twoToneColor="#eb2f96" style={{ fontSize: '25px', marginLeft: '20px' }} />
            </>
        )
    }

    function renderItemEdit() {
        return (
            <>
                <Form
                    layout="vertical"
                    onFinish={(values) => {
                        UPDATEORDERSTATUS(values, id_donhang);
                        setIsEdit(false);
                    }}
                >
                    <Form.Item
                        name="trangthai"
                        rules={[{ required: true, message: 'Please input your trạng thái' }]}
                    >
                        <Select placeholder="Chọn tình trạng...">
                            <Select.Option value="1">Đã Xác Nhận</Select.Option>
                            <Select.Option value="2">Đang Giao Hàng</Select.Option>
                            <Select.Option value="3">Giao Hàng Thành Công</Select.Option>
                            <Select.Option value="4">Hủy Đơn</Select.Option>
                        </Select>
                    </Form.Item>
                    <Form.Item>
                        <Button type="primary" htmlType="submit">
                            LƯU
                        </Button>
                        <Button type="danger" onClick={()=>{setIsEdit(false)}}>
                            HỦY
                        </Button>
                    </Form.Item>
                </Form>

            </>
        )
    }
    return (
        isEdit ? renderItemEdit() : renderItemView()
    )
}
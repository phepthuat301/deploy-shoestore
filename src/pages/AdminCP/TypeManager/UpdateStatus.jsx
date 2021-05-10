import { useState } from "react"
import { EditTwoTone } from '@ant-design/icons';
import { Select, Form, Button } from "antd";
export default function UpdateStatus(props) {
    const {tinhtrang,id_kieugiay, UPDATETYPESTATUS} = props
    const [isEdit, setIsEdit] = useState(false);
    function renderItemView() {
        return (
            <>
                <span>{tinhtrang === 1 ? "Kích Hoạt" : "Không Kích Hoạt"}</span>
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
                        UPDATETYPESTATUS(values, id_kieugiay);
                        setIsEdit(false);
                    }}
                >
                    <Form.Item
                        name="tinhtrang"
                        rules={[{ required: true, message: 'Please input your trạng thái' }]}
                    >
                        <Select placeholder="Chọn tình trạng...">
                            <Select.Option value="1">Kích Hoạt</Select.Option>
                            <Select.Option value="0">Không Kích Hoạt</Select.Option>
                        </Select>
                    </Form.Item>
                    <Form.Item>
                        <Button type="primary" htmlType="submit">
                            SAVE
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
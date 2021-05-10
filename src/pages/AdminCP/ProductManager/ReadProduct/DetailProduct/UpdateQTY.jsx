import { useState } from "react"
import { EditTwoTone } from '@ant-design/icons';
import { InputNumber, Form, Button } from "antd";
export default function QUANTY(props) {
    const { id_color, id_size, shoeDetail, id_chitietgiay, UPDATEQTY } = props
    let newShoeQty = [];
    newShoeQty = shoeDetail.filter(item => item.id_color === id_color && item.id_size === id_size)
    const [isEdit, setIsEdit] = useState(false);
    function renderItemView() {
        return (
            <>
                <span>{newShoeQty[0]?.soluong}</span>
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
                        UPDATEQTY(values, id_chitietgiay);
                        setIsEdit(false);
                    }}
                >
                    <Form.Item
                        name="soluong"
                        rules={[{ required: true, message: 'Please input your title!' }]}
                    >
                        <InputNumber min={1} max={1000} defaultValue={newShoeQty[0]?.soluong}/>
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
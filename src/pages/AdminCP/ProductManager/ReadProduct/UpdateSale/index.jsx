import { useState } from "react"
import { EditTwoTone } from '@ant-design/icons';
import { Select, Form, Button, Tag } from "antd";
export default function UpdateSale(props) {
    const { makhuyenmai, id_khuyenmai, id_giay, UPDATESALE, saleList } = props
    const [isEdit, setIsEdit] = useState(false);
    function renderItemView() {
        return (
            <>
                <span>{id_khuyenmai === null ? <Tag color="red">Không</Tag> : <Tag color="green">{makhuyenmai}</Tag>}</span>
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
                        if(values.id_khuyenmai === "không"){
                            values.id_khuyenmai = null;
                        }
                        const newSaleList = saleList.filter(item => {
                            return item.id_khuyenmai === values.id_khuyenmai;
                        })
                        UPDATESALE(values, id_giay, newSaleList[0]?.makhuyenmai);
                        setIsEdit(false);
                    }}
                >
                    <Form.Item
                        name="id_khuyenmai"
                        rules={[{ required: true, message: 'Please input your trạng thái' }]}
                    >
                        <Select placeholder="Chọn khuyến mãi...">
                            <Select.Option value="không">Bỏ Khuyến Mãi</Select.Option>
                            {saleList.map((item, index) => {
                                return <Select.Option key={index} value={item.id_khuyenmai}>{item.makhuyenmai}</Select.Option>
                            })}
                        </Select>
                    </Form.Item>
                    <Form.Item>
                        <Button type="primary" htmlType="submit">
                            SAVE
                        </Button>
                        <Button type="danger" onClick={() => setIsEdit(false)}>
                            CANCEL
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
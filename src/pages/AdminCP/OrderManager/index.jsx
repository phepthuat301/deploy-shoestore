//CSS
import { Table, Space, Button, Row, Col } from 'antd';
import { DeleteTwoTone } from '@ant-design/icons';
//REDUX && REACT
import { useSelector, useDispatch } from "react-redux";
import { deleteOrderAction, getOrderAction, removeOrderAction, updateOrderStatus } from "../../../redux/actions";
import { useEffect } from 'react';
//History
import history from '../../../utils/history';
import UpdateStatus from './UpdateStatus';
const { Column } = Table;
export default function AdminDisplayOrder() {
    const dispatch = useDispatch();
    useEffect(() => {
        dispatch(getOrderAction());
        return () => {
            dispatch(removeOrderAction())
        }
    }, [dispatch]);
    const getAdminContent = useSelector(state => state.adminReducer);
    const { orderList } = getAdminContent;
    function UPDATEORDERSTATUS(value, id_donhang) {
        dispatch(updateOrderStatus(value.trangthai, id_donhang))
    }
    orderList.forEach(item =>{
        item.ngaytao = item.ngaytao.replace("T"," ").substr(0,19)
    })
    return (
        <Row style={{ marginTop: '30px' }}>
            <div style={{ textAlign: 'center', width: '100%' }}>
                <h4>Quản Lý Đơn Hàng</h4>
            </div>
            <Col span={22} offset={1}>
                <Table dataSource={orderList} pagination={{ position: ['bottomCenter'] }}>
                    <Column title="Ngày Tạo" dataIndex="ngaytao" key="ngaytao" />
                    <Column title="Số Điện Thoại" dataIndex="sodienthoai" key="sodienthoai" />
                    <Column title="Email" dataIndex="email" key="email" />
                    <Column title="Họ Tên" dataIndex="hoten" key="hoten" />
                    <Column
                        title="Trạng Thái"
                        key="trangthai"
                        render={(record) => (
                            <UpdateStatus trangthai={record.trangthai} id_donhang={record.id_donhang} UPDATEORDERSTATUS={UPDATEORDERSTATUS} />
                        )}
                    />
                    <Column title="Địa Chỉ" dataIndex="diachi" key="diachi" />
                    <Column title="Loại Thanh Toán" dataIndex="loaithanhtoan" key="loaithanhtoan" />
                    <Column
                        title="Action"
                        key="action"
                        render={(text, record) => (
                            <Space size="middle">
                                <Button type='primary' onClick={() => history.push(`/readorder/orderdetai/${record.id_donhang}`)}>Chi Tiết</Button>
                                {record.trangthai === 4 && <DeleteTwoTone onClick={() => dispatch(deleteOrderAction(record.id_donhang))} twoToneColor='red' style={{ fontSize: '30px' }} />}
                            </Space>
                        )}
                    />
                </Table>
            </Col>
        </Row>
    )
}
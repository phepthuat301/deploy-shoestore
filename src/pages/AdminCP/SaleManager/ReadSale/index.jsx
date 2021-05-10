//CSS
import { DeleteTwoTone } from '@ant-design/icons';
import { Table, Row, Col, Space } from 'antd';
//REDUX && REACT
import { useSelector, useDispatch } from "react-redux";
import { deleteSaleAction, getSaleAction, removeSaleAction } from "../../../../redux/actions";
import { useEffect } from 'react';
//
const { Column } = Table;
export default function AdminDisplaySale() {
    const dispatch = useDispatch();
    const getAdminContent = useSelector(state => state.adminReducer);
    const { saleList } = getAdminContent;
    useEffect(() => {
        dispatch(getSaleAction());
        return () => {
            dispatch(removeSaleAction())
        }
    }, []);
    saleList.forEach(item=>{
        item.batdau = item.batdau.substr(0,10);
        item.ketthuc = item.ketthuc.substr(0,10);
    })
    return (
        <Row style={{ marginTop: '30px' }}>
                        <div style={{ textAlign: 'center', width: '100%' }}>
                <h4>Quản Lý Khuyến Mãi</h4>
            </div>
            <Col span={18} offset={3}>
                <Table dataSource={saleList} pagination={{ position: ['bottomCenter'] }}>
                    <Column title="Mã KM" dataIndex="makhuyenmai" key="makhuyenmai" />
                    <Column title="Tên KM" dataIndex="tenkhuyenmai" key="tenkhuyenmai" />
                    <Column title="Ngày bắt đầu" dataIndex="batdau" key="batdau" />
                    <Column title="Ngày kết thúc" dataIndex="ketthuc" key="ketthuc" />
                    <Column title="Phần Trăm(%)" dataIndex="phantramkhuyenmai" key="phantramkhuyenmai" />
                    <Column title="Trạng Thái" dataIndex="trangthai" key="trangthai" />
                    <Column
                        title="Action"
                        key="action"
                        render={(text, record) => (
                            <Space size="middle">
                                <DeleteTwoTone onClick={()=>dispatch(deleteSaleAction(record.id_khuyenmai))} twoToneColor='red' style={{ fontSize: '30px' }} />
                            </Space>
                        )}
                    />
                </Table>
            </Col>
        </Row>
    )
}
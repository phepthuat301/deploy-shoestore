//CSS
import { Table, Row, Col, Breadcrumb } from 'antd';
//REDUX && REACT
import { useDispatch, useSelector } from "react-redux";
import { getOrderDetailAction, removeOrderDetailAction } from "../../../redux/actions";
import { useEffect } from 'react';
import { Link } from 'react-router-dom';

//Components
import { ROUTERS } from '../../../constants/router';


export default function AdminOrderDetail(props) {
    const { Column } = Table;
    const { match } = props;
    const dispatch = useDispatch();
    useEffect(() => {
        dispatch(getOrderDetailAction(match.params.id));
        return () => {
            dispatch(removeOrderDetailAction())
        }
    }, []);
    const getAdminContent = useSelector(state => state.adminReducer);
    const { orderDetailList } = getAdminContent;
    let total = 0;
    if (orderDetailList) {
        for (let i = 0; i < orderDetailList.length; i++) {
            total = total + (orderDetailList[i].soluongsp * orderDetailList[i].giabancuoi)
        }
    }
    return (
        <>
        
            <Breadcrumb style={{ marginTop: '20px', marginLeft: '20px' }}>
                <Breadcrumb.Item><Link to={ROUTERS.READ_ORDER}>Xem Hóa Đơn</Link></Breadcrumb.Item>
                <Breadcrumb.Item>Chi Tiết Hóa Đơn</Breadcrumb.Item>
            </Breadcrumb>
            <Row style={{ marginTop: '30px' }}>
                <Col span={22} offset={1}>
                    <Table dataSource={orderDetailList}>
                        <Column title="Tên Mã Giày" dataIndex="tenmagiay" key="tenmagiay" />
                        <Column title="Size" dataIndex="sosize" key="sosize" />
                        <Column title="Color" dataIndex="color" key="color" />
                        <Column title="Số Lượng" dataIndex="soluongsp" key="soluongsp" />
                        <Column title="Giá Đã Bán" dataIndex="giabancuoi" key="giabancuoi" />
                    </Table>
                    <h4>Tổng Tiền: {total.toLocaleString('vi-VN')} VNĐ</h4>
                </Col>
            </Row>
        </>
    )
}
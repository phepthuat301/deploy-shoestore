import React from 'react'
//Components
import history from '../../utils/history';
//CSS
import { Table, Space, Button, Collapse } from 'antd';
//REDUX && REACT
import { useDispatch, useSelector } from "react-redux";
import { getOrderDetailAction, removeOrderDetailAction } from "../../redux/actions";
const { Column } = Table;
const { Panel } = Collapse;
function OrderList(props) {
    const dispatch = useDispatch();
    const { orderList } = props
    function callback(key) {
        dispatch(getOrderDetailAction(key));
    }
    const getUserOrder = useSelector(state => state.adminReducer);
    const { orderDetailList } = getUserOrder;
    let total = 0;
    if (orderDetailList) {
        for (let i = 0; i < orderDetailList.length; i++) {
            total = total + (orderDetailList[i].soluongsp * orderDetailList[i].giabancuoi)
        }
    }
    //Thay đổi định dạng thời gian
    orderList.forEach(item => {
        item.ngaytao = item.ngaytao.replace("T", " ").substr(0, 19)
    })
    return (
        <div className="order-data">
            <Collapse accordion onChange={callback}>
                {orderList.length === 0 && <Panel style={{textAlign:'center'}} header="Chưa Có Đơn Hàng"/>}
                {orderList.map((item, index) => {
                    return (
                        <Panel header={`Ngày Tạo: ${item.ngaytao} 
                        ---- Địa chỉ Giao Hàng: ${item.diachi} 
                        ---- Trạng Thái: ${item.trangthai === 1 ? "Đã Xác Nhận" : "Chưa Xác Nhận"} 
                        ---- Loại Thanh Toán: ${item.loaithanhtoan} `}
                            key={item.id_donhang}
                        >
                            <Table key={index} dataSource={orderDetailList}>
                                <Column title="Tên Mã Giày" dataIndex="tenmagiay" key="tenmagiay" />
                                <Column title="Size" dataIndex="sosize" key="sosize" />
                                <Column title="Color" dataIndex="color" key="color" />
                                <Column title="Số Lượng" dataIndex="soluongsp" key="soluongsp" />
                                <Column title="Giá Đã Bán" dataIndex="giabancuoi" key="giabancuoi" />
                            </Table>
                            <h4>Tổng Tiền: {total.toLocaleString('vi-VN')} VNĐ</h4>
                        </Panel>

                    )
                })}
            </Collapse>
        </div>
    )
}

export default OrderList

//CSS
import { DeleteTwoTone } from '@ant-design/icons';
import { Table, Space, Row, Col } from 'antd';
//REDUX && REACT
import { useSelector, useDispatch } from "react-redux";
import { deleteColorAction, getShoeColorAction, removeShoeColorAction, updateColorStatus } from "../../../redux/actions";
import { useEffect } from 'react';
//Components
import UpdateStatus from './UpdateStatus'
const { Column } = Table;
export default function AdminDisplayColor() {
    const dispatch = useDispatch();
    const getAdminContent = useSelector(state => state.adminReducer);
    const { shoeColorList } = getAdminContent;
    useEffect(() => {
        dispatch(getShoeColorAction());
        return () => {
            dispatch(removeShoeColorAction())
        }
    }, [dispatch]);
    function UPDATECOLORSTATUS(value, id_color) {
        dispatch(updateColorStatus(value.trangthai, id_color))
    }

    return (
        <Row style={{ marginTop: '30px' }}>
            <div style={{ textAlign: 'center', width: '100%' }}>
                <h4>Quản Lý Màu</h4>
            </div>
            <Col span={12} offset={6}>
                <Table dataSource={shoeColorList} pagination={{ position: ['bottomCenter'] }}>
                    <Column title="Tên Màu" dataIndex="color" key="sosize" />
                    <Column
                        title="Trạng Thái"
                        key="trangthai"
                        render={(record) => (
                            <UpdateStatus trangthai={record.trangthai} id_color={record.id_color} UPDATECOLORSTATUS={UPDATECOLORSTATUS} />
                        )}
                    />
                    <Column
                        title="Action"
                        key="action"
                        render={(text, record) => (
                            <Space size="middle">
                                <DeleteTwoTone onClick={() => dispatch(deleteColorAction(record.id_color))} twoToneColor='red' style={{ fontSize: '30px' }} />
                            </Space>
                        )}
                    />
                </Table>
            </Col>
        </Row>
    )
}
//CSS
import { DeleteTwoTone } from '@ant-design/icons';
import { Table, Space, Row, Col } from 'antd';
//REDUX && REACT
import { useSelector, useDispatch } from "react-redux";
import { getShoeTypeAction, removeShoeTypeAction, deleteTypeAction, updateTypeStatus} from "../../../redux/actions";
import { useEffect } from 'react';
//Components
import UpdateStatus from './UpdateStatus'
const { Column } = Table;
export default function AdminDisplayType() {
    const dispatch = useDispatch();
    const getAdminContent = useSelector(state => state.adminReducer);
    const { shoeTypeList } = getAdminContent;
    useEffect(() => {
        dispatch(getShoeTypeAction());
        return () => {
            dispatch(removeShoeTypeAction())
        }
    }, []);
    function UPDATETYPESTATUS(value,id_kieugiay){
        dispatch(updateTypeStatus(value.tinhtrang,id_kieugiay))
    }

    return (
        <Row style={{ marginTop: '30px' }}>
                        <div style={{ textAlign: 'center', width: '100%' }}>
                <h4>Quản Lý Kiểu Giày</h4>
            </div>
            <Col span={12} offset={6}>
                <Table dataSource={shoeTypeList} pagination={{ position: ['bottomCenter'] }}>
                    <Column title="Kiểu Giày" dataIndex="tenkieugiay" key="id_kieugiay" />
                    <Column
                        title="Trạng Thái"
                        key="tinhtrang"
                        render={(record) => (
                            <UpdateStatus tinhtrang = {record.tinhtrang} id_kieugiay ={record.id_kieugiay} UPDATETYPESTATUS={UPDATETYPESTATUS}/>
                        )}
                    />
                    <Column
                        title="Action"
                        key="action"
                        render={(text, record) => (
                            <Space size="middle">
                                <DeleteTwoTone onClick={() => dispatch(deleteTypeAction(record.id_kieugiay))} twoToneColor='red' style={{ fontSize: '30px' }} />
                            </Space>
                        )}
                    />
                </Table>
            </Col>
        </Row>
    )
}
//CSS
import { DeleteTwoTone } from '@ant-design/icons';
import { Table, Space, Row, Col } from 'antd';
//REDUX && REACT
import { useSelector, useDispatch } from "react-redux";
import { deleteSizeAction, getShoeSizeAction, removeShoeSizeAction, updateSizeStatus} from "../../../redux/actions";
import { useEffect } from 'react';
//Components
import UpdateStatus from './UpdateStatus'
const { Column } = Table;
export default function AdminDisplaySize() {
    const dispatch = useDispatch();
    const getAdminContent = useSelector(state => state.adminReducer);
    const { shoeSizeList } = getAdminContent;
    useEffect(() => {
        dispatch(getShoeSizeAction());
        return () => {
            dispatch(removeShoeSizeAction())
        }
    }, []);
    function UPDATESIZESTATUS(value,id_size){
        dispatch(updateSizeStatus(value.trangthai,id_size))
    }

    return (
        <Row style={{ marginTop: '30px' }}>
                        <div style={{ textAlign: 'center', width: '100%' }}>
                <h4>Quản Lý Kích Thước</h4>
            </div>
            <Col span={12} offset={6}>
                <Table dataSource={shoeSizeList} pagination={{ position: ['bottomCenter'] }}>
                    <Column title="Số Size" dataIndex="sosize" key="sosize" />
                    <Column
                        title="Trạng Thái"
                        key="trangthai"
                        render={(record) => (
                            <UpdateStatus trangthai = {record.trangthai} id_size ={record.id_size} UPDATESIZESTATUS={UPDATESIZESTATUS}/>
                        )}
                    />
                    <Column
                        title="Action"
                        key="action"
                        render={(text, record) => (
                            <Space size="middle">
                                <DeleteTwoTone onClick={() => dispatch(deleteSizeAction(record.id_size))} twoToneColor='red' style={{ fontSize: '30px' }} />
                            </Space>
                        )}
                    />
                </Table>
            </Col>
        </Row>
    )
}
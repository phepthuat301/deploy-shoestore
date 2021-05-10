//CSS
import { Row, Image, Col, Table, Space } from "antd";
import { DeleteTwoTone, EditTwoTone } from '@ant-design/icons';

//REDUX && REACT
import { getNewsAction, removeNewsAction, deleteNewsAction } from "../../../redux/actions";
import { useSelector, useDispatch } from "react-redux";
import { useEffect } from 'react';
import history from "../../../utils/history";
//
const { Column } = Table;
export default function AdminDisplayNews(){
    const dispatch = useDispatch();
    const getNewsContent = useSelector(state => state.adminReducer);
    const { newsList } = getNewsContent;
    useEffect(() => {
        dispatch(getNewsAction());
        return () => {
            dispatch(removeNewsAction())
        }
    }, []);
    newsList.forEach(item =>{
        item.ngayviet = item.ngayviet.replace("T"," ").substr(0,19)
    })
    return(
        <Row style={{ marginTop: '30px' }}>
            <div style={{ textAlign: 'center', width: '100%' }}>
                <h4>Quản Lý Tin Tức</h4>
            </div>
            <Col span={18} offset={3}>
                <Table dataSource={newsList} pagination={{ position: ['bottomCenter'] }}>
                    <Column
                        title="Hình Ảnh"
                        key="image"
                        render={(text, record) => (
                            <Image
                                width={200}
                                src={record.anhbia}
                            />
                        )}
                    />
                    <Column
                        title="Màu Bìa"
                        key="color"
                        render={(text, record) => (
                            <div style={{backgroundColor:`${record.maubia}`,width:'50px',height:'50px'}}></div>
                        )}
                    />
                    <Column title="Người Viết" dataIndex="nguoiviet" key="nguoiviet" />
                    <Column title="Ngày Viết" dataIndex="ngayviet" key="ngayviet" />
                    <Column title="Tiêu Đề" dataIndex="tieude" key="tieude" />
                    <Column title="Loại Tin" dataIndex="loaitintuc" key="loaitintuc" />
                    <Column
                        title="Action"
                        key="action"
                        render={(text, record) => (
                            <Space size="middle">
                                <EditTwoTone twoToneColor="#eb2f96" onClick={()=>{history.push(`/readnews/editnews/${record.id_tintuc}`)}} style={{ fontSize: '25px', marginLeft: '20px' }} />
                                <DeleteTwoTone onClick = {()=>dispatch(deleteNewsAction(record.id_tintuc))}  twoToneColor='red' style={{ fontSize: '30px' }} /> 
                            </Space>
                        )}
                    />
                </Table>
            </Col>
        </Row>
    )
}
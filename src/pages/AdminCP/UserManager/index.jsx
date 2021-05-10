//CSS
import { EditTwoTone } from '@ant-design/icons';
import { Table, Row, Col } from 'antd';
import './style.css';
//REDUX && REACT
import { useSelector, useDispatch } from "react-redux";
import { getUser, removeUserAction, resetPasswordAction, updateRoleAction } from "../../../redux/actions";
import { useEffect } from 'react';
//Components
import UpdateRole from './UpdateRole';
const { Column } = Table;

export default function AdminDisplayUser() {
    const dispatch = useDispatch();
    const getAdminContent = useSelector(state => state.userReducer);
    const { userList } = getAdminContent;
    useEffect(() => {
        dispatch(getUser());
        return () => {
            dispatch(removeUserAction())
        }
    }, []);
    let i = 1;
    function UPDATEROLE(values, id_user) {
        const param = {
            id_user: id_user,
            role: values.role,
        }
        dispatch(updateRoleAction(param))
    }
    return (
        <Row style={{ marginTop: '30px' }}>
            <div style={{ textAlign: 'center', width: '100%' }}>
                <h4>Quản Lý Tài Khoản</h4>
            </div>
            <Col span={22} offset={1}>
                <Table dataSource={userList} pagination={{ position: ['bottomCenter'] }}>

                    <Column
                        title="STT"
                        key="STT"
                        render={(record) => (
                            (i++) / 2
                        )}
                    />
                    <Column title="Họ Tên" dataIndex="hoten" key="hoten" />
                    <Column title="Địa Chỉ" dataIndex="diachi" key="diachi" />
                    <Column title="Số Điện Thoại" dataIndex="sodienthoai" key="diachi" />
                    <Column title="Email" dataIndex="email" key="email" />
                    <Column title="Tên tài khoản" dataIndex="username" key="username" />
                    <Column
                        title="Mật khẩu"
                        key="password"
                        render={(record) => (
                            <>
                                <span>*********</span>
                                <span style={{ cursor: 'pointer' }} onClick={() => dispatch(resetPasswordAction(record.id_user))} >
                                    <EditTwoTone style={{ fontSize: '20px' }} />
                                    <span>Reset</span>
                                </span>
                            </>
                        )}
                    />
                    <Column
                        title="Vai trò"
                        key="role"
                        render={(record) => (
                            <UpdateRole role={record.role} id_user={record.id_user} UPDATEROLE={UPDATEROLE} />
                        )}
                    />
                </Table>
            </Col>
        </Row>
    )
}
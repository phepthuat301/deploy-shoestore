//REACT REDUX
import { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { getShoeDetailAction, removeShoeDetailAction, getGalleryAction, deleteShoeDetailAction, deleteShoeGalleryAction, updateQty } from '../../../../../redux/actions';
//CSS
import { EditTwoTone, DeleteTwoTone, CheckCircleTwoTone } from '@ant-design/icons';
import { Table, Space, Row, Col, Image, Breadcrumb } from 'antd';
//ROUTER & HISTORY
import { Link } from 'react-router-dom';
import { ROUTERS } from '../../../../../constants/router';
//Components
import QUANTY from './UpdateQTY';
export default function AdminDetailProduct(props) {
    const { Column } = Table;
    const { match } = props
    const dispatch = useDispatch();
    const getShoeDetail = useSelector(state => state.productReducer);
    const { shoeDetail, gallery } = getShoeDetail;
    useEffect(() => {
        dispatch(getGalleryAction(match.params.id))
        dispatch(getShoeDetailAction(match.params.id));
        return () => {
            dispatch(removeShoeDetailAction);
        }
    }, []);
    function renderShoeColor(id) {
        let newShoeColor = shoeDetail.filter(item => item.id_color === id)
        return (
            newShoeColor[0]?.color
        )
    }
    function renderShoeSize(id) {
        let newShoeSize = shoeDetail.filter(item => item.id_size === id)
        return (
            newShoeSize[0]?.sosize
        )
    }
    
    function deleteShoeDetail() {
        let id = {}
        for (let i = 0; i < arguments.length; i++) {
            id[i] = arguments[i];
        }
        dispatch(deleteShoeDetailAction(id));
    }
    function UPDATEQTY(value,id_chitietgiay){
        dispatch(updateQty(value.soluong,id_chitietgiay))
    }
    
    return (
        <>
            <Breadcrumb style={{ marginTop: '20px', marginLeft: '20px' }}>
                <Breadcrumb.Item><Link to={ROUTERS.READ_PRODUCT}>Xem Giày</Link></Breadcrumb.Item>
                <Breadcrumb.Item>Chi Tiết Giày</Breadcrumb.Item>
            </Breadcrumb>
            <h4 style={{ textAlign: 'center' }}>Chi Tiết Giày</h4>
            <Row style={{ marginTop: '30px' }}>
                <Col span={22} offset={1}>
                    <Table dataSource={shoeDetail} pagination={{ position: ['none'] }}>
                        <Column
                            title="Tên Mã Giày"
                            key="tenmagiay"
                            render={(record) => (
                                shoeDetail[0]?.tenmagiay
                            )}
                        />
                        <Column
                            title="Màu"
                            key="color"
                            render={(record) => (
                                renderShoeColor(record.id_color)
                            )}
                        />
                        <Column
                            title="Size"
                            key="size"
                            render={(record) => (
                                renderShoeSize(record.id_size)
                            )}
                        />
                        <Column
                            title="Số Lượng"
                            key="soluong"
                            render={(record) => (
                                    <QUANTY id_color={record.id_color} id_size={record.id_size} id_chitietgiay={record.id_chitietgiay} shoeDetail={shoeDetail} UPDATEQTY={UPDATEQTY}/>
                            )}
                        />
                        <Column
                            title="Action"
                            key="action"
                            render={(text, record) => (
                                <Space size="middle">
                                    <DeleteTwoTone onClick={() => deleteShoeDetail(record.id_chitietgiay, record.id_giay, record.id_color)} twoToneColor='red' style={{ fontSize: '30px' }} />
                                </Space>
                            )}
                        />
                    </Table>
                </Col>
            </Row>
            <h4 style={{ textAlign: 'center' }}>Thư Viện Ảnh</h4>
            <Row style={{ marginTop: '30px' }}>
                <Col span={10} offset={7}>
                    <Table dataSource={gallery} pagination={{ position: ['none'] }}>
                        <Column
                            title="Màu"
                            key="color"
                            render={(record) => (
                                record.color
                            )}
                        />
                        <Column
                            title="Ảnh"
                            key="size"
                            render={(record) => (
                                <Image
                                    height={100}
                                    width={150}
                                    src={`/gallery/${record.image}`}
                                />
                            )}
                        />
                        <Column
                            title="Action"
                            key="action"
                            render={(text, record) => (
                                <Space size="middle">
                                    <DeleteTwoTone onClick={() => dispatch(deleteShoeGalleryAction(record.id_gallery))} twoToneColor='red' style={{ fontSize: '30px' }} />
                                </Space>
                            )}
                        />
                    </Table>
                </Col>
            </Row>
        </>
    )
}
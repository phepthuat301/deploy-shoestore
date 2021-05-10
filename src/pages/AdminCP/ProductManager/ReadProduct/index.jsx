//CSS
import { EditTwoTone, DeleteTwoTone } from '@ant-design/icons';
import { Table, Space, Row, Col, Button, Image } from 'antd';
import { SearchOutlined } from "@ant-design/icons";
//REDUX && REACT
import { useSelector, useDispatch } from "react-redux";
import { getShoeAction, getShoeTypeAction, removeShoeAction, deleteShoeAction, removeShoeTypeAction, removeSaleAction, getSaleAction, updateShoeSaleAction } from "../../../../redux/actions";
import { useEffect, useState } from 'react';
//COMPONENTS
import history from '../../../../utils/history';
import UpdateSale from './UpdateSale';
//
export default function ReadProduct() {
    const dispatch = useDispatch();
    const getShoe = useSelector(state => state.productReducer);
    const getAdmin = useSelector(state => state.adminReducer);
    const { shoeTypeList,saleList } = getAdmin;
    const { shoeList } = getShoe;
    const { Column } = Table;
    useEffect(() => {
        dispatch(getSaleAction())
        dispatch(getShoeAction());
        dispatch(getShoeTypeAction());
        return () => {
            dispatch(removeSaleAction())
            dispatch(removeShoeAction());
            dispatch(removeShoeTypeAction());
        }
    }, []);
    function renderShoeType(id) {
        let newShoeType = shoeTypeList.filter(item => item.id_kieugiay === id)
        return (
            newShoeType[0]?.tenkieugiay
        )
    }
    const [searchKey,setSearchKey] = useState('')
    const filterShoeList = shoeList.filter((item) => {
        return item.tenmagiay.trim().toLowerCase().indexOf(searchKey.trim().toLowerCase()) !== -1;
    });
    function UPDATESALE(value,id_giay,makhuyenmai){
        dispatch(updateShoeSaleAction(value.id_khuyenmai,id_giay,makhuyenmai))
    }
    return (
        <Row style={{ marginTop: '30px' }}>
            <div style={{ textAlign: 'center', width: '100%' }}>
                <h4>Danh Sách Sản Phẩm</h4>
                <div className="search-admin">
                    <div className="searchbar" >
                        <SearchOutlined className="searchbar-icon" />
                        <input onChange={(e)=> setSearchKey(e.target.value)}
                            className="search-input searchbar-input"
                            placeholder="Tìm sản phẩm"
                            type="text"
                        />
                    </div>
                </div>
            </div>
            <Col span={22} offset={1}>
                <Table dataSource={filterShoeList} pagination={{ position: ['bottomCenter'] }}>
                    <Column title="Tên Giày" dataIndex="tengiay" key="tengiay" />
                    <Column title="Tên Mã Giày" dataIndex="tenmagiay" key="tenmagiay" />
                    <Column
                        title="Kiểu Giày"
                        key="kieugiay"
                        render={(record) => (
                            renderShoeType(record.id_kieugiay)
                        )}
                    />
                    <Column
                        title="Hình Ảnh"
                        key="hinhanh"
                        render={(record) => (
                            <Image
                                height={100}
                                width={150}
                                src={`/gallery/${record.hinhanh}`}
                            />
                        )}
                    />
                    <Column title="Giá Bán" dataIndex="giaban" key="giaban" />
                    <Column
                        title="Khuyến Mãi"
                        key="khuyenmai"
                        render={(record) => (
                            <UpdateSale makhuyenmai={record.makhuyenmai} id_khuyenmai={record.id_khuyenmai} id_giay={record.id_giay} UPDATESALE={UPDATESALE} saleList={saleList}/>
                        )}
                    />
                    <Column
                        title="Tình Trạng"
                        key="tinhtrang"
                        render={(record) => (
                            record.tinhtrang === 1 ? 'Kích Hoạt' : 'Không Kích Hoạt'
                        )}
                    />
                    <Column
                        title="Action"
                        key="action"
                        render={(text, record) => (
                            <Space size="middle">
                                <Button type="primary" style={{ width: '100px' }} onClick={() => history.push(`/detailproducts/${record.id_giay}`)}>Chi Tiết</Button>
                                <EditTwoTone onClick={() => history.push(`/editproduct/${record.id_giay}`)} twoToneColor="#eb2f96" style={{ fontSize: '30px' }} />
                                <DeleteTwoTone onClick={() => dispatch(deleteShoeAction(record.id_giay))} twoToneColor='red' style={{ fontSize: '30px' }} />
                            </Space>
                        )}
                    />
                </Table>
            </Col>
        </Row>
    )
}
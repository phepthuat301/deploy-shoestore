import React from 'react'
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
//CSS
import './style.css'
import { Spin, Pagination } from 'antd'
import { LoadingOutlined } from '@ant-design/icons';
import Lazy from '../Home/Components/Lazy';

//Components
import Searchbar from '../../components/Searchbar'
import Item from './Components/item'
//Action
import { removeShoeOnPageAction, getPageAction, getShoeOnPageAction, getShoeTypeAction, removeShoeTypeAction, removeShoeOnShoeTypeAction, getShoeOnShoeTypeAction, getActiveShoeAction, removeActiveShoeAction } from '../../redux/actions';
function ProductList() {
    const antIcon = <LoadingOutlined style={{ fontSize: 40 }} spin />;
    const dispatch = useDispatch();

    const getProductListContent = useSelector((state) => state.productReducer);
    const getAdminContent = useSelector((state) => state.adminReducer);
    const { shoeTypeList } = getAdminContent;
    const { shoeActive, shoeListOnPage, loading, error, page, shoeListOnShoeType } = getProductListContent;

    
    useEffect(() => {
        dispatch(getActiveShoeAction())
        dispatch(getShoeTypeAction())
        dispatch(getShoeOnPageAction(1));
        dispatch(getPageAction());
        return () => {
            dispatch(removeActiveShoeAction())
            dispatch(removeShoeOnPageAction())
            dispatch(removeShoeTypeAction())
            dispatch(removeShoeOnShoeTypeAction())
        }
    }, []);
    //Phân Trang
    function onChange(values) {
        dispatch(getShoeOnPageAction(values));
    }
    //Tìm kiếm
    const [searchKey, setSearchKey] = useState('');
    let filterShoeList = [];
    if (searchKey === '') {
        filterShoeList = shoeListOnPage;
    } else {
        filterShoeList = shoeActive.filter((item) => {
            return (
                item.tenmagiay.trim().toLowerCase().indexOf(searchKey.trim().toLowerCase()) !== -1
                || item.tengiay.trim().toLowerCase().indexOf(searchKey.trim().toLowerCase()) !== -1
                )
        });
    }
    //Filter theo Category
    if (shoeListOnShoeType?.length > 0) {
        filterShoeList = shoeListOnShoeType;
    } 
    if(shoeListOnShoeType?.length > 0 && searchKey !== ''){
        filterShoeList = shoeActive.filter((item) => {
            return (
                item.tenmagiay.trim().toLowerCase().indexOf(searchKey.trim().toLowerCase()) !== -1
                || item.tengiay.trim().toLowerCase().indexOf(searchKey.trim().toLowerCase()) !== -1
                )
        });
    }
    return (
        <>
            <div className="container-product">
                <Lazy
                    subtitleHeading="Giảm"
                    offer="20%"
                    subtitleFooter="Khi Mua Hàng Online"
                    className="lazy-product-list"
                // text="Miễn Phí Vận Chuyển Với Đơn Hàng Trên 1 Triệu"
                />
                <div className="row search-line">
                    <div className="col-sm-6 col-md-4 col-lg-3">
                        <div className="row">
                            <Searchbar setSearchKey={setSearchKey} />
                            <div className="category">
                                <h4 className="title-category">Danh Mục</h4>
                                <ul className="list-category">
                                    <li onClick={() =>  {dispatch(removeShoeOnShoeTypeAction());setSearchKey("")}} className="item-cate">Tất Cả Giày</li>
                                    {shoeTypeList.map((item, index) => {
                                        return (
                                            <>
                                                <li key={index} onClick={() => {dispatch(getShoeOnShoeTypeAction(item.id_kieugiay));setSearchKey("")}} className="item-cate">{item.tenkieugiay}</li>
                                            </>
                                        )
                                    })}
                                </ul>
                            </div>
                        </div>

                    </div>

                    <div className="col-sm-6 col-md-8 col-lg-9 list-prodcut">
                        <div className="row">
                            {loading ? (
                                <div className="loading-icon">
                                    <Spin indicator={antIcon} />
                                </div>
                            ) : error ? (
                                <h2>{error}</h2>
                            ) : (
                                filterShoeList.map((item, index) => {
                                    return <Item
                                        key={index}
                                        shoeTypeID={item.id_kieugiay}
                                        shoeID={item.id_giay}
                                        shoeName={item.tengiay}
                                        shoeCode={item.tenmagiay}
                                        shoePrice={item.giaban}
                                        shoeSale={(item.giaban * (100 - item.phantramkhuyenmai) / 100).toLocaleString('vi-VN')}
                                        phantram={item.phantramkhuyenmai}
                                        shoeImg={item.hinhanh}
                                        trangthai={item.trangthai}
                                    />
                                })
                            )
                            }
                        </div>
                    </div>
                    {searchKey === '' && shoeListOnShoeType.length === 0 ? <Pagination onChange={onChange} defaultCurrent={1} total={page * 10} /> : null}

                </div>
            </div>
        </>
    )
}

export default ProductList;

//CSS
import StarRatings from 'react-star-ratings';
import Slider from "react-slick";
import swal from 'sweetalert'
import '../ProductDetail/styles.css'
import { Select, Collapse, Space, Spin, Image } from 'antd'
import { LoadingOutlined } from '@ant-design/icons';
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import parse from 'html-react-parser';
//REACT REDUX
import { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import React from 'react'
//Components
import { removeRelateProductAction, getShoeDetailAction, removeShoeDetailAction, getGalleryAction, addToCart, getRelateProductAction, removeGalleryAction, getCommentAction, removeCommentAction } from '../../redux/actions';
import ProductRelate from './Component/ProductRelate';
import { config } from './config'
import CommentForm from './Component/CommentForm';


function ProductDetail(props) {
    const { Panel } = Collapse;
    const { match } = props;
    const dispatch = useDispatch();
    const detailPageContent = useSelector(state => state.productReducer);
    const { loading, error, shoeDetail, gallery, relateProduct } = detailPageContent;
    const comment = useSelector(state => state.commentReducer);
    const { commentList } = comment
    const antIcon = <LoadingOutlined style={{ fontSize: 40 }} spin />;

    useEffect(() => {
        dispatch(getGalleryAction(match.params.id));
        dispatch(getShoeDetailAction(match.params.id));
        dispatch(getRelateProductAction(match.params.id_kieugiay))
        dispatch(getCommentAction(match.params.id))
        return () => {
            dispatch(removeCommentAction())
            dispatch(removeShoeDetailAction());
            dispatch(removeRelateProductAction());
            dispatch(removeGalleryAction());
        }
    }, [match.params.id]);
    //lọc màu ảnh
    let tempGallery = [...gallery];
    let newGallery = [tempGallery[0]];
    if (tempGallery.length > 1) {
        for (let i = 0; i < tempGallery.length; i++) {
            if (newGallery.some(item => item.id_color === tempGallery[i].id_color) === false) {
                newGallery.push(tempGallery[i]);
            }
        }
    } else newGallery = [...tempGallery];

    const [selectedColor, setSelectedColor] = useState("");
    const [selectedSize, setSelectedSize] = useState("");

    const { Option } = Select;





    function handleChange(value) {
        setSelectedSize(value);
    }
    //lọc size theo màu
    const newSize = shoeDetail.filter(item => item.color === selectedColor)

    //Lọc số lượng theo màu và size
    const maxSoluong = newSize.filter(item => item.color === selectedColor && item.sosize === selectedSize)

    function addProductCart() {
        if (selectedColor === "") {
            swal("Vui lòng chọn màu", "", "warning");
        }
        else if (selectedSize === "") {
            swal("Vui lòng chọn size", "", "warning");
        } else {
            let newPrice;
            if (shoeDetail[0]?.trangthai === "Đang Bắt Đầu") {
                newPrice = shoeDetail[0]?.giaban * (100 - shoeDetail[0]?.phantramkhuyenmai) / 100
            } else newPrice = shoeDetail[0]?.giaban
            const newCartProduct = {
                id_chitietgiay: maxSoluong[0]?.id_chitietgiay,
                id_giay: shoeDetail[0]?.id_giay,
                tengiay: shoeDetail[0]?.tengiay,
                tenmagiay: shoeDetail[0]?.tenmagiay,
                hinhanh: shoeDetail[0]?.hinhanh,
                giakm: newPrice,
                color: selectedColor,
                sosize: selectedSize,
                soluong: 1,
                maxSoluong: maxSoluong[0]?.soluong
            }

            dispatch(addToCart(newCartProduct));
        }
    }
    let totalStar = 0;
    let averageStar = 0;
    if (commentList.length > 0) {
        commentList.map(item => {
            totalStar += item.sosao;
        })
        averageStar = totalStar / commentList.length
    }
    return (
        <div>
            {loading ? (
                <div className="loading-icon">
                    <Spin indicator={antIcon} />
                </div>
            ) : (
                error ? (
                    <h2>{error}</h2>
                ) : (
                    <>
                        <div className="container detail-product">
                            <div className="row">
                                <div className="col-sm-12 col-md-6 justify-content-center">
                                    <Slider {...config}>
                                        {gallery.map((item, index) => {
                                            return <Image key={index} className="img-center d-flex" src={`/Gallery/${item.image}`} alt="Product Preview" />
                                        })}
                                    </Slider>

                                </div>
                                <div className="col-sm-12 col-md-6 justify-content-center detail">
                                    <div className="w-100 content-detail">
                                        <h2 className="text-center">{shoeDetail[0]?.tengiay}</h2>

                                        <p>Mã giày: &nbsp;
                                        <span className="span-text">{shoeDetail[0]?.tenmagiay}</span>
                                        </p>

                                        <p>Chọn màu: </p>
                                        <div className="w-100 product-color d-flex pb-3">
                                            {newGallery.map((item, index) => {
                                                return (
                                                    <>
                                                        <span key={index} className="span-text">{item.color}</span>
                                                        <img onClick={() => setSelectedColor(item.color)} className={selectedColor == item.color ? 'img-product-color mr-md-3 smallImageIcon selectedColor' : 'img-product-color mr-md-3 smallImageIcon'} src={`/Gallery/${item.image}`} alt="Product Preview" />
                                                    </>
                                                )
                                            })}
                                        </div>

                                        <div className="size-product">
                                            <div className="size-product-text">
                                                <p>Kích thước: </p>
                                            </div>
                                            <div>

                                                <Select defaultValue="Chọn kích thước" className="size-select" onChange={handleChange} disabled={selectedColor === "" ? true : false}>
                                                    {newSize.map((item, index) => {
                                                        return <Option key={index} value={item.sosize} disabled={item.soluong === 0 ? true : false}>{item.soluong === 0 ? "Hết Hàng" : item.sosize}</Option>
                                                    })}
                                                </Select>
                                            </div>
                                        </div>
                                        {shoeDetail[0]?.trangthai === "Đang Bắt Đầu"
                                            ? (
                                                <>
                                                    <p style={{ fontSize: "16px" }}>Giá bán: &nbsp;
                                                        <del>{shoeDetail[0]?.giaban.toLocaleString('vn-Vi')} VNĐ</del>
                                                        <span className="discount-detail">- {shoeDetail[0]?.phantramkhuyenmai}%</span>
                                                    </p>
                                                    <p style={{ fontSize: "16px" }}>Giá khuyến mãi: &nbsp;
                                                        <span className="span-text">{(shoeDetail[0]?.giaban * (100 - shoeDetail[0]?.phantramkhuyenmai) / 100).toLocaleString('vn-Vi')} VNĐ</span> 
                                                    </p>
                                                </>
                                            ) : (
                                                <>
                                                    <p style={{ fontSize: "16px" }}>Giá bán: &nbsp;
                                                        <span className="span-text">{shoeDetail[0]?.giaban.toLocaleString('vn-Vi')} VNĐ</span>
                                                    </p>
                                                </>
                                            )
                                        }
                                        <div className="add-to-cart">
                                            <button className="show-hide-button add-product-button" onClick={() => addProductCart()}>
                                                <span className="review-show-button">Thêm Vào Giỏ</span>
                                            </button>
                                        </div>
                                    </div>



                                </div>
                            </div>
                            <div className="row detail-collapse">
                                <Space direction="vertical">
                                    <Collapse collapsible="header" defaultActiveKey={1} >
                                        <Panel header="CHI TIẾT SẢN PHẨM" key="1">
                                            {parse(`${shoeDetail[0]?.noidung}`)}
                                        </Panel>
                                        <Panel header="BẢO HÀNH & ĐỔI" key="2">
                                            <p>- Bảo hành trọn đời với các trường hợp: bung keo, sứt chỉ, khô keo.</p>

                                            <p>- Freeship với các đơn hàng trong khu vực nội thành HỘI AN.</p>

                                            <p>- Đổi size trong vòng 07 ngày kể từ thời điểm nhận hàng.</p>
                                        </Panel>
                                        <Panel header="HƯỚNG DẪN CHỌN SIZE" key="3">
                                            <h5>01. VẼ KHUNG BÀN CHÂN</h5>
                                            <p>Đặt bàn chân lên tờ giấy trắng, dùng bút đánh dấu theo khung bàn chân trên giấy.</p>
                                            <img src="https://cdn.shopify.com/s/files/1/1404/4249/files/1_final_240x240.jpg?v=1569842532" alt="ảnh 1" />
                                            <h5>02. ĐO CHIỀU DÀI BÀN CHÂN</h5>
                                            <p>Dùng thước để đo chiều dài lớn nhất từ mũi chân đến gót chân trên khung bàn chân đã đánh dấu.</p>
                                            <img src="https://cdn.shopify.com/s/files/1/1404/4249/files/2_final_240x240.jpg?v=1569842827" alt="ảnh 2" />
                                            <h5>03. ĐO ĐỘ RỘNG VÒNG CHÂN</h5>
                                            <p>Lấy thước dây quấn quanh 1 vòng bàn chân từ khớp ngón chân cái đến khớp ngón chân út.</p>
                                            <img src="https://cdn.shopify.com/s/files/1/1404/4249/files/3_final_240x240.jpg?v=1569842906" alt="ảnh 3" />
                                            <h5>04. THAM KHẢO BẢNG SIZE TƯƠNG ỨNG</h5>
                                            <img src="https://cdn.shopify.com/s/files/1/1404/4249/files/giay-dong-hai-bang-size-giay-nu_1024x1024.jpg?v=1576819561" alt="ảnh 4" />
                                            <img src="https://cdn.shopify.com/s/files/1/1404/4249/files/giay-dong-hai-bang-size-giay-nam_1024x1024.jpg?v=1576819610" alt="ảnh 5" />
                                        </Panel>
                                        <Panel header={(
                                            <>
                                                {commentList.length > 0
                                                    ? (
                                                        <div>
                                                            <span>{commentList.length} ĐÁNH GIÁ &nbsp; &nbsp;
                                                                <StarRatings
                                                                    name='rating'
                                                                    rating={averageStar}
                                                                    starRatedColor='#fadb14'
                                                                    starDimension="15px"
                                                                    starSpacing="2px"
                                                                />
                                                            </span>
                                                        </div>
                                                    ) : (
                                                        <span>CHƯA CÓ ĐÁNH GIÁ&nbsp; &nbsp;
                                                                <StarRatings
                                                                    name='rating'
                                                                    rating={0}
                                                                    starRatedColor='#fadb14'
                                                                    starDimension="15px"
                                                                    starSpacing="2px"
                                                                />
                                                            </span>
                                                    )}

                                            </>
                                        )}
                                        key={4}>
                                            <CommentForm id_giay={match.params.id} commentList={commentList} />
                                        </Panel>
                                    </Collapse>
                                </Space>
                            </div>
                        </div>
                        <ProductRelate relateProduct={relateProduct} />
                    </>
                )
            )
            }
        </div >
    )
}

export default ProductDetail
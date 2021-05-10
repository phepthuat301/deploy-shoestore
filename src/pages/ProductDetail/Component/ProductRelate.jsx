import React from 'react'
//CSS
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { settings } from '../Component/config'
//History
import history from '../../../utils/history';

function ProductRelate(props) {
    const { relateProduct } = props
    return (
        <div>
            <section className="relate-product">
                <div className="container">
                    <div className="title-relative">
                        <h3 className="relative-text">Sản Phẩm Tương Tự</h3>
                    </div>
                    <div className="slider-slick">
                        <Slider {...settings}>
                            {relateProduct.map((item, index) => {
                                return (
                                    <div key={index} className="img-card" onClick={() => history.push(`/products/${item.id_giay}/${item.id_kieugiay}`)}>
                                        <div className="product-best2">
                                            <div className="product-image-container2">
                                                <img className="img" src={`/gallery/${item.hinhanh}`} style={{ maxHeight: '200px' }} alt="IMG PRODUCT" />
                                            </div>
                                            <div className="card-body">
                                                <div className="product-footer-heading">
                                                    <h3>{item.tengiay} - {item.tenmagiay}</h3>
                                                </div>
                                                <div className="product-footer-prices">
                                                    <span className="product-price-discount">
                                                        {item.giakm.toLocaleString('vi-VN')} VNĐ
                                                    </span>
                                                    <span className="product-price-old">
                                                        {item.giaban.toLocaleString('vi-VN')} VNĐ
                                                    </span>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                )
                            })}
                        </Slider>
                    </div>
                </div>
            </section>
        </div>
    )
}

export default ProductRelate;

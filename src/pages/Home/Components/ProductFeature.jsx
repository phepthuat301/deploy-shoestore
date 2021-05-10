import React from 'react'
import history from "../../../utils/history"

import '../style.css'

function ProductFeature(props) {
    const { newProduct } = props
    return (

        <section className="best-product">

            <div className="container">
                <div className="title-best-product">
                    <div className="title-line"></div>
                    <h3 className="title-heading">SẢN PHẨM MỚI NHẤT</h3>
                    <div className="title-line"></div>
                </div>
                <div className="row">
                    {newProduct.map((item, index) => {
                        return (
                            <div key={index} onClick={() => history.push(`/products/${item.id_giay}/${item.id_kieugiay}`)} className="product-item col-10 col-md-6 col-lg-4 mx-auto" >
                                <div className="product-best" onClick={() => history.push(`/`)}>
                                    <div className="product-image-container">
                                        {item.trangthai === "Đang Bắt Đầu"
                                            && (
                                                <div class="new-label1">-{item.phantramkhuyenmai}%</div>
                                            )
                                        }
                                        <img className="best-product-img" src={`/gallery/${item.hinhanh}`} alt="IMG PRODUCT" />
                                    </div>
                                    <div className="product-footer">
                                        <div className="product-footer-heading">
                                            <h3>{item.tengiay} - {item.tenmagiay}</h3>
                                        </div>
                                        <div className="product-footer-prices">
                                            <span>
                                                {item.trangthai === "Đang Bắt Đầu"
                                                    ? (
                                                        <>
                                                            <span className="product-price-discount">
                                                                {(item.giaban * (100 - item.phantramkhuyenmai) / 100).toLocaleString('vi-VN')} VNĐ
                                                            </span>
                                                            <span className="product-price-old">
                                                                {item.giaban.toLocaleString('vi-VN')} VNĐ
                                                            </span>
                                                        </>

                                                    )
                                                    : (
                                                        <span className="product-price-discount">
                                                            {item.giaban.toLocaleString('vi-VN')} VNĐ
                                                        </span>
                                                    )
                                                }
                                            </span>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        )
                    })}
                </div>
            </div>
        </section>
    )
}

export default ProductFeature

import history from "../../../utils/history"
function Item(props) {
    const { shoeID, shoeName, shoeCode, shoePrice, shoeSale, shoeImg, shoeTypeID, trangthai, phantram } = props
    return (
        <div className="col-lg-3 product-col">
            <div class="product-card">

                {trangthai === "Đang Bắt Đầu"
                    && (
                        <div class="new-label1">-{phantram}%</div>
                    )
                }
                
                <div class="product-tumb" onClick={() => history.push(`/products/${shoeID}/${shoeTypeID}`)}>
                    <img src={`/Gallery/${shoeImg}`} alt="" />
                </div>
                <div class="product-details">
                    <h6>{shoeName} - {shoeCode}</h6>
                    <div className="border-divide"></div>
                    <div class="product-bottom-details">
                        {trangthai === "Đang Bắt Đầu"
                            ? (
                                <div class="product-price">
                                    <small>{shoePrice.toLocaleString('vn-Vi')} VNĐ</small>
                                    <p>{shoeSale.toLocaleString('vn-Vi')} VNĐ</p>
                                </div>
                            ) : (
                                <div class="product-price">
                                    <p>{shoePrice.toLocaleString('vn-Vi')} VNĐ</p>
                                </div>
                            )
                        }

                    </div>
                </div>
            </div>
        </div>
    );
};
export default Item;
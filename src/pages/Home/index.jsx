//React
import './style.css'
import React from 'react';
//Components
import SliderTitle from './Components/Slider';
import ProductFeature from './Components/ProductFeature';
import Lazy from './Components/Lazy';
import BestProduct from './Components/BestProduct';
//REDUX && REACT
import { useSelector, useDispatch } from "react-redux";
import { getBestSellingAction,getNewProductAction,removeNewProductAction,removeBestSellingAction, getSaleAction, removeSaleAction } from "../../redux/actions";
import { useEffect } from 'react';



function Home() {
    const dispatch = useDispatch();
    const getHomeContent = useSelector(state => state.productReducer);
    const { bestSelling, newProduct } = getHomeContent;

    useEffect(() => {
        dispatch(getBestSellingAction());
        dispatch(getNewProductAction());
        return () => {
            dispatch(removeNewProductAction())
            dispatch(removeBestSellingAction())
        }
    }, []);
    return (
        <div className="container1">
            <SliderTitle />
            <section className="service-info">
                <div className="content-service">
                    <div className="content1 respon1">
                        <h5 className="service-title">Miễn Phí Vận Chuyển Nội Thành</h5>
                    </div>

                    <div className="content2 respon2">
                        <h5 className="service-title">Đổi Trả Trong Vòng 7 Ngày</h5>

                        <span className="detail-service">
                            Dễ dàng đổi trả trong vòng 7 ngày nếu không hài lòng
                        </span>
                    </div>

                    <div className="content1 respon1">
                        <h5 className="service-title">Bảo Hành Trọn Đời</h5>

                        <span className="detail-service">
                            Bảo hành vĩnh viễn tất cả sản phẩm mua ở Như Ý
                        </span>
                    </div>
                </div>
            </section>
            <BestProduct bestSelling={bestSelling} />
            <Lazy
                subtitleHeading="Giảm"
                offer="20%"
                subtitleFooter="Khi Mua Hàng Online"
                text="Miễn Phí Vận Chuyển Với Đơn Hàng Trên 1 Triệu"
            />
            <ProductFeature newProduct={newProduct} />
        </div>
    )
}
export default Home;
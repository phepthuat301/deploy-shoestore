import React from 'react'
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
//React-Redux
import { useSelector, useDispatch } from "react-redux";
import { useEffect } from 'react';
import { getBannerAction, removeBannerAction } from '../../../redux/actions';
function SliderTitle() {
    const dispatch = useDispatch();
    const getBannerHome = useSelector(state => state.adminReducer);
    const { bannerList } = getBannerHome;
    useEffect(() => {
        dispatch(getBannerAction());
        return () => {
            dispatch(removeBannerAction())
        }
    }, []);
    const settings = {
        dots: false,
        infinite: true,
        fade: false,
        autoplaySpeed: 2000,
        speed: 500,
        slidesToShow: 1,
        arrows: false,
        autoplay: true,
        slidesToScroll: 1
    };
    return (
        <>
            <Slider {...settings} className="slider-home">
                {bannerList.map((item, index) => {
                    return (
                        <div className="img-card-home" key={index}>
                            <img className="img-slider" style={{ width: '100%', maxHeight: '800px' }} src={item.url_banner} alt="IMG PRODUCT" />
                        </div>
                    )
                })}
            </Slider>
        </>
    )
}

export default SliderTitle

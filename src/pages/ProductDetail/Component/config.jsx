export const settings = {
    dots: false,
    infinite: true,
    speed: 800,
    slidesToShow: 4,
    autoplay: false,
    arrows: true,
    autoplaySpeed: 2000,
    slidesToScroll: 4,
    initialSlide: 0,
    responsive: [
        {
            breakpoint: 1024,
            settings: {
                slidesToShow: 3,
                slidesToScroll: 3,
                infinite: true,
                dots: false
            }
        },
        {
            breakpoint: 600,
            settings: {
                slidesToShow: 2,
                slidesToScroll: 2,
                arrows: false,
                infinite: true,
                initialSlide: 2
            }
        },
        {
            breakpoint: 480,
            settings: {
                slidesToShow: 1,
                arrows: false,
                infinite: true,
                slidesToScroll: 1
            }
        }
    ]
};

export const config = {
    dots: false,
    infinite: true,
    autoplaySpeed: 2000,
    arrows: false,
    autoplay: false,
    speed: 800,
    // slidesToShow: 1,
    // slidesToScroll: 1
};

import swal from 'sweetalert';
import { ROUTERS } from '../../constants/router';
import history from '../../utils/history';
const initialState = {
    shoeTypeList: [],
    shoeSizeList: [],
    shoeColorList: [],
    distinctColor: [],
    orderList: [],
    orderDetailList: [],
    revenueData: [],
    shoeTotalData: [],
    dayRevenueData: [],
    dayShoeTotalData: [],
    saleList: [],
    shoeListOnShoeTypeAdmin: [],
    shoeCode: [],
    isUpdate: false,
    banner: '',
    bannerList: [],
    newsList: [],
    newsDetail: {},
};

export default function adminReducer(state = initialState, action) {
    switch (action.type) {
        case "GET_SHOE_TYPE_REQUEST":
            return {
                ...state,
                loading: true,
            };
        case "GET_SHOE_TYPE_SUCCESS":
            return {
                ...state,
                shoeTypeList: action.payload,
                loading: false,
            };
        case "GET_SHOE_TYPE_FAIL":
            return {
                ...state,
                loading: false,
                error: action.payload,
            };


        case "GET_SHOE_COLOR_REQUEST":
            return {
                ...state,
                loading: true,
            };
        case "GET_SHOE_COLOR_SUCCESS":
            return {
                ...state,
                shoeColorList: action.payload,
                loading: false,
            };
        case "GET_SHOE_COLOR_FAIL":
            return {
                ...state,
                loading: false,
                error: action.payload,
            };



        case "GET_SHOE_SIZE_REQUEST":
            return {
                ...state,
                loading: true,
            };
        case "GET_SHOE_SIZE_SUCCESS":
            return {
                ...state,
                shoeSizeList: action.payload,
                loading: false,
            };
        case "GET_SHOE_SIZE_FAIL":
            return {
                ...state,
                loading: false,
                error: action.payload,
            };

        case "CREATE_SHOE_REQUEST":
            return {
                ...state,
                loading: true,
            };
        case "CREATE_SHOE_SUCCESS":
            swal("Thêm Sản Phẩm Thành Công!!", "", "success");
            return {
                ...state,
                loading: false,
            };
        case "CREATE_SHOE_FAIL":
            return {
                ...state,
                loading: false,
                error: action.payload,
            };

        case "CREATE_SHOE_DETAIL_REQUEST":
            return {
                ...state,
                loading: true,
            };
        case "CREATE_SHOE_DETAIL_SUCCESS":
            swal("Thêm Chi Tiết Sản Phẩm Thành Công!!", "", "success");
            return {
                ...state,
                loading: false,
            };
        case "CREATE_SHOE_DETAIL_FAIL":
            return {
                ...state,
                loading: false,
                error: action.payload,
            };

        case "CREATE_GALLERY_REQUEST":
            return {
                ...state,
                loading: true,
            };
        case "CREATE_GALLERY_SUCCESS":
            swal("Thêm Ảnh Vào Gallery Thành Công", "", "success");
            return {
                ...state,
                loading: false,
            };
        case "CREATE_GALLERY_FAIL":
            return {
                ...state,
                loading: false,
                error: action.payload,
            };



        case "GET_DISTINCT_COLOR_REQUEST":
            return {
                ...state,
                loading: true,
            };
        case "GET_DISTINCT_COLOR_SUCCESS":
            return {
                ...state,
                distinctColor: action.payload,
                loading: false,
            };
        case "GET_DISTINCT_COLOR_FAIL":
            return {
                ...state,
                loading: false,
                error: action.payload,
            };


        case "UP_LOAD_FILE_REQUEST":
            return {
                ...state,
                loading: true,
            };
        case "UP_LOAD_FILE_SUCCESS":
            return {
                ...state,
                loading: false,
            };
        case "UP_LOAD_FILE_FAIL":
            return {
                ...state,
                loading: false,
                error: action.payload,
            };



        case "UPDATE_SHOE_REQUEST":
            return {
                ...state,
                loading: true,
            };
        case "UPDATE_SHOE_SUCCESS":
            swal("Cập nhật thành công!", {
                buttons: {
                    update: {
                        text: "OK",
                        value: true,
                    },
                },
            })
                .then((value) => {
                    switch (value) {
                        case "update":
                            history.push(ROUTERS.READ_PRODUCT)
                            break;
                        default:
                            history.push(ROUTERS.READ_PRODUCT)
                    }
                });
            return {
                ...state,
                loading: false,
            };
        case "UPDATE_SHOE_FAIL":
            return {
                ...state,
                loading: false,
                error: action.payload,
            };


        case "CREATE_SIZE_REQUEST":
            return {
                ...state,
                loading: true,
            };
        case "CREATE_SIZE_SUCCESS":
            if (action.payload === 'Đã Tồn Tại') {
                swal("Thêm Size Thất Bại!", "Size đã tồn tai", "warning");
            } else swal("Thêm Size Thành Công!!", "", "success");
            return {
                ...state,
                loading: false,
            };
        case "CREATE_SIZE_FAIL":
            return {
                ...state,
                loading: false,
                error: action.payload,
            };

        case "CREATE_COLOR_REQUEST":
            return {
                ...state,
                loading: true,
            };
        case "CREATE_COLOR_SUCCESS":
            if (action.payload === 'Đã Tồn Tại') {
                swal("Thêm Color Thất Bại!", "Color đã tồn tai", "warning");
            } else swal("Thêm Color Thành Công!!", "", "success");
            return {
                ...state,
                loading: false,
            };
        case "CREATE_COLOR_FAIL":
            return {
                ...state,
                loading: false,
                error: action.payload,
            };

        case "CREATE_TYPE_REQUEST":
            return {
                ...state,
                loading: true,
            };
        case "CREATE_TYPE_SUCCESS":
            if (action.payload === 'Đã Tồn Tại') {
                swal("Thêm Kiểu Giày Thất Bại", "Kiểu giày đã tồn tại", "warning");
            } else swal("Thêm Kiểu Giày Thành Công!!", "", "success");
            return {
                ...state,
                loading: false,
            };
        case "CREATE_TYPE_FAIL":
            return {
                ...state,
                loading: false,
                error: action.payload,
            };


        case "UPDATE_SIZE_STATUS_REQUEST":
            return {
                ...state,
                loading: true,
            };
        case "UPDATE_SIZE_STATUS_SUCCESS":
            const newUpdateStatus = state.shoeSizeList;
            newUpdateStatus.map(item => {
                if (item.id_size === action.payload.id_size) {
                    item.trangthai = parseInt(action.payload.trangthai)
                }
                return newUpdateStatus;
            })
            return {
                ...state,
                shoeSizeList: newUpdateStatus,
                loading: false,
            };

        case "UPDATE_SIZE_STATUS_FAIL":
            return {
                ...state,
                loading: false,
                error: action.payload,
            };

        case "UPDATE_COLOR_STATUS_REQUEST":
            return {
                ...state,
                loading: true,
            };
        case "UPDATE_COLOR_STATUS_SUCCESS":
            const newUpdateStatusColor = state.shoeColorList;
            newUpdateStatusColor.map(item => {
                if (item.id_color === action.payload.id_color) {
                    item.trangthai = parseInt(action.payload.trangthai)
                }
                return newUpdateStatusColor;
            })
            return {
                ...state,
                shoeColorList: newUpdateStatusColor,
                loading: false,
            };

        case "UPDATE_COLOR_STATUS_FAIL":
            return {
                ...state,
                loading: false,
                error: action.payload,
            };

        case "UPDATE_TYPE_STATUS_REQUEST":
            return {
                ...state,
                loading: true,
            };
        case "UPDATE_TYPE_STATUS_SUCCESS":
            const newUpdateStatusType = state.shoeTypeList;
            newUpdateStatusType.map(item => {
                if (item.id_kieugiay === action.payload.id_kieugiay) {
                    item.tinhtrang = parseInt(action.payload.tinhtrang)
                }
                return newUpdateStatusType;
            })
            return {
                ...state,
                shoeTypeList: newUpdateStatusType,
                loading: false,
            };

        case "UPDATE_TYPE_STATUS_FAIL":
            return {
                ...state,
                loading: false,
                error: action.payload,
            };

        case "DELETE_COLOR_REQUEST":
            return {
                ...state,
                loading: true,
            };
        case "DELETE_COLOR_SUCCESS":
            if (action.payload.data === 'error') {
                swal("Xóa Màu Thất Bại", "Màu đã được thanh toán", "warning");
                return {
                    ...state,
                    loading: false,
                };
            } else {
                const newColorList = state.shoeColorList.filter(item => item.id_color !== action.payload.id)
                swal("Xóa Màu Thành Công", "", "success");
                return {
                    ...state,
                    shoeColorList: newColorList,
                    loading: false,
                };
            }
        case "DELETE_COLOR_FAIL":
            return {
                ...state,
                loading: false,
                error: action.payload,
            };



        case "DELETE_SIZE_REQUEST":
            return {
                ...state,
                loading: true,
            };
        case "DELETE_SIZE_SUCCESS":
            if (action.payload.data === 'error') {
                swal("Xóa Size Thất Bại", "Size đã được thanh toán", "warning");
                return {
                    ...state,
                    loading: false,
                };
            } else {
                const newSizeList = state.shoeSizeList.filter(item => item.id_size !== action.payload.id)
                swal("Xóa Size Thành Công", "", "success");
                return {
                    ...state,
                    shoeSizeList: newSizeList,
                    loading: false,
                };
            }
        case "DELETE_SIZE_FAIL":
            return {
                ...state,
                loading: false,
                error: action.payload,
            };


        case "DELETE_TYPE_REQUEST":
            return {
                ...state,
                loading: true,
            };
        case "DELETE_TYPE_SUCCESS":
            if (action.payload.data === 'error') {
                swal("Xóa Kiểu Giày Thất Bại", "Kiểu Giày Đã Được Sử Dụng", "warning");
                return {
                    ...state,
                    loading: false,
                };
            } else {
                const newTypeList = state.shoeTypeList.filter(item => item.id_kieugiay !== action.payload.id)
                swal("Xóa Kiểu Giày Thành Công", "", "success");
                return {
                    ...state,
                    shoeTypeList: newTypeList,
                    loading: false,
                };
            }
        case "DELETE_TYPE_FAIL":
            return {
                ...state,
                loading: false,
                error: action.payload,
            };

        case "GET_ORDER_REQUEST":
            return {
                ...state,
                loading: true,
            };
        case "GET_ORDER_SUCCESS":
            return {
                ...state,
                orderList: action.payload,
                loading: false,
            };
        case "GET_ORDER_FAIL":
            return {
                ...state,
                loading: false,
                error: action.payload,
            };

        case "GET_ORDER_DETAIL_REQUEST":
            return {
                ...state,
                loading: true,
            };
        case "GET_ORDER_DETAIL_SUCCESS":
            return {
                ...state,
                orderDetailList: action.payload,
                loading: false,
            };
        case "GET_ORDER_DETAIL_FAIL":
            return {
                ...state,
                loading: false,
                error: action.payload,
            };

        case "GET_REVENUE_REQUEST":
            return {
                ...state,
                loading: true,
            };
        case "GET_REVENUE_SUCCESS":
            return {
                ...state,
                revenueData: action.payload,
                loading: false,
            };
        case "GET_REVENUE_FAIL":
            return {
                ...state,
                loading: false,
                error: action.payload,
            };

        case "GET_SHOE_TOTAL_REQUEST":
            return {
                ...state,
                loading: true,
            };
        case "GET_SHOE_TOTAL_SUCCESS":
            return {
                ...state,
                shoeTotalData: action.payload,
                loading: false,
            };
        case "GET_SHOE_TOTAL_FAIL":
            return {
                ...state,
                loading: false,
                error: action.payload,
            };

        case "GET_DAY_REVENUE_REQUEST":
            return {
                ...state,
                loading: true,
            };
        case "GET_DAY_REVENUE_SUCCESS":
            return {
                ...state,
                dayRevenueData: action.payload,
                loading: false,
            };
        case "GET_DAY_REVENUE_FAIL":
            return {
                ...state,
                loading: false,
                error: action.payload,
            };

        case "GET_DAY_SHOE_TOTAL_REQUEST":
            return {
                ...state,
                loading: true,
            };
        case "GET_DAY_SHOE_TOTAL_SUCCESS":
            return {
                ...state,
                dayShoeTotalData: action.payload,
                loading: false,
            };
        case "GET_DAY_SHOE_TOTAL_FAIL":
            return {
                ...state,
                loading: false,
                error: action.payload,
            };



        case "UPDATE_ORDER_STATUS_REQUEST":
            return {
                ...state,
                loading: true,
            };
        case "UPDATE_ORDER_STATUS_SUCCESS":
            const newUpdateStatusOrder = state.orderList;
            newUpdateStatusOrder.map(item => {
                if (item.id_donhang === action.payload.id_donhang) {
                    item.trangthai = parseInt(action.payload.trangthai)
                }
                return newUpdateStatusOrder;
            })
            return {
                ...state,
                orderList: newUpdateStatusOrder,
                loading: false,
            };

        case "UPDATE_ORDER_STATUS_FAIL":
            return {
                ...state,
                loading: false,
                error: action.payload,
            };

        case "CREATE_SALE_REQUEST":
            return {
                ...state,
                loading: true,
            };
        case "CREATE_SALE_SUCCESS":
            if (action.payload === false) {
                swal("Thêm Khuyến Mãi Thất Bại", "Khuyến Mãi Đã Tồn Tại", "warning");
            } else swal("Thêm Khuyến Mãi Thành Công", "", "success");
            return {
                ...state,
                loading: false,
                isUpdate: true,
            };
        case "CREATE_SALE_FAIL":
            return {
                ...state,
                loading: false,
                error: action.payload,
            };
        case "GET_SALE_REQUEST":
            return {
                ...state,
                loading: true,
            };
        case "GET_SALE_SUCCESS":
            return {
                ...state,
                loading: false,
                saleList: action.payload,
            };
        case "GET_SALE_FAIL":
            return {
                ...state,
                loading: false,
                error: action.payload,
            };

        case "UPDATE_SALE_REQUEST":
            return {
                ...state,
                loading: true,
            };
        case "UPDATE_SALE_SUCCESS":
            return {
                ...state,
                loading: false,
            };
        case "UPDATE_SALE_FAIL":
            return {
                ...state,
                loading: false,
                error: action.payload,
            };

        case "GET_SHOE_ON_SHOE_TYPE_ADMIN_REQUEST":
            return {
                ...state,
                loading: true,
            };
        case "GET_SHOE_ON_SHOE_TYPE_ADMIN_SUCCESS":
            let newShoeCode = [];
            action.payload.map(item => {
                newShoeCode.push(item.tenmagiay)
            })
            return {
                ...state,
                loading: false,
                shoeListOnShoeTypeAdmin: action.payload,
                shoeCode: newShoeCode,
            };
        case "GET_SHOE_ON_SHOE_TYPE_ADMIN_FAIL":
            return {
                ...state,
                loading: false,
                error: action.payload,
            };

        case "UPDATE_SALE_FOR_SHOE_REQUEST":
            return {
                ...state,
                loading: true,
            };
        case "UPDATE_SALE_FOR_SHOE_SUCCESS":
            swal("Áp dụng thành công", '', 'success')
            return {
                ...state,
                loading: false,
            };
        case "UPDATE_SALE_FOR_SHOE_FAIL":
            return {
                ...state,
                loading: false,
                error: action.payload,
            };


        case "DELETE_SALE_REQUEST":
            return {
                ...state,
                loading: true,
            };
        case "DELETE_SALE_SUCCESS":
            if (action.payload.data === 'error') {
                swal("Xóa Khuyến Mãi Thất Bại", "Vui lòng gỡ khuyến mãi đang áp dụng trên giày trước", "error");
                return {
                    ...state,
                    loading: false,
                };
            } else {
                const newSaleList = state.saleList.filter(item => item.id_khuyenmai !== action.payload.id)
                swal("Xóa Khuyến Mãi Thành Công", "", "success");
                return {
                    ...state,
                    saleList: newSaleList,
                    loading: false,
                };
            }
        case "DELETE_SALE_FAIL":
            return {
                ...state,
                loading: false,
                error: action.payload,
            };


        case "UPLOAD_BANNER_REQUEST":
            return {
                ...state,
                loading: true,
            };
        case "UPLOAD_BANNER_SUCCESS":
            return {
                ...state,
                loading: false,
                banner: action.payload.data.secure_url
            };
        case "UPLOAD_BANNER_FAIL":
            return {
                ...state,
                loading: false,
                error: action.payload,
            };

        case "UPLOAD_BANNER_URL_REQUEST":
            return {
                ...state,
                loading: true,
            };
        case "UPLOAD_BANNER_URL_SUCCESS":
            swal("Thêm Ảnh Thành Công", "", "success")
            return {
                ...state,
                loading: false,
                banner: action.payload.data.secure_url
            };
        case "UPLOAD_BANNER_URL_FAIL":
            return {
                ...state,
                loading: false,
                error: action.payload,
            };


        case "GET_BANNER_REQUEST":
            return {
                ...state,
                loading: true,
            };
        case "GET_BANNER_SUCCESS":
            return {
                ...state,
                loading: false,
                bannerList: action.payload,
            };
        case "GET_BANNER_FAIL":
            return {
                ...state,
                loading: false,
                error: action.payload,
            };

        case "DELETE_BANNER_REQUEST":
            return {
                ...state,
                loading: true,
            };
        case "DELETE_BANNER_SUCCESS":
            const newBannerList = state.bannerList.filter(item => item.id_banner !== action.payload.id)
            swal("Xóa Ảnh Bìa Thành Công", "", "success");
            return {
                ...state,
                bannerList: newBannerList,
                loading: false,
            };
        case "DELETE_BANNER_FAIL":
            return {
                ...state,
                loading: false,
                error: action.payload,
            };

        case "DELETE_ORDER_REQUEST":
            return {
                ...state,
                loading: true,
            };
        case "DELETE_ORDER_SUCCESS":
            const newOrderList = state.orderList.filter(item => item.id_donhang !== action.payload.id)
            swal("Xóa đơn hàng thành công", "", "success");
            return {
                ...state,
                orderList: newOrderList,
                loading: false,
            };
        case "DELETE_ORDER_FAIL":
            return {
                ...state,
                loading: false,
                error: action.payload,
            };

        case "GET_NEWS_REQUEST":
            return {
                ...state,
                loading: true,
            };
        case "GET_NEWS_SUCCESS":
            return {
                ...state,
                loading: false,
                newsList: action.payload,
            };
        case "GET_NEWS_FAIL":
            return {
                ...state,
                loading: false,
                error: action.payload,
            };

        case "DELETE_NEWS_REQUEST":
            return {
                ...state,
                loading: true,
            };
        case "DELETE_NEWS_SUCCESS":
            if (action.payload.data === 'error') {
                swal("Xóa tin tức thất bại", "Vui lòng xóa banner trước chứa tin tức trước", "error");
                return {
                    ...state,
                    loading: false,
                };
            } else {
                const newNewsList = state.newsList.filter(item => item.id_tintuc !== action.payload.id)
                swal("Tin tức thành công", "", "success");
                return {
                    ...state,
                    newsList: newNewsList,
                    loading: false,
                };
            }
        case "DELETE_NEWS_FAIL":
            return {
                ...state,
                loading: false,
                error: action.payload,
            };

        case "REMOVE_SHOE_ON_SHOE_TYPE_ADMIN_REQUEST":
            return {
                ...state,
                shoeListOnShoeTypeAdmin: [],
            };

        case "UPLOAD_ANHBIA_REQUEST":
            return {
                ...state,
                loading: true,
            };
        case "UPLOAD_ANHBIA_SUCCESS":
            return {
                ...state,
                loading: false,
            };
        case "UPLOAD_ANHBIA_FAIL":
            swal("Vui lòng kiểm tra lại đường truyền", "", "error")
            return {
                ...state,
                loading: false,
                error: action.payload,
            };

        case "CREATE_NEWS_REQUEST":
            return {
                ...state,
                loading: true,
            };
        case "CREATE_NEWS_SUCCESS":
            swal("Thêm Tin Tức Thành Công", "", "success")
            return {
                ...state,
                loading: false,
            };
        case "CREATE_NEWS_FAIL":
            return {
                ...state,
                loading: false,
                error: action.payload,
            };

        case "GET_NEWS_DETAIL_REQUEST":
            return {
                ...state,
                loading: true,
            };
        case "GET_NEWS_DETAIL_SUCCESS":
            return {
                ...state,
                loading: false,
                newsDetail: action.payload[0],
            };
        case "GET_NEWS_DETAIL_FAIL":
            return {
                ...state,
                loading: false,
                error: action.payload,
            };

        case "UPDATE_ANHBIA_REQUEST":
            return {
                ...state,
                loading: true,
            };
        case "UPDATE_ANHBIA_SUCCESS":
            return {
                ...state,
                loading: false,
            };
        case "UPDATE_ANHBIA_FAIL":
            return {
                ...state,
                loading: false,
                error: action.payload,
            };

        case "UPDATE_NEWS_REQUEST":
            return {
                ...state,
                loading: true,
            };
        case "UPDATE_NEWS_SUCCESS":
            swal('Cập nhật tin tức thành công','','success')
            return {
                ...state,
                loading: false,
            };
        case "UPDATE_NEWS_FAIL":
            return {
                ...state,
                loading: false,
                error: action.payload,
            };

        case "GET_SHOE_TYPE_RESET":
            return {
                ...state,
                shoeTypeList: [],
            };
        case "GET_ORDER_RESET":
            return {
                ...state,
                orderList: [],
            };
        case "GET_SHOE_SIZE_RESET":
            return {
                ...state,
                shoeSizeList: [],
            };
        case "GET_SHOE_COLOR_RESET":
            return {
                ...state,
                shoeColorList: [],
            };
        case "GET_SHOE_COLOR_DISTINCT_RESET":
            return {
                ...state,
                distinctColor: [],
            };
        case "GET_ORDER_DETAIL_RESET":
            return {
                ...state,
                orderDetailList: [],
            };

        case "GET_SALE_RESET":
            return {
                ...state,
                saleList: [],
            };

        case "GET_BANNER_RESET":
            return {
                ...state,
                bannerList: [],
            };
        case "REMOVE_NEWS_ACTION":
            return {
                ...state,
                newsList: [],
            };

        case "REMOVE_NEWS_DETAIL_ACTION":
            return {
                ...state,
                newsDetail: {},
            };



        default: {
            return state;
        }
    }
}



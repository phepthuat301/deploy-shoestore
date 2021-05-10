import swal from 'sweetalert'
const initialState = {
  shoeList: [],
  shoeDetail: [],
  gallery: [],
  newProduct: [],
  bestSelling: [],
  relateProduct: [],
  page: 1,
  shoeListOnPage: [],
  shoeListOnShoeType: [],
  shoeActive: [],
};
export default function productReducer(state = initialState, action) {
  switch (action.type) {


    case "GET_SHOES_REQUEST":
      return {
        ...state,
        loading: true,
        shoeList: [],
      };
    case "GET_SHOES_SUCCESS":
      return {
        ...state,
        shoeList: action.payload,
        loading: false,
      };
    case "GET_SHOES_FAIL":
      return {
        ...state,
        loading: false,
        error: action.payload,
      };

    case "GET_ACTIVE_SHOE_REQUEST":
      return {
        ...state,
        loading: true,
      };
    case "GET_ACTIVE_SHOE_SUCCESS":
      return {
        ...state,
        shoeActive: action.payload,
        loading: false,
      };
    case "GET_ACTIVE_SHOE_FAIL":
      return {
        ...state,
        loading: false,
        error: action.payload,
      };



    case "GET_SHOE_DETAIL_REQUEST":
      return {
        ...state,
        loading: true,
      };
    case "GET_SHOE_DETAIL_SUCCESS":
      return {
        ...state,
        loading: false,
        shoeDetail: action.payload,
      };
    case "GET_SHOE_DETAIL_FAIL":
      return {
        ...state,
        loading: false,
        error: action.payload,
      };

    case "GET_GALLERY_REQUEST":
      return {
        ...state,
        loading: true,
      };
    case "GET_GALLERY_SUCCESS":
      return {
        ...state,
        loading: false,
        gallery: action.payload,
      };
    case "GET_GALLERY_FAIL":
      return {
        ...state,
        loading: false,
        error: action.payload,
      };
    case "GET_DELETE_SHOE_REQUEST":
      return {
        ...state,
        loading: true,
      };
    case "GET_DELETE_SHOE_SUCCESS":
      if (action.payload.errno) {
        swal("Sản phẩm đã được mua!", "Vui lòng đổi trạng thái sản phẩm", "warning");
        return {
          ...state,
          loading: false,
        };
      } else {
        const newList = state.shoeList.filter(item => item.id_giay !== action.payload.id)
        swal("Xóa Sản Phẩm Thành Công!", "", "success")
        return {
          ...state,
          shoeList: newList,
          loading: false,
        };
      }

    case "GET_DELETE_SHOE_FAIL":

      return {
        ...state,
        loading: false,
        error: action.payload,
      };

    case "GET_DELETE_SHOE_DETAIL_REQUEST":
      return {
        ...state,
        loading: true,
      };
    case "GET_DELETE_SHOE_DETAIL_SUCCESS":
      const newDetail = state.shoeDetail.filter(item => item.id_chitietgiay !== action.payload[0])
      const checkGallery = newDetail.filter(item => item.id_color === action.payload[2])
      const newGallery = state.gallery.filter(item => item.id_color !== action.payload[2] && item.id_giay === action.payload[1])

      if (checkGallery.length === 0) {
        swal("Xóa Chi Tiết Sản Phẩm Thành Công!", "Ảnh của màu đã bị xóa bỏ!", "success")
        return {
          ...state,
          gallery: newGallery,
          shoeDetail: newDetail,
          loading: false,
        };
      } else {
        swal("Xóa Chi Tiết Sản Phẩm Thành Công!", "", "success")
        return {
          ...state,
          shoeDetail: newDetail,
          loading: false,
        };
      }

    case "GET_DELETE_SHOE_DETAIL_FAIL":
      return {
        ...state,
        loading: false,
        error: action.payload,
      };

    case "GET_DELETE_SHOE_GALLERY_REQUEST":
      return {
        ...state,
        loading: true,
      };
    case "GET_DELETE_SHOE_GALLERY_SUCCESS":
      const GalleryOnly = state.gallery.filter(item => item.id_gallery !== action.payload)
      swal("Xóa Ảnh Thành Công!", "", "success")
      return {
        ...state,
        gallery: GalleryOnly,
        loading: false,
      };

    case "GET_DELETE_SHOE_GALLERY_FAIL":
      return {
        ...state,
        loading: false,
        error: action.payload,
      };

    case "UPDATE_QTY_REQUEST":
      return {
        ...state,
        loading: true,
      };
    case "UPDATE_QTY_SUCCESS":
      const newUpdateQty = state.shoeDetail;
      newUpdateQty.map(item => {
        if (item.id_chitietgiay === action.payload.id_chitietgiay) {
          item.soluong = action.payload.soluong
        }
        return newUpdateQty;
      })
      return {
        ...state,
        shoeDetail: newUpdateQty,
        loading: false,
      };

    case "UPDATE_QTY_FAIL":
      return {
        ...state,
        loading: false,
        error: action.payload,
      };


    case "GET_BEST_SELLING_SUCCESS":
      return {
        ...state,
        loading: false,
        bestSelling: action.payload,
      };

    case "GET_NEW_PRODUCT_SUCCESS":
      return {
        ...state,
        loading: false,
        newProduct: action.payload,
      };

    case "GET_RELATE_PRODUCT_SUCCESS":
      return {
        ...state,
        loading: false,
        relateProduct: action.payload,
      };

    case "GET_PAGE_SUCCESS":
      return {
        ...state,
        loading: false,
        page: action.payload.message,
      };

    case "GET_SHOE_ON_PAGE_REQUEST":
      return {
        ...state,
        loading: true,
      };
    case "GET_SHOE_ON_PAGE_SUCCESS":
      return {
        ...state,
        loading: false,
        shoeListOnPage: action.payload,
      };
    case "GET_SHOE_ON_PAGE_FAIL":
      return {
        ...state,
        loading: false,
        error: action.payload,
      };

    case "GET_SHOE_ON_SHOE_TYPE_REQUEST":
      return {
        ...state,
        loading: true,
      };
    case "GET_SHOE_ON_SHOE_TYPE_SUCCESS":
      return {
        ...state,
        loading: false,
        shoeListOnShoeType: action.payload,
      };
    case "GET_SHOE_ON_SHOE_TYPE_FAIL":
      return {
        ...state,
        loading: false,
        error: action.payload,
      };

    case "UPDATE_SHOE_SALE_REQUEST":
      return {
        ...state,
        loading: true,
      };
    case "UPDATE_SHOE_SALE_SUCCESS":
      const newShoeSale = state.shoeList;
      newShoeSale.map(item => {
        if (item.id_giay === action.payload.id_giay) {
          item.id_khuyenmai = action.payload.id_khuyenmai
          item.makhuyenmai = action.payload.makhuyenmai
        }
        return newShoeSale;
      })
      return {
        ...state,
        shoeList: newShoeSale,
        loading: false,
      };

    case "UPDATE_SHOE_SALE_FAIL":
      return {
        ...state,
        loading: false,
        error: action.payload,
      };


    case "GET_SHOE_DETAIL_RESET":
      return {
        ...state,
        shoeDetail: [],
      };

    case "GET_SHOE_RESET":
      return {
        ...state,
        shoeList: [],
      };

    case "GET_BEST_SELLING_RESET":
      return {
        ...state,
        newProduct: [],
      };

    case "GET_NEW_PRODUCT_RESET":
      return {
        ...state,
        bestSelling: [],
      };

    case "GET_RELATE_PRODUCT_RESET":
      return {
        ...state,
        relateProduct: [],
      };

    case "GET_SHOE_ON_PAGE_RESET":
      return {
        ...state,
        shoeListOnPage: [],
      };

    case "GET_SHOE_ON_SHOE_TYPE_RESET":
      return {
        ...state,
        shoeListOnShoeType: [],
      };

    case "GET_ACTIVE_SHOE_RESET":
      return {
        ...state,
        shoeActive: [],
      };

    case "GET_GALLERY_RESET":
      return {
        ...state,
        gallery: [],
      };

    default:
      return state;
  }
};

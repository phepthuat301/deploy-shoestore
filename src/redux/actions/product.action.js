import axios from "axios";
export const getShoeAction = () => async (dispatch) => {
  try {
    dispatch({ type: "GET_SHOES_REQUEST" });

    const { data } = await axios.get("http://hieugiaynhuy.tk/shoe");
    dispatch({
      type: "GET_SHOES_SUCCESS",
      payload: data,
    });
  } catch (error) {
    dispatch({
      type: "GET_SHOES_FAIL",
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
};

export const getShoeDetailAction = (id) => async (dispatch) => {
  try {
    dispatch({ type: "GET_SHOE_DETAIL_REQUEST" });

    const { data } = await axios.get(`http://hieugiaynhuy.tk/shoe/${id}`);
    dispatch({
      type: "GET_SHOE_DETAIL_SUCCESS",
      payload: data,
    });
  } catch (error) {
    dispatch({
      type: "GET_SHOE_DETAIL_FAIL",
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
};


export const getGalleryAction = (id) => async (dispatch) => {
  try {
    dispatch({ type: "GET_GALLERY_REQUEST" });

    const { data } = await axios.get(`http://hieugiaynhuy.tk/shoe/gallery/${id}`);

    dispatch({
      type: "GET_GALLERY_SUCCESS",
      payload: data,
    });
  } catch (error) {
    dispatch({
      type: "GET_GALLERY_FAIL",
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
};

export const deleteShoeAction = (id) => async (dispatch) => {
  try {
    dispatch({ type: "GET_DELETE_SHOE_REQUEST" });

    const { data } = await axios.get(`http://hieugiaynhuy.tk/deleteshoe/${id}`);
    dispatch({
      type: "GET_DELETE_SHOE_SUCCESS",
      payload: { ...data, id: id }
    });
  } catch (error) {
    dispatch({
      type: "GET_DELETE_SHOE_FAIL",
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
}

export const deleteShoeDetailAction = (params) => async (dispatch) => {
  try {
    dispatch({ type: "GET_DELETE_SHOE_DETAIL_REQUEST" });
    await axios.post(`http://hieugiaynhuy.tk/deleteshoedetail/`, {
      id_giay: params[1],
      id_chitietgiay: params[0],
      id_color: params[2],
    });
    dispatch({
      type: "GET_DELETE_SHOE_DETAIL_SUCCESS",
      payload: params,
    });
  } catch (error) {
    dispatch({
      type: "GET_DELETE_SHOE_DETAIL_FAIL",
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
}

export const deleteShoeGalleryAction = (id) => async (dispatch) => {
  try {
    dispatch({ type: "GET_DELETE_SHOE_GALLERY_REQUEST" });
    await axios.get(`http://hieugiaynhuy.tk/deletegallery/${id}`);
    dispatch({
      type: "GET_DELETE_SHOE_GALLERY_SUCCESS",
      payload: id,
    });
  } catch (error) {
    dispatch({
      type: "GET_DELETE_SHOE_GALLERY_FAIL",
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
}

export const updateQty = (value, id_chitietgiay) => async (dispatch) => {
  const newArray = {
    soluong: value,
    id_chitietgiay: id_chitietgiay
  }
  try {
    dispatch({ type: "UPDATE_QTY_REQUEST" });
    await axios.put(`http://hieugiaynhuy.tk/updateqty`, {
      soluong: value,
      id_chitietgiay: id_chitietgiay,
    });
    dispatch({
      type: "UPDATE_QTY_SUCCESS",
      payload: newArray,
    });
  } catch (error) {
    dispatch({
      type: "UPDATE_QTY_FAIL",
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
}

export const getBestSellingAction = () => async (dispatch) => {
  try {
    dispatch({ type: "GET_BEST_SELLING_REQUEST" });

    const { data } = await axios.get("http://hieugiaynhuy.tk/bestselling");

    dispatch({
      type: "GET_BEST_SELLING_SUCCESS",
      payload: data,
    });
  } catch (error) {
    dispatch({
      type: "GET_BEST_SELLING_FAIL",
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
};

export const getNewProductAction = () => async (dispatch) => {
  try {
    dispatch({ type: "GET_NEW_PRODUCT_REQUEST" });

    const { data } = await axios.get("http://hieugiaynhuy.tk/newproduct");

    dispatch({
      type: "GET_NEW_PRODUCT_SUCCESS",
      payload: data,
    });
  } catch (error) {
    dispatch({
      type: "GET_NEW_PRODUCT_FAIL",
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
};

export const getRelateProductAction = (id) => async (dispatch) => {
  try {
    dispatch({ type: "GET_RELATE_PRODUCT_REQUEST" });

    const { data } = await axios.get(`http://hieugiaynhuy.tk/relateproduct/${id}`);

    dispatch({
      type: "GET_RELATE_PRODUCT_SUCCESS",
      payload: data,
    });
  } catch (error) {
    dispatch({
      type: "GET_RELATE_PRODUCT_FAIL",
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
};

export const getPageAction = () => async (dispatch) => {
  try {
    dispatch({ type: "GET_PAGE_REQUEST" });

    const { data } = await axios.get(`http://hieugiaynhuy.tk/page`);
    dispatch({
      type: "GET_PAGE_SUCCESS",
      payload: data,
    });
  } catch (error) {
    dispatch({
      type: "GET_PAGE_FAIL",
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
};

export const getShoeOnPageAction = (id) => async (dispatch) => {
  try {
    dispatch({ type: "GET_SHOE_ON_PAGE_REQUEST" });

    const { data } = await axios.get(`http://hieugiaynhuy.tk/page/${id}`);

    dispatch({
      type: "GET_SHOE_ON_PAGE_SUCCESS",
      payload: data,
    });
  } catch (error) {
    dispatch({
      type: "GET_SHOE_ON_PAGE_FAIL",
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
};

export const getShoeOnShoeTypeAction = (id) => async (dispatch) => {
  try {
    dispatch({ type: "GET_SHOE_ON_SHOE_TYPE_REQUEST" });
    const { data } = await axios.get(`http://hieugiaynhuy.tk/shoeontype/${id}`);
    dispatch({
      type: "GET_SHOE_ON_SHOE_TYPE_SUCCESS",
      payload: data,
    });
  } catch (error) {
    dispatch({
      type: "GET_SHOE_ON_SHOE_TYPE_FAIL",
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
};


export const getActiveShoeAction = () => async (dispatch) => {
  try {
    dispatch({ type: "GET_ACTIVE_SHOE_REQUEST" });

    const { data } = await axios.get("http://hieugiaynhuy.tk/activeshoe");
    dispatch({
      type: "GET_ACTIVE_SHOE_SUCCESS",
      payload: data,
    });
  } catch (error) {
    dispatch({
      type: "GET_ACTIVE_SHOE_FAIL",
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
};

export const updateShoeSaleAction = (id_khuyenmai, id_giay, makhuyenmai) => async (dispatch) => {
  const newSale = {
    id_khuyenmai: id_khuyenmai,
    id_giay: id_giay,
    makhuyenmai: makhuyenmai,
  }
  try {
    dispatch({ type: "UPDATE_SHOE_SALE_REQUEST" });
    await axios.put(`http://hieugiaynhuy.tk/updateshoesale`, {
      id_khuyenmai: id_khuyenmai,
      id_giay: id_giay,
      makhuyenmai: makhuyenmai,
    });
    dispatch({
      type: "UPDATE_SHOE_SALE_SUCCESS",
      payload: newSale,
    });
  } catch (error) {
    dispatch({
      type: "UPDATE_SHOE_SALE_FAIL",
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
}

export const removeShoeDetailAction = () => (dispatch) => {
  dispatch({ type: "GET_SHOE_DETAIL_RESET" });
};

export const removeShoeAction = () => (dispatch) => {
  dispatch({ type: "GET_SHOE_RESET" });
};

export const removeBestSellingAction = () => (dispatch) => {
  dispatch({ type: "GET_BEST_SELLING_RESET" });
};

export const removeNewProductAction = () => (dispatch) => {
  dispatch({ type: "GET_NEW_PRODUCT_RESET" });
};

export const removeRelateProductAction = () => (dispatch) => {
  dispatch({ type: "GET_RELATE_PRODUCT_RESET" });
};

export const removeShoeOnPageAction = () => (dispatch) => {
  dispatch({ type: "GET_SHOE_ON_PAGE_RESET" });
};

export const removeShoeOnShoeTypeAction = () => (dispatch) => {
  dispatch({ type: "GET_SHOE_ON_SHOE_TYPE_RESET" });
};

export const removeActiveShoeAction = () => (dispatch) => {
  dispatch({ type: "GET_ACTIVE_SHOE_RESET" });
};

export const removeGalleryAction = () => (dispatch) => {
  dispatch({ type: "GET_GALLERY_RESET" });
};
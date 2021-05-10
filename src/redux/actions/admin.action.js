import axios from "axios";
export const getShoeTypeAction = () => async (dispatch) => {
  try {
    dispatch({ type: "GET_SHOE_TYPE_REQUEST" });

    const { data } = await axios.get("http://hieugiaynhuy.tk/shoetype");

    dispatch({
      type: "GET_SHOE_TYPE_SUCCESS",
      payload: data,
    });
  } catch (error) {
    dispatch({
      type: "GET_SHOE_TYPE_FAIL",
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
};

export const getShoeColorAction = () => async (dispatch) => {
  try {
    dispatch({ type: "GET_SHOE_COLOR_REQUEST" });

    const { data } = await axios.get("http://hieugiaynhuy.tk/shoecolor");

    dispatch({
      type: "GET_SHOE_COLOR_SUCCESS",
      payload: data,
    });
  } catch (error) {
    dispatch({
      type: "GET_SHOE_COLOR_FAIL",
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
};

export const getShoeSizeAction = () => async (dispatch) => {
  try {
    dispatch({ type: "GET_SHOE_SIZE_REQUEST" });

    const { data } = await axios.get("http://hieugiaynhuy.tk/shoesize");

    dispatch({
      type: "GET_SHOE_SIZE_SUCCESS",
      payload: data,
    });
  } catch (error) {
    dispatch({
      type: "GET_SHOE_SIZE_FAIL",
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
};


export const createShoeAction = (params) => async (dispatch) => {
  try {
    dispatch({ type: "CREATE_SHOE_REQUEST" });
    await axios.post("http://hieugiaynhuy.tk/createshoe", {
      id_kieugiay: params.id_kieugiay,
      tengiay: params.tengiay,
      tenmagiay: params.tenmagiay,
      hinhanh: params.hinhanh,
      giaban: params.giaban,
      giakm: params.giakm,
      tinhtrang: params.tinhtrang,
      noidung: params.noidung,
    });
    dispatch({
      type: "CREATE_SHOE_SUCCESS",
    });
  } catch (error) {
    dispatch({
      type: "CREATE_SHOE_FAIL",
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
};


export const createShoeDetailAction = (params) => async (dispatch) => {

  try {
    dispatch({ type: "CREATE_SHOE_DETAIL_REQUEST" });
    await axios.post("http://hieugiaynhuy.tk/createshoedetail", {
      id_giay: params.id_giay,
      id_size: params.id_size,
      id_color: params.id_color,
      soluong: params.soluong,
    });
    dispatch({
      type: "CREATE_SHOE_DETAIL_SUCCESS",
    });
  } catch (error) {
    dispatch({
      type: "CREATE_SHOE_DETAIL_FAIL",
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
};

export const createGalleryAction = (params) => async (dispatch) => {
  try {
    dispatch({ type: "CREATE_GALLERY_REQUEST" });
    await axios.post("http://hieugiaynhuy.tk/createshoegallery", {
      id_giay: params.id_giay,
      id_color: params.id_color,
      image: params.image,
    });
    dispatch({
      type: "CREATE_GALLERY_SUCCESS",
    });
  } catch (error) {
    dispatch({
      type: "CREATE_GALLERY_FAIL",
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
};


export const getDistinctColorAction = (id) => async (dispatch) => {
  try {
    dispatch({ type: "GET_DISTINCT_COLOR_REQUEST" });

    const { data } = await axios.get(`http://hieugiaynhuy.tk/shoedistinctcolor/${id}`);
    dispatch({
      type: "GET_DISTINCT_COLOR_SUCCESS",
      payload: data,
    });
  } catch (error) {
    dispatch({
      type: "GET_DISTINCT_COLOR_FAIL",
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
};

export const updateShoeAction = (params) => async (dispatch) => {
  try {
    dispatch({ type: "UPDATE_SHOE_REQUEST" });
    await axios.put("http://hieugiaynhuy.tk/updateshoe", {
      id_giay: params.id_giay,
      id_kieugiay: params.id_kieugiay,
      tengiay: params.tengiay,
      tenmagiay: params.tenmagiay,
      hinhanh: params.hinhanh,
      giaban: params.giaban,
      giakm: params.giakm,
      tinhtrang: params.tinhtrang,
      noidung: params.noidung,
    });
    dispatch({
      type: "UPDATE_SHOE_SUCCESS",
    });
  } catch (error) {
    dispatch({
      type: "UPDATE_SHOE_FAIL",
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
};

export const upLoadFile = (params) => async (dispatch) => {
  const data = new FormData()
  for (let i = 0; i < params.length; i++) {
    data.append('file', params[i])
  }
  try {
    dispatch({ type: "UP_LOAD_FILE_REQUEST" });

    await axios.post(`http://hieugiaynhuy.tk/upload`, data);
    dispatch({
      type: "UP_LOAD_FILE_SUCCESS",
    });
  } catch (error) {
    dispatch({
      type: "UP_LOAD_FILE_FAIL",
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
};

export const createSizeAction = (params) => async (dispatch) => {
  try {
    dispatch({ type: "CREATE_SIZE_REQUEST" });
    const { data } = await axios.post("http://hieugiaynhuy.tk/createsize", {
      sosize: params.sosize,
      trangthai: params.trangthai,
    });
    dispatch({
      type: "CREATE_SIZE_SUCCESS",
      payload: data,
    });
  } catch (error) {
    dispatch({
      type: "CREATE_SIZE_FAIL",
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
};

export const createColorAction = (params) => async (dispatch) => {
  try {
    dispatch({ type: "CREATE_COLOR_REQUEST" });
    const { data } = await axios.post("http://hieugiaynhuy.tk/createcolor", {
      color: params.color,
      trangthai: params.trangthai,
    });
    dispatch({
      type: "CREATE_COLOR_SUCCESS",
      payload: data,
    });
  } catch (error) {
    dispatch({
      type: "CREATE_COLOR_FAIL",
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
};

export const createTypeAction = (params) => async (dispatch) => {
  try {
    dispatch({ type: "CREATE_TYPE_REQUEST" });
    const { data } = await axios.post("http://123.19.51.100:3001/createtype", {
      tenkieugiay: params.tenkieugiay,
      tinhtrang: params.tinhtrang,
    });
    dispatch({
      type: "CREATE_TYPE_SUCCESS",
      payload: data,
    });
  } catch (error) {
    dispatch({
      type: "CREATE_TYPE_FAIL",
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
};

export const updateSizeStatus = (value, id_size) => async (dispatch) => {
  const newArray = {
    trangthai: value,
    id_size: id_size
  }
  try {
    dispatch({ type: "UPDATE_SIZE_STATUS_REQUEST" });
    await axios.put(`http://hieugiaynhuy.tk/updatesize`, {
      trangthai: value,
      id_size: id_size,
    });
    dispatch({
      type: "UPDATE_SIZE_STATUS_SUCCESS",
      payload: newArray,
    });
  } catch (error) {
    dispatch({
      type: "UPDATE_SIZE_STATUS_FAIL",
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
}

export const updateColorStatus = (value, id_color) => async (dispatch) => {
  const newArray = {
    trangthai: value,
    id_color: id_color
  }
  try {
    dispatch({ type: "UPDATE_COLOR_STATUS_REQUEST" });
    await axios.put(`http://hieugiaynhuy.tk/updatecolor`, {
      trangthai: value,
      id_color: id_color,
    });
    dispatch({
      type: "UPDATE_COLOR_STATUS_SUCCESS",
      payload: newArray,
    });
  } catch (error) {
    dispatch({
      type: "UPDATE_COLOR_STATUS_FAIL",
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
}

export const updateTypeStatus = (value, id_kieugiay) => async (dispatch) => {
  const newArray = {
    tinhtrang: value,
    id_kieugiay: id_kieugiay
  }
  try {
    dispatch({ type: "UPDATE_TYPE_STATUS_REQUEST" });
    await axios.put(`http://123.19.51.100:3001/updatetype`, {
      tinhtrang: value,
      id_kieugiay: id_kieugiay,
    });
    dispatch({
      type: "UPDATE_TYPE_STATUS_SUCCESS",
      payload: newArray,
    });
  } catch (error) {
    dispatch({
      type: "UPDATE_TYPE_STATUS_FAIL",
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
}

export const deleteColorAction = (id) => async (dispatch) => {
  try {
    dispatch({ type: "DELETE_COLOR_REQUEST" });
    const { data } = await axios.delete(`http://hieugiaynhuy.tk/deletecolor/${id}`);
    const newData = {
      data: data,
      id: id,
    }
    dispatch({
      type: "DELETE_COLOR_SUCCESS",
      payload: newData,
    });
  } catch (error) {
    dispatch({
      type: "DELETE_COLOR_FAIL",
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
}

export const deleteSizeAction = (id) => async (dispatch) => {
  try {
    dispatch({ type: "DELETE_SIZE_REQUEST" });
    const { data } = await axios.delete(`http://hieugiaynhuy.tk/deletesize/${id}`);
    const newData = {
      data: data,
      id: id,
    }
    dispatch({
      type: "DELETE_SIZE_SUCCESS",
      payload: newData,
    });
  } catch (error) {
    dispatch({
      type: "DELETE_SIZE_FAIL",
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
}

export const deleteTypeAction = (id) => async (dispatch) => {
  try {
    dispatch({ type: "DELETE_TYPE_REQUEST" });
    const { data } = await axios.delete(`http://123.19.51.100:3001/deletetype/${id}`);
    const newData = {
      data: data,
      id: id,
    }
    dispatch({
      type: "DELETE_TYPE_SUCCESS",
      payload: newData,
    });
  } catch (error) {
    dispatch({
      type: "DELETE_TYPE_FAIL",
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
}

export const getOrderAction = () => async (dispatch) => {
  try {
    dispatch({ type: "GET_ORDER_REQUEST" });

    const { data } = await axios.get("http://hieugiaynhuy.tk/order");

    dispatch({
      type: "GET_ORDER_SUCCESS",
      payload: data,
    });
  } catch (error) {
    dispatch({
      type: "GET_ORDER_FAIL",
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
};

export const getOrderDetailAction = (id) => async (dispatch) => {
  try {
    dispatch({ type: "GET_ORDER_DETAIL_REQUEST" });

    const { data } = await axios.get(`http://hieugiaynhuy.tk/orderdetail/${id}`);

    dispatch({
      type: "GET_ORDER_DETAIL_SUCCESS",
      payload: data,
    });
  } catch (error) {
    dispatch({
      type: "GET_ORDER_DETAIL_FAIL",
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
};

export const updateOrderStatus = (value, id_donhang) => async (dispatch) => {
  const newArray = {
    trangthai: value,
    id_donhang: id_donhang
  }
  try {
    dispatch({ type: "UPDATE_ORDER_STATUS_REQUEST" });
    await axios.put(`http://hieugiaynhuy.tk/updateorder`, {
      trangthai: value,
      id_donhang: id_donhang,
    });
    dispatch({
      type: "UPDATE_ORDER_STATUS_SUCCESS",
      payload: newArray,
    });
  } catch (error) {
    dispatch({
      type: "UPDATE_ORDER_STATUS_FAIL",
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
}

export const getRevenueAction = (year) => async (dispatch) => {
  try {
    dispatch({ type: "GET_REVENUE_REQUEST" });
    const { data } = await axios.get(`http://hieugiaynhuy.tk/doanhthu/${year}`);
    dispatch({
      type: "GET_REVENUE_SUCCESS",
      payload: data,
    });
  } catch (error) {
    dispatch({
      type: "GET_REVENUE_FAIL",
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
};
export const getShoeTotalAction = (year) => async (dispatch) => {
  try {
    dispatch({ type: "GET_SHOE_TOTAL_REQUEST" });
    const { data } = await axios.get(`http://hieugiaynhuy.tk/tongsoluong/${year}`);
    dispatch({
      type: "GET_SHOE_TOTAL_SUCCESS",
      payload: data,
    });
  } catch (error) {
    dispatch({
      type: "GET_SHOE_TOTAL_FAIL",
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
};

export const getDayRevenueAction = (month) => async (dispatch) => {
  try {
    dispatch({ type: "GET_DAY_REVENUE_REQUEST" });
    const { data } = await axios.get(`http://hieugiaynhuy.tk/doanhthungay/${month}`);
    dispatch({
      type: "GET_DAY_REVENUE_SUCCESS",
      payload: data,
    });
  } catch (error) {
    dispatch({
      type: "GET_DAY_REVENUE_FAIL",
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
};
export const getDayShoeTotalAction = (month) => async (dispatch) => {
  try {
    dispatch({ type: "GET_DAY_SHOE_TOTAL_REQUEST" });
    const { data } = await axios.get(`http://hieugiaynhuy.tk/tongsoluongngay/${month}`);
    dispatch({
      type: "GET_DAY_SHOE_TOTAL_SUCCESS",
      payload: data,
    });
  } catch (error) {
    dispatch({
      type: "GET_DAY_SHOE_TOTAL_FAIL",
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
};

export const createSaleAction = (params) => async (dispatch) => {
  try {
    dispatch({ type: "CREATE_SALE_REQUEST" });
    const { data } = await axios.post(`http://hieugiaynhuy.tk/createsale`, {
      makhuyenmai: params.makhuyenmai,
      tenkhuyenmai: params.tenkhuyenmai,
      batdau: params.beginDate,
      ketthuc: params.endDate,
      phantramkhuyenmai: params.phantramkhuyenmai,
      trangthai: params.trangthai,
    });
    dispatch({
      type: "CREATE_SALE_SUCCESS",
      payload: data,
    });
  } catch (error) {
    dispatch({
      type: "CREATE_SALE_FAIL",
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
};

export const getSaleAction = () => async (dispatch) => {
  try {
    dispatch({ type: "GET_SALE_REQUEST" });
    const { data } = await axios.get(`http://hieugiaynhuy.tk/sale`);
    dispatch({
      type: "GET_SALE_SUCCESS",
      payload: data,
    });
  } catch (error) {
    dispatch({
      type: "GET_SALE_FAIL",
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
};

export const updateSaleStatus = (params) => async (dispatch) => {
  try {
    dispatch({ type: "UPDATE_SALE_REQUEST" });
    await axios.put("http://hieugiaynhuy.tk/updatesalestatus", {
      id_khuyenmai: params.id_khuyenmai,
      trangthai: params.trangthai,
    });
    dispatch({
      type: "UPDATE_SALE_SUCCESS",
    });
  } catch (error) {
    dispatch({
      type: "UPDATE_SALE_FAIL",
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
};

export const getShoeOnShoeTypeAdminAction = (id) => async (dispatch) => {
  try {
    dispatch({ type: "GET_SHOE_ON_SHOE_TYPE_ADMIN_REQUEST" });
    const { data } = await axios.get(`http://hieugiaynhuy.tk/shoeontypeadmin/${id}`);
    dispatch({
      type: "GET_SHOE_ON_SHOE_TYPE_ADMIN_SUCCESS",
      payload: data,
    });
  } catch (error) {
    dispatch({
      type: "GET_SHOE_ON_SHOE_TYPE_ADMIN_FAIL",
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
};

export const updateSaleForShoeAction = (id_khuyenmai, id_giay) => async (dispatch) => {
  try {
    dispatch({ type: "UPDATE_SALE_FOR_SHOE_REQUEST" });
    await axios.put("http://hieugiaynhuy.tk/updatesaleforshoe", {
      id_khuyenmai,
      id_giay,
    });
    dispatch({
      type: "UPDATE_SALE_FOR_SHOE_SUCCESS",
    });
  } catch (error) {
    dispatch({
      type: "UPDATE_SALE_FOR_SHOE_FAIL",
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
};

export const deleteSaleAction = (id) => async (dispatch) => {
  try {
    dispatch({ type: "DELETE_SALE_REQUEST" });
    const { data } = await axios.delete(`http://hieugiaynhuy.tk/deletesale/${id}`);
    const newData = {
      data: data,
      id: id,
    }
    dispatch({
      type: "DELETE_SALE_SUCCESS",
      payload: newData,
    });
  } catch (error) {
    dispatch({
      type: "DELETE_SALE_FAIL",
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
}

export const uploadBanner = (params,id_tintuc) => async (dispatch) => {
  try {
    dispatch({ type: "UPLOAD_BANNER_REQUEST" });

    const data = await axios.post(`https://api.cloudinary.com/v1_1/shoestoreproject/image/upload`, params);
    dispatch(uploadBannerUrl(data.data.secure_url,id_tintuc))
    dispatch({
      type: "UPLOAD_BANNER_SUCCESS",
      payload: data,
    });
  } catch (error) {
    dispatch({
      type: "UPLOAD_BANNER_FAIL",
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
};

export const uploadBannerUrl = (imageURL,id_tintuc) => async (dispatch) => {
  try {
    dispatch({ type: "UPLOAD_BANNER_URL_REQUEST" });
          await axios.post(`http://hieugiaynhuy.tk/uploadbannerurl/`, {
            imageURL,
            id_tintuc,
          });

    dispatch({
      type: "UPLOAD_BANNER_URL_SUCCESS",
    });
  } catch (error) {
    dispatch({
      type: "UPLOAD_BANNER_URL_FAIL",
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
};

export const getBannerAction = () => async (dispatch) => {
  try {
    dispatch({ type: "GET_BANNER_REQUEST" });
    const { data } = await axios.get(`http://hieugiaynhuy.tk/banner`);
    dispatch({
      type: "GET_BANNER_SUCCESS",
      payload: data,
    });
  } catch (error) {
    dispatch({
      type: "GET_BANNER_FAIL",
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
};

export const deleteBannerAction = (id) => async (dispatch) => {
  try {
    dispatch({ type: "DELETE_BANNER_REQUEST" });
    const { data } = await axios.delete(`http://hieugiaynhuy.tk/deletebanner/${id}`);
    const newData = {
      data: data,
      id: id,
    }
    dispatch({
      type: "DELETE_BANNER_SUCCESS",
      payload: newData,
    });
  } catch (error) {
    dispatch({
      type: "DELETE_BANNER_FAIL",
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
}

export const deleteOrderAction = (id) => async (dispatch) => {
  try {
    dispatch({ type: "DELETE_ORDER_REQUEST" });
    const { data } = await axios.delete(`http://hieugiaynhuy.tk/deleteorder/${id}`);
    const newData = {
      data: data,
      id: id,
    }
    dispatch({
      type: "DELETE_ORDER_SUCCESS",
      payload: newData,
    });
  } catch (error) {
    dispatch({
      type: "DELETE_ORDER_FAIL",
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
}

export const getNewsAction = () => async (dispatch) => {
  try {
    dispatch({ type: "GET_NEWS_REQUEST" });
    const { data } = await axios.get(`http://hieugiaynhuy.tk/news`);
    dispatch({
      type: "GET_NEWS_SUCCESS",
      payload: data,
    });
  } catch (error) {
    dispatch({
      type: "GET_NEWS_FAIL",
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
};

export const uploadAnhBia = (params,newValues) => async (dispatch) => {
  try {
    dispatch({ type: "UPLOAD_ANHBIA_REQUEST" });

    const data = await axios.post(`https://api.cloudinary.com/v1_1/shoestoreproject/image/upload`, params);
    dispatch(createNewsAction(data.data.secure_url,newValues))
    dispatch({
      type: "UPLOAD_ANHBIA_SUCCESS",
      payload: data,
    });
  } catch (error) {
    dispatch({
      type: "UPLOAD_ANHBIA_FAIL",
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
};

export const createNewsAction = (imageURL,newValues) => async (dispatch) => {
  try {
    dispatch({ type: "CREATE_NEWS_REQUEST" });
          await axios.post(`http://hieugiaynhuy.tk/createnews/`, {
            imageURL,
            newValues,
          });

    dispatch({
      type: "CREATE_NEWS_SUCCESS",
    });
  } catch (error) {
    dispatch({
      type: "CREATE_NEWS_FAIL",
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
};

export const deleteNewsAction = (id) => async (dispatch) => {
  try {
    dispatch({ type: "DELETE_NEWS_REQUEST" });
    const { data } = await axios.delete(`http://hieugiaynhuy.tk/deletenews/${id}`);
    const newData = {
      data: data,
      id: id,
    }
    dispatch({
      type: "DELETE_NEWS_SUCCESS",
      payload: newData,
    });
  } catch (error) {
    dispatch({
      type: "DELETE_NEWS_FAIL",
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
}

export const getNewsDetailAction = (id) => async (dispatch) => {
  try {
    dispatch({ type: "GET_NEWS_DETAIL_REQUEST" });
    const { data } = await axios.get(`http://hieugiaynhuy.tk/newsdetail/${id}`);
    dispatch({
      type: "GET_NEWS_DETAIL_SUCCESS",
      payload: data,
    });
  } catch (error) {
    dispatch({
      type: "GET_NEWS_DETAIL_FAIL",
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
};

export const updateAnhBia = (params,newValues) => async (dispatch) => {
  try {
    dispatch({ type: "UPDATE_ANHBIA_REQUEST" });

    const data = await axios.post(`https://api.cloudinary.com/v1_1/shoestoreproject/image/upload`, params);
    dispatch(updateNewsAction(data.data.secure_url,newValues))
    dispatch({
      type: "UPDATE_ANHBIA_SUCCESS",
      payload: data,
    });
  } catch (error) {
    dispatch({
      type: "UPDATE_ANHBIA_FAIL",
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
};

export const updateNewsAction = (imageURL,newValues) => async (dispatch) => {
  try {
    dispatch({ type: "UPDATE_NEWS_REQUEST" });
          await axios.put(`http://hieugiaynhuy.tk/updatenews/`, {
            imageURL,
            newValues,
          });

    dispatch({
      type: "UPDATE_NEWS_SUCCESS",
    });
  } catch (error) {
    dispatch({
      type: "UPDATE_NEWS_FAIL",
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
};

export const removeShoeTypeAction = () => (dispatch) => {
  dispatch({ type: "GET_SHOE_TYPE_RESET" });
};

export const removeShoeSizeAction = () => (dispatch) => {
  dispatch({ type: "GET_SHOE_SIZE_RESET" });
};

export const removeShoeColorAction = () => (dispatch) => {
  dispatch({ type: "GET_SHOE_COLOR_RESET" });
};

export const removeShoeColorActionDistinct = () => (dispatch) => {
  dispatch({ type: "GET_SHOE_COLOR_DISTINCT_RESET" });
};

export const removeOrderAction = () => (dispatch) => {
  dispatch({ type: "GET_ORDER_RESET" });
};

export const removeOrderDetailAction = () => (dispatch) => {
  dispatch({ type: "GET_ORDER_DETAIL_RESET" });
};

export const removeSaleAction = () => (dispatch) => {
  dispatch({ type: "GET_SALE_RESET" });
};

export const removeShoeOnShoeTypeAdminAction = () => (dispatch) => {
  dispatch({ type: "REMOVE_SHOE_ON_SHOE_TYPE_ADMIN_REQUEST" });
};

export const removeBannerAction = () => (dispatch) => {
  dispatch({ type: "GET_BANNER_RESET" });
};

export const removeNewsAction = () => (dispatch) => {
  dispatch({ type: "REMOVE_NEWS_ACTION" });
};

export const removeNewsDetailAction = () => (dispatch) => {
  dispatch({ type: "REMOVE_NEWS_DETAIL_ACTION" });
};
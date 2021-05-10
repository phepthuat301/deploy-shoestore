import axios from "axios";
export const createInvoice = (params) => async (dispatch) => {
  try {
    dispatch({ type: "CREATE_INVOICE_REQUEST" });
    const data = await axios.post("http://hieugiaynhuy.tk/createinvoice", {
      id_user: params.id_user,
      hoten: params.hoten,
      sodienthoai: params.sodienthoai,
      email: params.email,
      trangthai: "Chờ Xác Nhận",
      diachi: params.diachi,
      loaithanhtoan: params.loaithanhtoan,
      cartItems: params.cartItems,
      totalPrice: params.totalPrice,
    });
    if(!data.data.message) {
      dispatch(sendMailToUserAction(params))
    }
    dispatch({
      type: "CREATE_INVOICE_SUCCESS",
      payload: data,
    });
  } catch (error) {
    dispatch({
      type: "CREATE_INVOICE_FAIL",
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
};

export const sendMailToUserAction = (params) => async (dispatch) => {
  try {
    dispatch({ type: "SEND_MAIL_TO_USER_REQUEST" });
    const data = await axios.post("http://hieugiaynhuy.tk/sendmailtouser", {
      id_user: params.id_user,
      hoten: params.hoten,
      sodienthoai: params.sodienthoai,
      email: params.email,
      trangthai: "Chờ Xác Nhận",
      diachi: params.diachi,
      loaithanhtoan: params.loaithanhtoan,
      cartItems: params.cartItems,
      totalPrice: params.totalPrice,
    });
    dispatch({
      type: "SEND_MAIL_TO_USER_SUCCESS",
      payload: data,
    });
  } catch (error) {
    dispatch({
      type: "SEND_MAIL_TO_USER_FAIL",
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
};

export const changeCheckoutStatus = () => {
  return {
    type: 'CHANGE_CHECK_OUT_STATUS',
  };
};
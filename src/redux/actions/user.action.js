import axios from 'axios'
const md5 = require('md5');

export const loginAction = (params) => async (dispatch) => {
  try {
    dispatch({ type: "LOGIN_REQUEST" });
    const data = await axios.post(`http://hieugiaynhuy.tk/login`, {
      password: md5(params.passwordLog),
      username: params.usernameLog,
    });
    dispatch({
      type: "LOGIN_SUCCESS",
      payload: data,
    });
  } catch (error) {
    dispatch({
      type: "LOGIN_FAIL",
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
};

export const logoutAction = () => {
  return {
    type: 'LOGOUT',
  }
}

export const registerAction = (params) => async (dispatch) => {
  try {
    dispatch({ type: "REGISTER_REQUEST" });
    const data = await axios.post("http://hieugiaynhuy.tk/createuser", {
      hoten: params.hoten,
      diachi: params.diachi,
      sodienthoai: params.sodienthoai,
      email: params.email,
      username: params.username,
      password: md5(params.password),
      role: "khachhang",
    });
    dispatch({
      type: "REGISTER_SUCCESS",
      payload: data,
    });
  } catch (error) {
    dispatch({
      type: "REGISTER_FAIL",
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
};

export const getUser = () => async (dispatch) => {
  try {
    dispatch({ type: "GET_USER_REQUEST" });

    const { data } = await axios.get("http://hieugiaynhuy.tk/user");

    dispatch({
      type: "GET_USER_SUCCESS",
      payload: data,
    });
  } catch (error) {
    dispatch({
      type: "GET_USER_FAIL",
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
};

export const updatePasswordAction = (oldPass, newPass, id_user) => async (dispatch) => {
  try {
    dispatch({ type: "UPDATE_PASSWORD_REQUEST" });
    const data = await axios.put("http://hieugiaynhuy.tk/updatepassword", {
      oldPass: md5(oldPass),
      newPass: md5(newPass),
      id_user,
    });
    dispatch({
      type: "UPDATE_PASSWORD_SUCCESS",
      payload: data,
    });
  } catch (error) {
    dispatch({
      type: "UPDATE_PASSWORD_FAIL",
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
};

export const getUserOrderAction = (id) => async (dispatch) => {
  try {
    dispatch({ type: "GET_USER_ORDER_REQUEST" });
    const data = await axios.get(`http://hieugiaynhuy.tk/userorder/${id}`);
    dispatch({
      type: "GET_USER_ORDER_SUCCESS",
      payload: data,
    });
  } catch (error) {
    dispatch({
      type: "GET_USER_ORDER_FAIL",
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
};


export const updateUserInfoAction = (params) => async (dispatch) => {
  try {
    dispatch({ type: "UPDATE_USER_INFO_REQUEST" });
    await axios.put(`http://hieugiaynhuy.tk/updateuser`, {
      id_user: params.id_user,
      hoten: params.hoten,
      email: params.email,
      diachi: params.diachi,
      sodienthoai: params.sodienthoai,
    });
    dispatch({
      type: "UPDATE_USER_INFO_SUCCESS",
      payload: params,
    });
  } catch (error) {
    dispatch({
      type: "UPDATE_USER_INFO_FAIL",
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
};

export const updateRoleAction = (params) => async (dispatch) => {
  try {
    dispatch({ type: "UPDATE_ROLE_REQUEST" });
    await axios.put(`http://hieugiaynhuy.tk/updaterole`, {
      id_user: params.id_user,
      role: params.role,
    });
    dispatch({
      type: "UPDATE_ROLE_SUCCESS",
      payload: params,
    });
  } catch (error) {
    dispatch({
      type: "UPDATE_ROLE_FAIL",
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
};

export const resetPasswordAction = (id) => async (dispatch) => {
  try {
    dispatch({ type: "RESET_PASSWORD_REQUEST" });
    await axios.put(`http://hieugiaynhuy.tk/resetpassword`, {
      id_user: id,
      password: md5("1"),
    });
    dispatch({
      type: "RESET_PASSWORD_SUCCESS",
    });
  } catch (error) {
    dispatch({
      type: "RESET_PASSWORD_FAIL",
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
};

export const userResetPasswordAction = (email) => async (dispatch) => {
  try {
    dispatch({ type: "USER_RESET_PASSWORD_REQUEST" });
    const data = await axios.post(`http://hieugiaynhuy.tk/userresetpassword`, {
      email
    });
    dispatch({
      type: "USER_RESET_PASSWORD_SUCCESS",
      payload: data,
    });
  } catch (error) {
    dispatch({
      type: "USER_RESET_PASSWORD_FAIL",
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
};


export const checkAuthResetAction = (authToken) => async (dispatch) => {
  try {
    dispatch({ type: "CHECK_AUTH_RESET_REQUEST" });
    const data = await axios.post(`http://hieugiaynhuy.tk/checkauthreset`, {
      authToken,
    });
    dispatch({
      type: "CHECK_AUTH_RESET_SUCCESS",
      payload: data,
    });
  } catch (error) {
    dispatch({
      type: "CHECK_AUTH_RESET_FAIL",
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
};

export const userAuthResetPwdAction = (password,id_user) => async (dispatch) => {
  try {
    dispatch({ type: "USER_AUTH_RESET_PWD_REQUEST" });
    await axios.post(`http://hieugiaynhuy.tk/userauthresetpwd`, {
      password: md5(password),
      id_user,
    });
    dispatch({
      type: "USER_AUTH_RESET_PWD_SUCCESS",
    });
  } catch (error) {
    dispatch({
      type: "USER_AUTH_RESET_PWD_FAIL",
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
};

export const removeUserOrderAction = () => {
  return {
    type: 'REMOVE_USER_ORDER_ACTION',
  }
}

export const removeUserAction = () => {
  return {
    type: 'REMOVE_USER_ACTION',
  }
}

export const removeResetUserAction = () => {
  return {
    type: 'REMOVE_RESET_USER_ACTION',
  }
}
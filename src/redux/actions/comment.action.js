import axios from "axios";

export const createCommentAction = (params) => async (dispatch) => {
    try {
        dispatch({ type: "CREATE_COMMENT_REQUEST "});
        await axios.post("http://hieugiaynhuy.tk/createcomment", {
            id_giay: params.id_giay,
            id_user: params.id_user,
            noidung: params.noidung,
            tieude: params.tieude,
            sosao: params.sosao,
            hoten: params.hoten
        }); dispatch ({
            type: "CREATE_COMMENT_SUCCESS",
            payload: params,
        });
    } catch (error) {
        dispatch({
            type: "CREATE_COMMENT_FAIL",
            payload: 
            error.response && error.response.data.message
            ? error.response.data.message
            : error.message,
        });
    }
};

export const createReplyAction = (params) => async (dispatch) => {
    console.log(params)
    try {
        dispatch({ type: "CREATE_REPLY_REQUEST "});
        await axios.post("http://hieugiaynhuy.tk/createreply", {
            id_binhluan: params.id_binhluan,
            phanhoi: params.phanhoi,
            tenqtv: params.tenqtv,
        }); 
        dispatch ({
            type: "CREATE_REPLY_SUCCESS",
            payload: params,
        });
    } catch (error) {
        dispatch({
            type: "CREATE_REPLY_FAIL",
            payload: 
            error.response && error.response.data.message
            ? error.response.data.message
            : error.message,
        });
    }
};

export const getCommentAction = (id_giay) => async (dispatch) => {
    try {
        dispatch({ type: "GET_COMMENT_REQUEST "});
        const data = await axios.get(`http://hieugiaynhuy.tk/getcomment/${id_giay}`); 
        dispatch ({
            type: "GET_COMMENT_SUCCESS",
            payload: data,
        });
    } catch (error) {
        dispatch({
            type: "GET_COMMENT_FAIL",
            payload: 
            error.response && error.response.data.message
            ? error.response.data.message
            : error.message,
        });
    }
};

export const removeCommentAction = () => (dispatch) => {
    dispatch({ type: "REMOVE_COMMENT_RESET" });
  };
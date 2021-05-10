import swal from 'sweetalert'
const initialState = {
    commentList: [],
}

export default function commentReducer(state = initialState, action) {
    switch (action.type) {
        case "CREATE_COMMENT_REQUEST":
            return {
                ...state,
                loading: true,
            };
        case "CREATE_COMMENT_SUCCESS":
            swal("Cảm ơn bạn đã gửi đánh giá", "", "success")
            state.commentList.push(action.payload)
            return {
                ...state,
                loading: false,
            };
        case "CREATE_COMMENT_FAIL":
            return {
                ...state,
                loading: false,
                error: action.payload,
            };


        case "GET_COMMENT_REQUEST":
            return {
                ...state,
                loading: true,
            };
        case "GET_COMMENT_SUCCESS":
            return {
                ...state,
                commentList: action.payload.data,
                loading: false,
            };
        case "GET_COMMENT_FAIL":
            return {
                ...state,
                loading: false,
                error: action.payload,
            };



        case "CREATE_REPLY_REQUEST":
            return {
                ...state,
                loading: true,
            };
        case "CREATE_REPLY_SUCCESS":
            let reply = state.commentList;
            reply.map(item=>{
                if(item.id_binhluan === action.payload.id_binhluan){
                    item.phanhoi = action.payload.phanhoi
                    item.tenqtv = action.payload.tenqtv
                }
            })
            swal("Gửi phản hồi thành công","","success")
            return {
                ...state,
                commentList: reply,
                loading: false,
            };
        case "CREATE_REPLY_FAIL":
            return {
                ...state,
                loading: false,
                error: action.payload,
            };

        case "REMOVE_COMMENT_RESET":
            return {
                ...state,
                commentList: [],
            };

        default:
            return state;

    }
}
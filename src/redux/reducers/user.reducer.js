import swal from 'sweetalert';
import history from '../../utils/history'
var user = JSON.parse(localStorage.getItem('user')) || [];
var token = JSON.parse(localStorage.getItem('token')) || {};
const initialState = {
    userList: [],
    userInfo: user,
    orderList: [],
    resetUser: {},
    checkTime: token,
};

export default function userReducer(state = initialState, action) {
    switch (action.type) {
        case 'LOGOUT': {
            localStorage.setItem('user', JSON.stringify([]));
            history.push("/")
            return {
                ...state,
                userInfo: [],
            };
        }

        case "REGISTER_REQUEST":
            return {
                ...state,
                loading: true,
                userList: [],
            };

        case 'REGISTER_SUCCESS':
            if (action.payload.data === 'found') {
                swal("Tên tài khoản hoặc Email đã tồn tại!", "", "error")
                return {
                    ...state,
                };
            } else {
                const newInfoReg = [{
                    id_user: action.payload.data[0].id_user,
                    hoten: action.payload.data[0].hoten,
                    diachi: action.payload.data[0].diachi,
                    sodienthoai: action.payload.data[0].sodienthoai,
                    email: action.payload.data[0].email,
                    username: action.payload.data[0].username,
                    role: action.payload.data[0].role,
                },]
                localStorage.setItem('user', JSON.stringify(newInfoReg));
                swal("Đăng ký thành công!", {
                    buttons: {
                        dangnhap: {
                            text: "SHOPPING",
                            value: true,
                        },
                    },
                })
                    .then((value) => {
                        switch (value) {

                            case "dangnhap":
                                history.push("/")
                                break;
                            default:
                                history.push("/")
                        }
                    });
                return {
                    ...state,
                    userInfo: newInfoReg,
                };
            }


        case "REGISTER_FAIL":
            return {
                ...state,
                loading: false,
                error: action.payload,
            };

        case "GET_USER_REQUEST":
            return {
                ...state,
                loading: true,
                userList: [],
            };
        case "GET_USER_SUCCESS":
            return {
                ...state,
                userList: action.payload,
                loading: false,
            };
        case "GET_USER_FAIL":
            return {
                ...state,
                loading: false,
                error: action.payload,
            };

        case "LOGIN_REQUEST":
            return {
                ...state,
                loading: true,
            };
        case "LOGIN_SUCCESS":
            if (action.payload.data === 'fail') {
                swal("Sai Tài Khoản Hoặc Mật Khẩu", "", "error")
                return {
                    ...state,
                    loading: false,
                };
            } else {
                const newInfo = [{
                    id_user: action.payload.data[0].id_user,
                    hoten: action.payload.data[0].hoten,
                    diachi: action.payload.data[0].diachi,
                    sodienthoai: action.payload.data[0].sodienthoai,
                    email: action.payload.data[0].email,
                    username: action.payload.data[0].username,
                    role: action.payload.data[0].role,
                },]
                localStorage.setItem('user', JSON.stringify(newInfo));
                swal("Đăng nhập thành công!", {
                    buttons: {
                        dangnhap: {
                            text: "Trang Chủ",
                            value: true,
                        },
                    },
                })
                    .then((value) => {
                        switch (value) {

                            case "dangnhap":
                                history.push("/")
                                break;
                            default:
                                history.push("/")
                        }
                    });
                return {
                    ...state,
                    userInfo: newInfo,
                    loading: false,
                };
            }

        case "LOGIN_FAIL":
            return {
                ...state,
                loading: false,
                error: action.payload,
            };

        case "UPDATE_PASSWORD_REQUEST":
            return {
                ...state,
                loading: true,
            };
        case "UPDATE_PASSWORD_SUCCESS":
            if (action.payload.data === false) {
                swal("Mật khẩu cũ không đúng", "vui lòng nhập lại", "warning")
            } else {
                swal("Bạn đã thay đổi mật khẩu thành công", "", "success")
            }
            return {
                ...state,
                loading: false,
            };
        case "UPDATE_PASSWORD_FAIL":
            return {
                ...state,
                loading: false,
                error: action.payload,
            };

        case "GET_USER_ORDER_REQUEST":
            return {
                ...state,
                loading: true,
            };
        case "GET_USER_ORDER_SUCCESS":
            return {
                ...state,
                orderList: action.payload.data,
                loading: false,
            };
        case "GET_USER_ORDER_FAIL":
            return {
                ...state,
                loading: false,
                error: action.payload,
            };

        case "UPDATE_USER_INFO_REQUEST":
            return {
                ...state,
                loading: true,
            };
        case "UPDATE_USER_INFO_SUCCESS":
            const newUserInfo = state.userInfo;
            newUserInfo[0] = {
                ...newUserInfo[0],
                hoten: action.payload.hoten,
                email: action.payload.email,
                diachi: action.payload.diachi,
                sodienthoai: action.payload.sodienthoai,
            }
            localStorage.setItem('user', JSON.stringify(newUserInfo));
            swal("Cập nhật thành công!", "", "success")
            return {
                ...state,
                userInfo: newUserInfo,
                loading: false,
            };
        case "UPDATE_USER_INFO_FAIL":
            return {
                ...state,
                loading: false,
                error: action.payload,
            };

        case "RESET_PASSWORD_SUCCESS":
            swal("Reset Mật Khẩu Thành Công", "Mật khẩu sẽ là '1'", "success")
            return {
                ...state,
                loading: false,
            };

        case "UPDATE_ROLE_SUCCESS":
            const newRoleUserList = state.userList;
            newRoleUserList.map(item => {
                if (item.id_user === action.payload.id_user) {
                    item.role = action.payload.role
                }
            })
            return {
                ...state,
                userList: newRoleUserList,
                loading: false,
            };

        case "USER_RESET_PASSWORD_REQUEST":
            return {
                ...state,
                loadingReset: true,
            };
        case "USER_RESET_PASSWORD_SUCCESS":
            const timeAfterReset = {
                tokenTime: Date.now() + 300000,
            };
            localStorage.setItem('token', JSON.stringify(timeAfterReset));
            if (action.payload.data === "email not found") {
                swal("Email vừa nhập không tồn tại", "Vui lòng liên hệ với quản trị viên nếu bạn quên email!", "warning")
            } else {
                swal("Gửi yêu cầu thành công", "Vui lòng kiểm tra email của bạn", "success")
            }
            return {
                ...state,
                checkTime: timeAfterReset,
                loadingReset: false,
            };
        case "USER_RESET_PASSWORD_FAIL":
            return {
                ...state,
                loadingReset: false,
                error: action.payload,
            };



        case "CHECK_AUTH_RESET_REQUEST":
            return {
                ...state,
                loading: true,
            };
        case "CHECK_AUTH_RESET_SUCCESS":
            if (action.payload.data === "token not found") {
                return {
                    ...state,
                    resetUser: action.payload.data,
                    loading: false,
                };
            }
            if (action.payload.data === "token expired") {
                return {
                    ...state,
                    resetUser: action.payload.data,
                    loading: false,
                };
            }
            else {
                return {
                    ...state,
                    resetUser: action.payload.data[0],
                    loading: false,
                };
            }
        case "CHECK_AUTH_RESET_FAIL":
            return {
                ...state,
                loading: false,
                error: action.payload,
            };

        case "USER_AUTH_RESET_PWD_REQUEST":
            return {
                ...state,
                loading: true,
            };
        case "USER_AUTH_RESET_PWD_SUCCESS":
            return {
                ...state,
                resetUser: "success",
                loading: false,
            };
        case "USER_AUTH_RESET_PWD_FAIL":
            return {
                ...state,
                loading: false,
                error: action.payload,
            };


        case "REMOVE_USER_ORDER_ACTION":
            return {
                ...state,
                orderList: [],
            };

        case "REMOVE_USER_ACTION":
            return {
                ...state,
                userList: [],
            };

        case "REMOVE_RESET_USER_ACTION":
            return {
                ...state,
                resetUser: {},
            };

        default: {
            return state;
        }
    }
}

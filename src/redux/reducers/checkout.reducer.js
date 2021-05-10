
import swal from 'sweetalert';
import history from '../../utils/history';
const initialState = {
    checkout: false,
};

export default function checkoutReducer(state = initialState, action) {
    switch (action.type) {
        case "CREATE_INVOICE_REQUEST":
            return {
                ...state,
                loading: true,
            };

        case "CREATE_INVOICE_SUCCESS":
            if (action.payload.data.message) {
                const shoeDetailFail = action.payload.data.message
                swal("Đặt hàng thất bại!", `${shoeDetailFail.tenmagiay}-Màu ${shoeDetailFail.color}-Size ${shoeDetailFail.sosize} vượt quá số lượng hàng hiện có`, "warning")
                return {
                    ...state,
                    loading: false,
                    checkout: false,
                };
            }
            else {
                swal("Đặt hàng thành công", {
                    buttons: {
                        dathang: {
                            text: "Next",
                            value: true,
                        },
                    },
                })
                    .then((value) => {
                        switch (value) {
                            case "dathang":
                                history.push("/checkout/step3")
                                break;
                            default:
                                history.push("/checkout/step3")
                        }
                    });
                return {
                    ...state,
                    loading: false,
                    checkout: true,
                };
            }
        // case "SEND_MAIL_TO_USER_REQUEST":
        //     return {
        //         ...state,
        //         loading: true,
        //     };

        // case "SEND_MAIL_TO_USER_SUCCESS":
        //     return {
        //         ...state,
        //         loading: false,
        //     };

        case "CHANGE_CHECK_OUT_STATUS":
            return {
                ...state,
                checkout: false,
            };
        default: {
            return state;
        }
    }
}
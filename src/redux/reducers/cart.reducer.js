import swal from 'sweetalert';
var cart = JSON.parse(localStorage.getItem('cart')) || [];
const CART_INITIAL_STATE = {
  cartItems: cart,
};
export default function cartReducer(state = CART_INITIAL_STATE, action) {
  switch (action.type) {
    case "ADD_TO_CART":
      const newCartItems = [...state.cartItems];
      let check = false;
      if (newCartItems.length > 0) {
        check = newCartItems.some((product) => product.id_giay === action.payload.id_giay && product.color === action.payload.color && product.sosize === action.payload.sosize)
        if (check === false) {
          newCartItems.push(action.payload);
          swal("Thêm Sản Phẩm Thành Công!!", "", "success");
        } else swal("Sản phẩm đã tồn tại trong giỏ hàng", "", "warning");
      } else {
        newCartItems.push(action.payload);
      }
      localStorage.setItem('cart', JSON.stringify(newCartItems));
      return {
        ...state,
        cartItems: newCartItems,
      };
    case "REMOVE_FROM_CART":
      const newCartItems2 = [...state.cartItems];
      newCartItems2.splice(action.payload, 1);
      localStorage.setItem('cart', JSON.stringify(newCartItems2));
      return {
        ...state,
        cartItems: newCartItems2,
      };
    case "CLEAR_CART":
      localStorage.setItem('cart', JSON.stringify([]));
      return {
        ...state,
        cartItems: [],
      }

    case 'PLUS_QTY_ITEM':
      state.cartItems.map((item,index)=>{
        if(index == action.payload){
          item.soluong++;
        }
      })
      localStorage.setItem('cart', JSON.stringify(state.cartItems));
      return { 
        ...state,
      };
    case 'MINUS_QTY_ITEM':
      state.cartItems.map((item,index)=>{
        if(index == action.payload){
          item.soluong--;
        }
      })
      localStorage.setItem('cart', JSON.stringify(state.cartItems));
      return { 
        ...state,
      };
    default:
      return state;
  }
};
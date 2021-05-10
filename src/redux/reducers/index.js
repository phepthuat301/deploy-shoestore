import { combineReducers } from 'redux';
import userReducer from './user.reducer';
import productReducer from './product.reducer';
import cartReducer from './cart.reducer';
import adminReducer from './admin.reducer';
import checkoutReducer from './checkout.reducer';
import commentReducer from './comment.reducer'
export default combineReducers({
  userReducer: userReducer,
  productReducer: productReducer,
  cartReducer: cartReducer,
  adminReducer: adminReducer,
  checkoutReducer: checkoutReducer,
  commentReducer: commentReducer,
})

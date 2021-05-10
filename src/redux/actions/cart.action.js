export const addToCart = (params) => {
  return {
    type: 'ADD_TO_CART',
    payload: params,
  };
};

export const removeFromCart = (index) => {
  return {
    type: 'REMOVE_FROM_CART',
    payload: index,
  }
};

export const clearCart = () => {
  return {
    type : "CLEAR_CART"
  }
};

export const plusQtyItem = (index) => {
  return {
    type: 'PLUS_QTY_ITEM',
    payload: index
  }
};

export const minusQtyItem = (index) => {
  return {
    type: 'MINUS_QTY_ITEM',
    payload: index
  }
};

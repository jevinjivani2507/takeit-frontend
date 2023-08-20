import {
  UPDATE_ADD_ADDRESS_POPUP_STATE,
  UPDATE_ADD_PRODUCT_POPUP_STATE,
  UPDATE_PAYMENT_POPUP_STATE,
} from "../ActionTypes";

export const popUpReducer = (
  state = {
    addAddress: false,
    addProduct: false,
    payment: {
      show: false,
      data: {},
    },
  },
  action
) => {
  switch (action.type) {
    case UPDATE_ADD_ADDRESS_POPUP_STATE: {
      return {
        ...state,
        addAddress: action.value,
      };
    }

    case UPDATE_ADD_PRODUCT_POPUP_STATE: {
      return {
        ...state,
        addProduct: action.value,
      };
    }

    case UPDATE_PAYMENT_POPUP_STATE: {
      return {
        ...state,
        payment: action.value,
      };
    }

    default:
      return state;
  }
};

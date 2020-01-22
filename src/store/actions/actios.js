import axios from "axios";


export const MENU_REQUEST = 'MENU_REQUEST';
export const MENU_RESPONSE = 'MENU_RESPONSE';
export const MENU_ERROR = 'MENU_ERROR';

export const ORDERS_REQUEST = 'ORDERS_REQUEST';
export const ORDERS_RESPONSE = 'ORDERS_RESPONSE';
export const ORDERS_ERROR = 'ORDERS_ERROR';

export const EDIT_TITLE = 'EDIT_TITLE';
export const EDIT_PRICE = 'EDIT_PRICE';
export const EDIT_SRC = 'EDIT_SRC';

export const ACTIVATION_EDIT = 'ACTIVATION_EDIT';
export const CLOSE_EDIT = 'CLOSE_EDIT';

export const ADD_PRICE_LIST = 'ADD_PRICE_LIST';

export const menuRequest = () => ({type: MENU_REQUEST});
export const menuResponse = data => ({type: MENU_RESPONSE, data});
export const menuError = () => ({type: MENU_ERROR});

export const addPriceList = data => ({type: ADD_PRICE_LIST, data});

export const orderRequest = () => ({type: ORDERS_REQUEST});
export const orderResponse = data => ({type: ORDERS_RESPONSE, data});
export const orderError = () => ({type: ORDERS_ERROR});

export const getMenu = () => async dispatch => {
    dispatch(menuRequest());
    const data = await axios.get('https://burgerapp-9e830.firebaseio.com/dishes.json');
    try {
        dispatch(addPriceList(data.data));
        dispatch(menuResponse(data.data));
    } catch(e) {
        dispatch(menuError())
    }
};
export const getOrders = () => async dispatch => {
    dispatch(orderRequest());
    const data = await axios.get('https://burgerapp-9e830.firebaseio.com/orders.json');
    try {
        dispatch(orderResponse(data.data));
    } catch(e) {
        dispatch(orderError())
    }
};

export const editTitle = (value, name) => ({type:EDIT_TITLE, value, name});
export const editPrice = (value, name) => ({type:EDIT_PRICE, value, name});
export const editSrc = (value, name) => ({type:EDIT_SRC, value, name});

export const activationEdit = name => ({type: ACTIVATION_EDIT, name});
export const closeEdit = name => ({type: CLOSE_EDIT, name});
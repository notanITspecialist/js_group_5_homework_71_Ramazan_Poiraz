import {ADD_PRICE_LIST, ORDERS_RESPONSE} from "../actions/actios";

const initialState = {
    orders: {},
    priceList: []
};

const ordersReducer = ( state = initialState, action ) => {
    if(action.type === ORDERS_RESPONSE){
        for(let key in action.data){
            action.data[key].totalPrice = 150
        }
        Object.keys(action.data).forEach(elem => {
            for(let key in action.data[elem]){
                if(key !== 'totalPrice'){
                    action.data[elem].totalPrice = action.data[elem].totalPrice + (state.priceList[key] * action.data[elem][key])
                }
            }
        });
        return {...state, orders: action.data}
    }
    if(action.type === ADD_PRICE_LIST){
        const priceList = {};
        for(let key in action.data){
            priceList[action.data[key].title] = parseInt(action.data[key].price)
        }
        return {...state, priceList: priceList}
    }
    return state
};

export default ordersReducer
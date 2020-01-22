import {ACTIVATION_EDIT, CLOSE_EDIT, EDIT_PRICE, EDIT_SRC, EDIT_TITLE, MENU_RESPONSE} from "../actions/actios";

const initialState = {
    menu: {}
};

const dishesReducer = ( state = initialState, action ) => {
    if(action.type === MENU_RESPONSE){
        for ( let key in action.data) {
            action.data[key].edit = false
        }
        return {...state, menu: action.data}
    }

    if(action.type === ACTIVATION_EDIT){
        return { ...state, menu: {
                ...state.menu, [action.name]: {
                    ...state.menu[action.name], edit: true
                }
            }
        };
    }
    if(action.type === CLOSE_EDIT){
        return { ...state, menu: {
                ...state.menu, [action.name]: {
                    ...state.menu[action.name], edit: false
                }
            }
        };
    }

    if(action.type === EDIT_TITLE){
        return { ...state, menu: { ...state.menu, [action.name]: {
                    ...state.menu[action.name],
                    title: action.value
                }
            }
        }
    }
    if(action.type === EDIT_PRICE){
        return { ...state, menu: { ...state.menu, [action.name]: {
                    ...state.menu[action.name],
                    price: action.value
                }
            }
        }
    }
    if(action.type === EDIT_SRC){
        return { ...state, menu: { ...state.menu, [action.name]: {
                    ...state.menu[action.name],
                    imageLink: action.value
                }
            }
        }
    }

    return state
};

export default dishesReducer
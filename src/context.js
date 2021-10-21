import React, { createContext, useContext, useReducer } from "react";
import {cartItems} from './data';
import reducer from "./reducer";

const AppContext = createContext();

const initialState = {
    loading: false,
    cart: cartItems,
    total: 0,
    amount: 0
}

const AppProvider = ({children}) => {

    const [state, dispatch] = useReducer(reducer, initialState);

    const removeItems = () => {
        dispatch({type: 'CLEAR_CART'});
    }

    const remove = (id) => {
        dispatch({type: 'REMOVE', id: id});
    }

    return (
        <AppContext.Provider value={{
            ...state,
            removeItems,
            remove,

        }}>
            {children}
        </AppContext.Provider>
    )
}

export const useGlobalContext = () => {
    return useContext(AppContext);
}

export {AppProvider, AppContext}
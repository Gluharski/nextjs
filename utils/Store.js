import { createContext, useReducer } from "react";
import Cookies from "js-cookie";

export const Store = createContext();

const initialState = {
    // cart items
    cart: Cookies.get('cart')
        ? JSON.parse(Cookies.get('cart'))
        : { cartItems: [] },

    // theme
    darkMode: Cookies.get('darkMode') === 'ON' ? true : false,
};

function reducer(state, action) {
    switch (action.type) {

        // CART ACTIONS
        case 'CART_ADD_ITEM': {
            const newItem = action.payload;
            const existItem = state.cart.cartItems.find((item) => item.slug === newItem.slug);

            const cartItems = existItem
                ? state.cart.cartItems.map((item) =>
                    item.name == existItem.name ? newItem : item)
                : [...state.cart.cartItems, newItem]

            Cookies.set('cart', JSON.stringify({ ...state.cart, cartItems })) // update cookie for cart key
            return { ...state, cart: { ...state.cart, cartItems } }
        }
        case 'CART_REMOVE_ITEM': {
            const cartItems = state.cart.cartItems.filter(
                (item) => item.slug !== action.payload.slug
            );

            Cookies.set('cart', JSON.stringify({ ...state.cart, cartItems })) // update cookie for cart key
            return { ...state, cart: { ...state.cart, cartItems } }
        }

        // THEME ACTIONS
        case 'DARK_MODE_ON':
            return { ...state, darkMode: true }
        case 'DARK_MODE_OFF':
            return { ...state, darkMode: false }
        default:
            return state;
    }
};

export function StoreProvider({ children }) {
    const [state, dispatch] = useReducer(reducer, initialState);
    const value = { state, dispatch }

    return <Store.Provider value={value}>
        {children}
    </Store.Provider>
}
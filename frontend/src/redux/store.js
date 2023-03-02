import {createSlice, configureStore} from "@reduxjs/toolkit";

const cartSlice = createSlice({
    name: "cart",
    initialState: {
        cart: [],
        user: null
    },
    reducers: {
        addProduct: (state, action) => {
            const existingProduct = state.cart.find(product => product._id === action.payload._id);

            if(existingProduct) {
                existingProduct.quantity++
            } 
            else {
                state.cart.push({...action.payload, quantity: 1})
            }
        },
        removeProduct: (state, action) => {
            const index = state.cart.findIndex(product => product._id === action.payload._id);

            state.cart.splice(index, 1);
        },
        login: (state, action) => {
            state.user = action.payload;
        },
        logout: (state) => {
            state.user = null;
        }
    }
});

const store = configureStore({
    reducer: cartSlice.reducer
});

const { addProduct, removeProduct, login, logout} = cartSlice.actions;

const cartCountSelector = (state) => {
let count = 0;
state.cart.forEach(item => {
    count += item.quantity;
});
return count;
}

const cartTotalPriceSelector = (state) => {
    return state.cart.reduce((total, product) => total + product.quantity * product.price, 0)}

export {store, addProduct, removeProduct, cartCountSelector, cartTotalPriceSelector, login, logout}

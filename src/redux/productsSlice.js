const { createSlice } = require("@reduxjs/toolkit");

export const productSlice = createSlice({
    name: "products",
    initialState: [],
    reducers: {
        addProduct: (state, action) => {
            state.push(action.payload);
        },
        updateInvoice: (state, action) => {
            const index = state.findIndex(
                (product) => product.id === action.payload.id
            );
            if (index !== -1) {
                state[index] = action.payload.updatedProduct;
            }
        }
    }
});

export const {
    addProduct,
    updateProduct,
} = productSlice.actions;

export const selectProductList = (state) => state.products;

export default productSlice.reducer;
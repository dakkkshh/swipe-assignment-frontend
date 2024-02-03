const { createSlice } = require("@reduxjs/toolkit");

export const productSlice = createSlice({
    name: "products",
    initialState: [],
    reducers: {
        addProduct: (state, action) => {
            state.push(action.payload);
        },
        updateProduct: (state, action) => {
            const index = state.findIndex(
                (product) => product.productId === action.payload.productId
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
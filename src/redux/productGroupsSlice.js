const { createSlice } = require("@reduxjs/toolkit");

export const productGroupsSlice = createSlice({
    name: "productGroups",
    initialState: [],
    reducers: {
        addProductGroup: (state, action) => {
            state.push(action.payload);
        },
        updateProductGroup: (state, action) => {
            const index = state.findIndex(
                (productGroup) => productGroup.groupId === action.payload.groupId
            );
            if (index !== -1) {
                state[index] = action.payload.updatedProductGroup;
            }
        }
    }
});

export const {
    addProductGroup,
    updateProductGroup,
} = productGroupsSlice.actions;

export const selectProductGroupList = (state) => state.productGroups;

export default productGroupsSlice.reducer;
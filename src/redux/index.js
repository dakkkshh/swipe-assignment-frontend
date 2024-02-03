import { combineReducers } from "@reduxjs/toolkit";
import invoicesReducer from "./invoicesSlice";
import productsReducer from "./productsSlice";
import productGroupsReducer from "./productGroupsSlice"; // Import your other reducers

const rootReducer = combineReducers({
  invoices: invoicesReducer,
  products: productsReducer,
  productGroups: productGroupsReducer,
});

export default rootReducer;

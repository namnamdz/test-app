//THIRD-IMPORT
import { combineReducers } from "@reduxjs/toolkit";

//PROJECT-IMPORT
import loadingSlice from "./slices/loadingSlice";
import snackbarReducer from "./slices/snackbarSlice";
import menuReducer from "./slices/menu";

const reducer = combineReducers({
  loading: loadingSlice,
  snackbar: snackbarReducer,
  menu: menuReducer,
});
export default reducer;

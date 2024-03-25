import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  isLoading: false,
};
const loadingSlice = createSlice({
  name: "loading",
  initialState,
  reducers: {
    setLoading(state) {
      state.isLoading = true;
    },
    setStopLoading(state) {
      state.isLoading = false;
    },
  },
});

export const { setLoading, setStopLoading } = loadingSlice.actions;
export default loadingSlice.reducer;

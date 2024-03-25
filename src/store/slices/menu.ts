// PROJECT IMPORTS
import { MenuProps } from 'types/menu';

// THIRD-PARTY
import { createSlice } from '@reduxjs/toolkit';


const initialState: MenuProps = {
  openItem: 'Hồ sơ khám',
  drawerOpen: false,
};

const menu = createSlice({
  name: 'menu',
  initialState,
  reducers: {
    activeItem(state: MenuProps, action: any) {
      state.openItem = action.payload;
    },

    openDrawer(state: MenuProps, action: any) {
      state.drawerOpen = action.payload;
    }
  }
});


export default menu.reducer;

export const { activeItem, openDrawer } = menu.actions;

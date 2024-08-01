import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    text_color: 'text-[#CF5E02]',
    bg_color: 'bg-[#CF5E02]',
}

export const ThemeSlice = createSlice({
    name: "ThemeSlice",
    initialState,
    reducers: {
        changeTextColor: (state, action) => {
            state.color_prime = action.payload;
        },
        changeBgColor: (state, action) => {
            state.bg_color = action.payload;
        },
    }
})

export const { changeTextColor, changeBgColor } = ThemeSlice.actions;
export default ThemeSlice.reducer;
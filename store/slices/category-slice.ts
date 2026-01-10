import { Category } from "@/entities/category/types";
import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface CategoriesState {
  items: Category[];
  loaded: boolean;
}

const initialState: CategoriesState = {
  items: [],
  loaded: false,
};

const categoriesSlice = createSlice({
  name: "categories",
  initialState,
  reducers: {
    setCategories(state, action: PayloadAction<Category[]>) {
      state.items = action.payload;
      state.loaded = true;
    },
  },
});

export const { setCategories } = categoriesSlice.actions;
export default categoriesSlice.reducer;

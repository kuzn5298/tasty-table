import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit';
import { Category } from './../../types';
import { FetchStatus } from '../../constants';
import { mealsService } from '../../services';

interface CategoryState {
  categories: Category[];
  status: FetchStatus;
}

const initialState: CategoryState = {
  categories: [],
  status: FetchStatus.Idle,
};

export const fetchCategories = createAsyncThunk(
  'categories/fetchCategories',
  async () => {
    const response = await mealsService.getMealsCategories();
    if (response.status >= 300 || response.status < 200) {
      throw Error(response.statusText);
    }
    return response.data ?? [];
  }
);

const categorySlice = createSlice({
  name: 'category',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(
        fetchCategories.fulfilled,
        (state, action: PayloadAction<Category[]>) => {
          state.status = FetchStatus.Succeeded;
          state.categories = action.payload;
        }
      )
      .addCase(fetchCategories.pending, (state) => {
        state.status = FetchStatus.Loading;
      })
      .addCase(fetchCategories.rejected, (state) => {
        state.status = FetchStatus.Failed;
      });
  },
});

export const categoryActions = { fetchCategories };

export const categoryReducer = categorySlice.reducer;

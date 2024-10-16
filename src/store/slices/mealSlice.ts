import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit';
import { Meal, ShortMeal } from '../../types';
import { FetchStatus } from '../../constants';
import { mealsService } from '../../services';

interface MealState {
  meals: {
    [key: string]: ShortMeal[];
  };
  status: {
    [key: string]: FetchStatus;
  };
}

const initialState: MealState = {
  meals: {},
  status: {},
};

export const fetchMealsByCategory = createAsyncThunk(
  'meal/fetchMealsByCategory',
  async (category: string) => {
    const response = await mealsService.getMealsByCategory(category);
    if (response.status >= 300 || response.status < 200) {
      throw Error(response.statusText);
    }
    return response.data ?? [];
  }
);

const mealSlice = createSlice({
  name: 'meal',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(
        fetchMealsByCategory.fulfilled,
        (state, action: PayloadAction<Meal[], string, { arg: string }>) => {
          const category = action.meta.arg;
          state.meals[category] = action.payload;
          state.status[category] = FetchStatus.Succeeded;
        }
      )
      .addCase(
        fetchMealsByCategory.pending,
        (state, action: PayloadAction<undefined, string, { arg: string }>) => {
          const category = action.meta.arg;
          state.status[category] = FetchStatus.Loading;
        }
      )
      .addCase(fetchMealsByCategory.rejected, (state, action) => {
        const category = action.meta.arg;
        state.status[category] = FetchStatus.Failed;
      });
  },
});

export const mealActions = { fetchMealsByCategory };

export const mealReducer = mealSlice.reducer;

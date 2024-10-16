import client from '../libs/client';
import { Category, Meal, ResponseApi } from '../types';

export const getMealById = async (id: string): Promise<ResponseApi<Meal>> => {
  let { data, ...response } = await client.get<{ meals: Meal[] }>(
    `/lookup.php?i=${id}`
  );

  return {
    ...response,
    data: data?.meals?.[0] ?? null,
  };
};

export const searchMealsByName = async (
  name: string
): Promise<ResponseApi<Meal[]>> => {
  let { data, ...response } = await client.get<{ meals: Meal[] }>(
    `/search.php?s=${name}`
  );

  return {
    ...response,
    data: data?.meals ?? null,
  };
};

export const getMealsByCategory = async (
  category: string
): Promise<ResponseApi<Meal[]>> => {
  let { data, ...response } = await client.get<{ meals: Meal[] }>(
    `/filter.php?c=${category}`
  );

  return {
    ...response,
    data: data?.meals ?? null,
  };
};

export const getMealsCategories = async (): Promise<
  ResponseApi<Category[]>
> => {
  let { data, ...response } = await client.get<{ categories: Category[] }>(
    `/categories.php`
  );

  return {
    ...response,
    data: data?.categories ?? null,
  };
};

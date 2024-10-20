import client from '@/libs/client';
import { findMatchesItems, searchByKey } from '@/libs/utils';
import {
  Area,
  AreaApi,
  Category,
  CategoryApi,
  Meal,
  MealApi,
  ResponseApi,
  ShortMeal,
  ShortMealApi,
} from '@/types';
import { parseMeal, parseShortMeal } from './helpers';
import { MealsFilter } from './types';

export const getMealsAreas = async (): Promise<ResponseApi<Area[]>> => {
  const { data, ...response } = await client.get<{ meals: AreaApi[] }>(
    '/list.php?a=list'
  );

  const parsedData: Area[] | null =
    data?.meals
      ?.map((item) => ({
        name: item.strArea,
      }))
      ?.filter((area) => area.name !== 'Unknown') ?? null;

  return {
    ...response,
    data: parsedData,
  };
};

export const getMealsCategories = async (): Promise<
  ResponseApi<Category[]>
> => {
  const { data, ...response } = await client.get<{ meals: CategoryApi[] }>(
    '/list.php?c=list'
  );

  const parsedData: Category[] | null =
    data?.meals
      ?.map((item) => ({
        name: item.strCategory,
      }))
      ?.filter((area) => area.name !== 'Unknown') ?? null;

  return {
    ...response,
    data: parsedData,
  };
};

export const getMealsByName = async (
  name: string
): Promise<ResponseApi<ShortMeal[]>> => {
  const { data, ...response } = await client.get<{ meals: MealApi[] }>(
    `/search.php?s=${name}`
  );

  const meals = data?.meals?.map(parseShortMeal);

  return {
    ...response,
    data: meals ?? null,
  };
};

export const getMealsByArea = async (
  area: string
): Promise<ResponseApi<ShortMeal[]>> => {
  const { data, ...response } = await client.get<{ meals: ShortMealApi[] }>(
    `/filter.php?a=${area}`
  );

  const meals = data?.meals?.map(parseShortMeal);

  return {
    ...response,
    data: meals ?? null,
  };
};

export const getMealsByCategory = async (
  category: string
): Promise<ResponseApi<ShortMeal[]>> => {
  const { data, ...response } = await client.get<{ meals: ShortMealApi[] }>(
    `/filter.php?c=${category}`
  );

  const meals = data?.meals?.map(parseShortMeal);

  return {
    ...response,
    data: meals ?? null,
  };
};

export const getMealsByFilter = async ({
  search,
  category,
  area,
}: MealsFilter): Promise<ResponseApi<ShortMeal[]>> => {
  if (!!search && !category && !area) {
    return getMealsByName(search);
  }

  const categoryResponse = category ? await getMealsByCategory(category) : null;
  const areaResponse = area ? await getMealsByArea(area) : null;
  const meals = findMatchesItems(
    categoryResponse?.data ?? undefined,
    areaResponse?.data ?? undefined,
    'id'
  );
  const foundMeals = searchByKey(meals, 'name', search);

  return {
    data: foundMeals,
    status: Math.max(categoryResponse?.status ?? 0, areaResponse?.status ?? 0),
    statusText: categoryResponse?.statusText ?? areaResponse?.statusText ?? '',
  };
};

export const getMealById = async (id: string): Promise<ResponseApi<Meal>> => {
  const { data, ...response } = await client.get<{ meals: MealApi[] }>(
    `/lookup.php?i=${id}`
  );

  const meal = data?.meals?.[0];

  return {
    ...response,
    data: meal ? parseMeal(meal) : null,
  };
};

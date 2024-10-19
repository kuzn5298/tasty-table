import client from '../libs/client';
import {
  Area,
  AreaApi,
  Meal,
  MealApi,
  ResponseApi,
  ShortMeal,
  ShortMealApi,
} from '../types';

const generatePrice = (id: string, min = 5, max = 20): number => {
  const numericId = parseInt(id);
  const range = max - min + 1;
  const price = (numericId % range) + min;
  return price;
};

const API_INGREDIENTS_LENGTH = 20;
const INGREDIENTS_NUMBERS = new Array(API_INGREDIENTS_LENGTH)
  .fill(null)
  .map((_, i) => i + 1);

const parseShortMeal = (meal: ShortMealApi): ShortMeal => ({
  id: meal.idMeal,
  name: meal.strMeal,
  img: meal.strMealThumb,
  price: generatePrice(meal.idMeal),
});

const parseMeal = (meal: MealApi): Meal => {
  const tags = meal.strTags?.split(',') ?? [];
  const ingredients = INGREDIENTS_NUMBERS.map(
    (number) => meal[`strIngredient${number}`]
  ).filter(Boolean) as string[];

  return {
    ...parseShortMeal(meal),
    area: meal.strArea,
    category: meal.strCategory,
    ingredients,
    tags,
  };
};

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

export const getMealsByArea = async (
  area: string
): Promise<ResponseApi<Meal[]>> => {
  const { data, ...response } = await client.get<{ meals: MealApi[] }>(
    `/filter.php?a=${area}`
  );

  const meals = data?.meals?.map(parseMeal);

  return {
    ...response,
    data: meals ?? null,
  };
};

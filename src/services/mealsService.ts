import client from '@/libs/client';
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

export const getMealsByName = async (
  name: string
): Promise<ResponseApi<Meal[]>> => {
  const { data, ...response } = await client.get<{ meals: MealApi[] }>(
    `/search.php?s=${name}`
  );

  const meals = data?.meals?.map(parseMeal);

  return {
    ...response,
    data: meals ?? null,
  };
};

interface MealsFilter {
  search?: string;
  category?: string;
  area?: string;
}

const findMatchesMeals = (
  meals1?: ShortMeal[] | null,
  meals2?: ShortMeal[] | null
): ShortMeal[] => {
  if (!meals1) {
    return meals2 ?? [];
  }
  if (!meals2) {
    return meals1 ?? [];
  }

  const meals2Ids = new Set(meals2.map((meal) => meal.id));
  return meals1.filter((meal) => meals2Ids.has(meal.id));
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
  const meals = findMatchesMeals(categoryResponse?.data, areaResponse?.data);
  const foundMeals = meals.filter((meal) =>
    meal.name.toLowerCase().includes((search ?? '')?.toLocaleLowerCase())
  );

  return {
    data: foundMeals,
    status: Math.max(
      categoryResponse?.status ?? 0,
      areaResponse?.status ?? 0,
      404
    ),
    statusText: categoryResponse?.statusText ?? areaResponse?.statusText ?? '',
  };
};

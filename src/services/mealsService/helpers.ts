import { Meal, MealApi, ShortMeal, ShortMealApi } from '@/types';

export const generatePrice = (id: string, min = 5, max = 20): number => {
  const numericId = parseInt(id);
  const range = max - min + 1;
  const price = (numericId % range) + min;
  return price;
};

const API_INGREDIENTS_LENGTH = 20;
const INGREDIENTS_NUMBERS = new Array(API_INGREDIENTS_LENGTH)
  .fill(null)
  .map((_, i) => i + 1);

export const parseShortMeal = (meal: ShortMealApi): ShortMeal => ({
  id: meal.idMeal,
  name: meal.strMeal,
  img: meal.strMealThumb,
  price: generatePrice(meal.idMeal),
});

const capitalizeFirstLetter = (string: string) => {
  return string.charAt(0).toUpperCase() + string.slice(1).toLowerCase();
};

export const parseMeal = (meal: MealApi): Meal => {
  const tags = meal.strTags?.split(',').map(capitalizeFirstLetter) ?? [];
  const ingredientsArr = INGREDIENTS_NUMBERS.map((number) =>
    capitalizeFirstLetter(meal[`strIngredient${number}`] ?? '')
  ).filter(Boolean);
  const ingredients = [...new Set(ingredientsArr)];

  return {
    ...parseShortMeal(meal),
    area: meal.strArea,
    category: meal.strCategory,
    ingredients,
    tags,
  };
};

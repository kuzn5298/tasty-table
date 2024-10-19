export interface MealApi {
  idMeal: string;
  strMeal: string;
  strDrinkAlternate: string | null;
  strCategory: string;
  strArea: string;
  strInstructions: string | null;
  strMealThumb: string;
  strTags: string | null;
  strYoutube: string | null;
  strSource: string | null;
  strImageSource: string | null;
  strCreativeCommonsConfirmed: string | null;
  dateModified: string | null;
  [key: `strIngredient${number}`]: string | null;
  [key: `strMeasure${number}`]: string | null;
}

export interface Meal {
  id: string;
  name: string;
  category: string;
  area: string;
  img: string;
  tags: string[];
  ingredients: string[];
  price: number;
}

export type ShortMealApi = Pick<MealApi, 'idMeal' | 'strMeal' | 'strMealThumb'>;

export type ShortMeal = Pick<Meal, 'id' | 'name' | 'img' | 'price'>;

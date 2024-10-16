export interface Meal {
  idMeal: string;
  strMeal: string;
  strDrinkAlternate: string | null;
  strCategory: string | null;
  strArea: string | null;
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

export type ShortMeal = Pick<Meal, 'idMeal' | 'strMeal' | 'strMealThumb'>;

import { CartMeal } from '@/store';

export const mockCartMeals: CartMeal[] = [
  {
    id: '52812',
    name: 'Beef Brisket Pot Roast',
    img: 'https://www.themealdb.com/images/media/meals/ursuup1487348423.jpg',
    price: 17,
    count: 2,
  },
  {
    id: '52952',
    name: 'Beef Lo Mein',
    img: 'https://www.themealdb.com/images/media/meals/1529444830.jpg',
    price: 13,
    count: 3,
  },
  {
    id: '52855',
    name: 'Banana Pancakes',
    img: 'https://www.themealdb.com/images/media/meals/sywswr1511383814.jpg',
    price: 12,
    count: 1,
  },
  {
    id: '52995',
    name: 'BBQ Pork Sloppy Joes',
    img: 'https://www.themealdb.com/images/media/meals/atd5sh1583188467.jpg',
    price: 8,
    count: 2,
  },
  {
    id: '53085',
    name: '15-minute chicken & halloumi burgers',
    img: 'https://www.themealdb.com/images/media/meals/vdwloy1713225718.jpg',
    price: 18,
    count: 1,
  },
];

export const mockCartMealsMap = mockCartMeals.reduce(
  (acc, meal) => ({
    ...acc,
    [meal.id]: meal,
  }),
  {}
);

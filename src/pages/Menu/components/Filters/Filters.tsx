import { HTMLAttributes, useRef, useState } from 'react';
import clsx from 'clsx';
import { useQuery } from '@tanstack/react-query';
import { Input, Select } from '@/components/ui';
import { mealsService } from '@/services';

import classes from './Filters.module.css';

const DEBOUNCE = 500;

export type FilterType = {
  search: string;
  area: string;
  category: string;
};

export interface FilterProps
  extends Omit<HTMLAttributes<HTMLDivElement>, 'onChange'> {
  value: FilterType;
  onChange: (e: FilterType) => void;
}

export const Filters: React.FC<FilterProps> = ({
  value,
  onChange,
  className,
  ...props
}) => {
  const [inputValue, setInputValue] = useState(value.search);
  const timeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const { data: { data: areasData } = {} } = useQuery({
    queryKey: ['getMealsAreas'],
    queryFn: mealsService.getMealsAreas,
  });

  const { data: { data: categoriesData } = {} } = useQuery({
    queryKey: ['getMealsCategories'],
    queryFn: mealsService.getMealsCategories,
  });

  const handleChange = (newFilter: Partial<FilterType>) => {
    onChange({
      ...value,
      ...newFilter,
    });
  };

  const debouncedChangeSearch = (newValue: string) => {
    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current);
    }
    timeoutRef.current = setTimeout(() => {
      handleChange?.({ search: newValue });
    }, DEBOUNCE);
  };

  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newValue = e.target.value;
    setInputValue(newValue);
    debouncedChangeSearch(newValue);
  };

  const handleArea = (e: React.ChangeEvent<HTMLSelectElement>) => {
    handleChange({ area: e.target.value });
  };

  const handleCategory = (e: React.ChangeEvent<HTMLSelectElement>) => {
    handleChange({ category: e.target.value });
  };

  return (
    <div className={clsx(classes.container, className)} {...props}>
      <Input
        className={classes.input}
        placeholder='Search...'
        value={inputValue ?? ''}
        onChange={handleSearch}
      />
      <Select
        placeholder='Countries'
        value={value.area ?? ''}
        onChange={handleArea}
      >
        {areasData?.map((area) => (
          <option key={area.name} value={area.name}>
            {area.name}
          </option>
        ))}
      </Select>
      <Select
        placeholder='Categories'
        value={value.category ?? ''}
        onChange={handleCategory}
      >
        {categoriesData?.map((category) => (
          <option key={category.name} value={category.name}>
            {category.name}
          </option>
        ))}
      </Select>
    </div>
  );
};

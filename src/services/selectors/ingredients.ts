import { createSelector } from '@reduxjs/toolkit';
import { RootState } from '../store';

const getItems = (state: RootState) => state.ingredients.items;

export const getBuns = createSelector(getItems, (items) =>
  items.filter((item) => item.type === 'bun')
);

export const getMains = createSelector(getItems, (items) =>
  items.filter((item) => item.type === 'main')
);

export const getSauces = createSelector(getItems, (items) =>
  items.filter((item) => item.type === 'sauce')
);

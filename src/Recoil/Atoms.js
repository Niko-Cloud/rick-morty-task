import { atom } from 'recoil';

export const locationsState = atom({
  key: 'locationsState',
  default: [],
});

export const charactersState = atom({
  key: 'charactersState',
  default: [],
});

export const pageState = atom({
  key: 'pageState',
  default: 1,
});

export const searchQueryState = atom({
  key: 'searchQueryState',
  default: '',
});
import { Currency, Group } from 'src/indexTypes';

const formatCurrency = (curr: Currency) => {
  return `${curr.name} (${curr.symbol})`;
};

const getGroupIdFromUrl = () => {
  return window.location.pathname.split('group/')[1];
};

const getItems = (key: string) => {
  const items = JSON.parse(localStorage.getItem(key) || '[]');
  return items;
};

const updateToLS = (item: any, key: string) => {
  const val = JSON.parse(localStorage.getItem(key) || '[]');
  const updatedVal = [item, ...val.filter((g: any) => g.id !== item.id)];
  localStorage.setItem(key, JSON.stringify(updatedVal));
  return updatedVal;
};

const addToLS = (item: any, key: string) => {
  const val = [item, ...JSON.parse(localStorage.getItem(key) || '[]')];
  localStorage.setItem(key, JSON.stringify(val));
  return val;
};

export {
  formatCurrency,
  getGroupIdFromUrl,
  getItems,
  addToLS,
  updateToLS,
};

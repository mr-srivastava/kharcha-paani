import { sum } from 'lodash';
import { Expense } from 'src/indexTypes';

const formatCurrency = (cc?: string) => {
  return new Intl.NumberFormat(undefined, {
    currency: cc || 'inr',
    style: 'currency',
    minimumFractionDigits: 2,
  });
};

const getGroupIdFromUrl = () => {
  return window.location.pathname.split('group/')[1];
};

const getItems = <T = unknown>(key: string): T[] => {
  const items = JSON.parse(localStorage.getItem(key) || '[]');
  return items;
};

const updateToLS = <T = unknown>(item: any, key: string): T[] => {
  const val = JSON.parse(localStorage.getItem(key) || '[]');
  const itemId = item.id ?? item._id;
  const updatedVal = [item, ...val.filter((g: any) => (g.id ?? g._id) !== itemId)];
  localStorage.setItem(key, JSON.stringify(updatedVal));
  return updatedVal;
};

const addToLS = (item: any, key: string) => {
  const val = [item, ...JSON.parse(localStorage.getItem(key) || '[]')];
  localStorage.setItem(key, JSON.stringify(val));
  return val;
};

const getTotal = (id: string, expenses: Expense[]) => {
  const groupExpenses = expenses
    .filter((exp: Expense) => exp.groupId === id)
    .map((exp: Expense) => exp.amount);
  return sum(groupExpenses);
};

export {
  formatCurrency,
  getGroupIdFromUrl,
  getItems,
  addToLS,
  updateToLS,
  getTotal,
};

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

const getTotal = (id: string, expenses: Expense[]) => {
  const groupExpenses = expenses
    .filter((exp: Expense) => exp.groupId === id)
    .map((exp: Expense) => exp.amount);
  return sum(groupExpenses);
};

export {
  formatCurrency,
  getGroupIdFromUrl,
  getTotal,
};

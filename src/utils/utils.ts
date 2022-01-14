import { Currency } from 'src/indexTypes';

const formatCurrency = (curr: Currency) => {
  return `${curr.name} (${curr.symbol})`;
};

const getGroupIdFromUrl = () => {
  return window.location.pathname.split('group/')[1];
};

const getGroups = () => {
  const groups = JSON.parse(localStorage.getItem('groups') || '[]');
  return groups;
};

const addGroupToLS = (group: any) => {
  const groups = JSON.parse(localStorage.getItem('groups') || '[]');
  groups.push(group);
  localStorage.setItem('groups', JSON.stringify(groups));
};

export { formatCurrency, getGroupIdFromUrl, getGroups, addGroupToLS };

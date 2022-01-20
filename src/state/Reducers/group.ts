import { Group, Expense, Member } from 'src/indexTypes';
import { addToLS, getItems, updateToLS } from 'src/utils';

interface InitialState {
  groups: Group[];
  expenses: Expense[];
}

const initialState: InitialState = {
  groups: [],
  expenses: [],
};

const addExpenseToMembers = (expense: Expense) => {
  const currGroup = getItems('groups').find(
    (g: Group) => g.id === expense.groupId
  );
  const updatedCurrGroup = {
    ...currGroup,
    members: currGroup.members.map((mem: Member) => {
      const paid = expense.paidBy.find((m: any) => m.id === mem.id)
        ? mem.paid + Math.round(expense.amount / expense.paidBy.length)
        : mem.paid;
      const share = expense.sharedBy.find((m: any) => m.id === mem.id)
        ? Math.round(expense.amount / expense.sharedBy.length) + mem.share
        : mem.share;
      return { ...mem, share, paid };
    }),
  };

  return updateToLS(updatedCurrGroup, 'groups');
};

const GroupReducer = (state = initialState, action: any) => {
  const { payload, type } = action;
  switch (type) {
    case 'SET_APP_STATE':
      return {
        ...state,
        groups: getItems('groups'),
        expenses: getItems('expenses'),
      };
    case 'ADD_GROUP':
      const newGroups = addToLS(
        {
          id: payload.id,
          name: payload.groupName,
          members: payload.members,
        },
        'groups'
      );
      return { ...state, groups: newGroups };
    case 'UPDATE_GROUP':
      const updatedGroups = updateToLS(
        {
          id: payload.id,
          name: payload.groupName,
          members: payload.members,
        },
        'groups'
      );
      return { ...state, groups: updatedGroups };
    case 'ADD_EXPENSE':
      const newExpenses = updateToLS(payload, 'expenses');
      const groupsWithNewExpenses = addExpenseToMembers(payload);
      return {
        ...state,
        expenses: newExpenses,
        groups: groupsWithNewExpenses,
      };
    default:
      return { ...state };
  }
};

export { GroupReducer };

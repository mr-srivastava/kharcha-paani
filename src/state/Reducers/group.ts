import { Group, Expense } from 'src/indexTypes';
import { addToLS, getItems, updateToLS } from 'src/utils';

interface InitialState {
  groups: Group[];
  expenses: Expense[];
}

const initialState: InitialState = {
  groups: [],
  expenses: [],
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
      const newGroup: Group = {
        id: payload.id,
        name: payload.groupName,
        members: payload.members,
      };
      const newGroups = addToLS(newGroup, 'groups');
      return { ...state, groups: newGroups };
    case 'UPDATE_GROUP':
      const updatedGroup: Group = {
        id: payload.id,
        name: payload.groupName,
        members: payload.members,
      };
      const updatedGroups = updateToLS(updatedGroup, 'groups');
      return { ...state, groups: updatedGroups };
    case 'ADD_EXPENSE':
      const newExpenses = updateToLS(payload, 'expenses');
      return {
        ...state,
        expenses: newExpenses,
        // members: state.members.map((mem: any) => {
        //   const paid = action.payload.paidBy.find((m: any) => m.id === mem.id)
        //     ? Math.round(action.payload.amount / action.payload.paidBy.length)
        //     : mem.share;
        //   const share = action.payload.sharedBy.find(
        //     (m: any) => m.id === mem.id
        //   )
        //     ? Math.round(action.payload.amount / action.payload.sharedBy.length)
        //     : 0;
        //   return { ...mem, share: paid - share };
        // }),
        // expenses: [...state.expenses, action.payload],
      };
    default:
      return { ...state };
  }
};

export { GroupReducer };

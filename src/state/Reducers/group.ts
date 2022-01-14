import { Group, Expense } from "src/indexTypes";
import { addGroupToLS } from "src/utils";

interface InitialState {
  groups: Group[];
  expenses: Expense[];
}

const initialState: InitialState = {
  groups: [],
  expenses: [],
};

const GroupReducer = (state = initialState, action: any) => {
  switch (action.type) {
    case 'SET_GROUP_INFO':
      const newGroup: Group = {
        id: action.payload.id,
        name: action.payload.groupName,
        members: action.payload.members,
      };
      addGroupToLS(newGroup)
      return { ...state, groups: [...state.groups, newGroup] };
    case 'ADD_EXPENSE':
      return {
        ...state,
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

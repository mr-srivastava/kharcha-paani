interface GroupState {
  id: string;
  name: string;
  members: any[];
  expenses: any[];
}

const initialGroupState: GroupState = {
  id: '',
  name: '',
  members: [],
  expenses: [],
};

const GroupReducer = (state = initialGroupState, action: any) => {
  switch (action.type) {
    case 'SET_GROUP_INFO':
      return {
        ...state,
        id: action.payload.id,
        name: action.payload.groupName,
        members: action.payload.members,
      };
    case 'ADD_EXPENSE':
      return {
        ...state,
        members: state.members.map((mem: any) => {
          const paid = action.payload.paidBy.find((m: any) => m.id === mem.id)
            ? Math.round(action.payload.amount / action.payload.paidBy.length)
            : mem.share;
          const share = action.payload.sharedBy.find(
            (m: any) => m.id === mem.id
          )
            ? Math.round(action.payload.amount / action.payload.sharedBy.length)
            : 0;
          return { ...mem, share: paid - share };
        }),
        expenses: [...state.expenses, action.payload],
      };
    default:
      return { ...state };
  }
};

export { GroupReducer };

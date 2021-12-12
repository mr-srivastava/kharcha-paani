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

    default:
      return { ...state };
  }
};

export { GroupReducer };

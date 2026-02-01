# Redux to Zustand Migration Guide

## Overview

This project has been migrated from Redux + Redux Saga to Zustand for simpler, more maintainable state management.

## Key Changes

### Before (Redux)
```tsx
import { useAppDispatch, useAppSelector } from 'src/state/stateHooks';

const MyComponent = () => {
  const dispatch = useAppDispatch();
  const groups = useAppSelector((state) => state.groupPage.groups);
  const loading = useAppSelector((state) => state.groups.loading);

  useEffect(() => {
    dispatch({ type: 'GET_ALL_GROUPS' });
  }, []);

  const handleAddGroup = (data) => {
    dispatch({ 
      type: 'ADD_GROUP_SUCCESS', 
      payload: { id: data.id, groupName: data.name, members: data.members } 
    });
  };

  return <div>{/* ... */}</div>;
};
```

### After (Zustand)
```tsx
import { useGroupStore } from 'src/store/useGroupStore';

const MyComponent = () => {
  const { groups, loading, getAllGroups, addGroup } = useGroupStore();

  useEffect(() => {
    getAllGroups();
  }, [getAllGroups]);

  const handleAddGroup = (data) => {
    addGroup({ 
      id: data.id, 
      groupName: data.name, 
      members: data.members 
    });
  };

  return <div>{/* ... */}</div>;
};
```

## Store API Reference

### State Properties

```typescript
const {
  groups,      // Group[] - Array of all groups
  expenses,    // Expense[] - Array of all expenses
  loading,     // boolean - Loading state
  error,       // string | null - Error message
} = useGroupStore();
```

### Actions

#### `setAppState()`
Load groups and expenses from localStorage
```tsx
const { setAppState } = useGroupStore();
setAppState();
```

#### `getAllGroups()`
Fetch all groups from API
```tsx
const { getAllGroups } = useGroupStore();
await getAllGroups();
```

#### `getGroupById(id: string)`
Fetch a specific group by ID
```tsx
const { getGroupById } = useGroupStore();
const group = await getGroupById('group-id');
```

#### `addGroup(payload)`
Add group to local state and localStorage
```tsx
const { addGroup } = useGroupStore();
addGroup({
  id: 'group-id',
  groupName: 'Trip to Goa',
  members: [{ _id: '1', name: 'John', share: 0, paid: 0 }]
});
```

#### `createGroup(payload)`
Create new group via API
```tsx
const { createGroup } = useGroupStore();
const result = await createGroup({
  name: 'Trip to Goa',
  members: ['user1', 'user2']
});
```

#### `updateGroup(payload)`
Update group in local state and localStorage
```tsx
const { updateGroup } = useGroupStore();
updateGroup({
  id: 'group-id',
  groupName: 'Updated Name',
  members: [/* updated members */]
});
```

#### `updateGroupApi(payload)`
Update group via API
```tsx
const { updateGroupApi } = useGroupStore();
await updateGroupApi({
  id: 'group-id',
  payloadData: { name: 'Updated Name' }
});
```

#### `deleteGroup(id)`
Delete group via API
```tsx
const { deleteGroup } = useGroupStore();
await deleteGroup('group-id');
```

#### `addExpense(expense)`
Add expense and update group members
```tsx
const { addExpense } = useGroupStore();
addExpense({
  id: 'expense-id',
  groupId: 'group-id',
  name: 'Dinner',
  amount: 1000,
  paidBy: [{ id: 'user1' }],
  sharedBy: [{ id: 'user1' }, { id: 'user2' }]
});
```

#### `reset()`
Reset store to initial state
```tsx
const { reset } = useGroupStore();
reset();
```

## Selector Patterns

### Select specific state
```tsx
// Only re-renders when groups change
const groups = useGroupStore((state) => state.groups);

// Only re-renders when loading changes
const loading = useGroupStore((state) => state.loading);
```

### Select multiple values
```tsx
const { groups, loading, error } = useGroupStore((state) => ({
  groups: state.groups,
  loading: state.loading,
  error: state.error,
}));
```

### Select derived state
```tsx
const groupCount = useGroupStore((state) => state.groups.length);
const hasGroups = useGroupStore((state) => state.groups.length > 0);
```

## Migration Checklist

### Files to Update

- [ ] `src/bootstrap.tsx` - Remove Redux Provider
- [ ] `src/pages/Groups/Groups.tsx` - Replace Redux hooks with Zustand
- [ ] `src/pages/GroupPage/GroupPage.tsx` - Replace Redux hooks with Zustand
- [ ] `src/pages/LandingPage/LandingPage.tsx` - Replace Redux hooks with Zustand
- [ ] `src/components/GroupModal/GroupModal.tsx` - Replace Redux hooks with Zustand
- [ ] `src/components/AddExpense/AddExpense.tsx` - Replace Redux hooks with Zustand

### Files to Delete

- [ ] `src/state/store.ts`
- [ ] `src/state/rootReducer.ts`
- [ ] `src/state/rootSaga.ts`
- [ ] `src/state/stateHooks.ts`
- [ ] `src/state/Reducers/group.ts`
- [ ] `src/state/Sagas/groupSaga.ts`
- [ ] `src/state/` (entire folder after migration)

## Benefits of Zustand

1. **Simpler API**: No actions, reducers, or sagas - just direct state updates
2. **Less Boilerplate**: ~70% less code compared to Redux
3. **Better TypeScript**: Full type inference without extra setup
4. **Smaller Bundle**: ~1KB vs Redux's ~10KB
5. **DevTools**: Built-in Redux DevTools support
6. **Persistence**: Built-in localStorage persistence
7. **No Provider**: Works without wrapping your app in a Provider (though you can still use one)

## Example Component Migration

### Before: Groups.tsx (Redux)
```tsx
import { useEffect } from 'react';
import { useAppDispatch, useAppSelector } from 'src/state/stateHooks';

export const Groups = () => {
  const dispatch = useAppDispatch();
  const { groups, loading } = useAppSelector((state) => state.groups);

  useEffect(() => {
    dispatch({ type: 'GET_ALL_GROUPS' });
  }, [dispatch]);

  return (
    <div>
      {loading ? 'Loading...' : groups.map(group => (
        <div key={group._id}>{group.name}</div>
      ))}
    </div>
  );
};
```

### After: Groups.tsx (Zustand)
```tsx
import { useEffect } from 'react';
import { useGroupStore } from 'src/store/useGroupStore';

export const Groups = () => {
  const groups = useGroupStore((state) => state.groups);
  const loading = useGroupStore((state) => state.loading);
  const getAllGroups = useGroupStore((state) => state.getAllGroups);

  useEffect(() => {
    getAllGroups();
  }, [getAllGroups]);

  return (
    <div>
      {loading ? 'Loading...' : groups.map(group => (
        <div key={group._id}>{group.name}</div>
      ))}
    </div>
  );
};
```

## Testing

Zustand stores can be easily tested:

```typescript
import { useGroupStore } from 'src/store/useGroupStore';

// Reset store before each test
beforeEach(() => {
  useGroupStore.getState().reset();
});

// Test actions
test('adds a group', () => {
  const { addGroup, groups } = useGroupStore.getState();
  
  addGroup({
    id: 'test-id',
    groupName: 'Test Group',
    members: []
  });
  
  expect(useGroupStore.getState().groups).toHaveLength(1);
});
```

## Resources

- [Zustand Documentation](https://docs.pmnd.rs/zustand/getting-started/introduction)
- [Zustand GitHub](https://github.com/pmndrs/zustand)
- [Migration from Redux](https://docs.pmnd.rs/zustand/migrations/migrating-to-v5)

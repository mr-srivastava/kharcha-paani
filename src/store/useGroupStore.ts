import { create } from 'zustand';
import { devtools, persist } from 'zustand/middleware';
import axios from 'axios';
import { Group, Expense, Member } from 'src/indexTypes';
import { addToLS, getItems, updateToLS, getApiUrl } from 'src/utils';

const API_BASE = getApiUrl();

interface GroupState {
  // State
  groups: Group[];
  expenses: Expense[];
  loading: boolean;
  error: string | null;

  // Actions
  setAppState: () => void;
  
  // Group actions
  getAllGroups: () => Promise<void>;
  getGroupById: (id: string) => Promise<Group | null>;
  addGroup: (payload: { id: string; groupName: string; members: Member[] }) => void;
  createGroup: (payload: any) => Promise<any>;
  updateGroup: (payload: { id: string; groupName: string; members: Member[] }) => void;
  updateGroupApi: (payload: { id: string; payloadData: any }) => Promise<void>;
  deleteGroup: (id: string) => Promise<void>;
  
  // Expense actions
  addExpense: (expense: Expense) => void;
  
  // Utility actions
  reset: () => void;
}

const addExpenseToMembers = (expense: Expense) => {
  const currGroup = getItems<Group>('groups').find(
    (g: Group) => g._id === expense.groupId
  );
  
  if (!currGroup) return [];
  
  const updatedCurrGroup = {
    ...currGroup,
    members: currGroup.members.map((mem: Member) => {
      const paid = expense.paidBy.find((m: any) => m.id === mem._id)
        ? mem.paid + Math.round(expense.amount / expense.paidBy.length)
        : mem.paid;
      const share = expense.sharedBy.find((m: any) => m.id === mem._id)
        ? Math.round(expense.amount / expense.sharedBy.length) + mem.share
        : mem.share;
      return { ...mem, share, paid };
    }),
  };

  return updateToLS<Group>(updatedCurrGroup, 'groups');
};

export const useGroupStore = create<GroupState>()(
  devtools(
    persist(
      (set, get) => ({
        // Initial state
        groups: [],
        expenses: [],
        loading: false,
        error: null,

        // Set app state from localStorage
        setAppState: () => {
          set({
            groups: getItems<Group>('groups'),
            expenses: getItems<Expense>('expenses'),
          });
        },

        // Get all groups from API
        getAllGroups: async () => {
          set({ loading: true, error: null });
          try {
            const response = await axios.get(`${API_BASE}/api/group/`);
            set({ 
              groups: response.data.groups, 
              loading: false 
            });
          } catch (error: any) {
            set({ 
              error: error.message || 'Failed to fetch groups', 
              loading: false 
            });
          }
        },

        // Get group by ID
        getGroupById: async (id: string) => {
          try {
            const response = await axios.get(`${API_BASE}/api/group/${id}`);
            if (response.status === 200) {
              return response.data;
            }
            return null;
          } catch (error) {
            console.error('Error fetching group:', error);
            return null;
          }
        },

        // Add group to local state and localStorage
        addGroup: (payload) => {
          const newGroups = addToLS(
            {
              _id: payload.id,
              name: payload.groupName,
              members: payload.members,
            },
            'groups'
          );
          set({ groups: newGroups });
        },

        // Create new group via API
        createGroup: async (payload: any) => {
          try {
            const response = await axios.post(`${API_BASE}/api/group/`, payload);
            if (response.status === 200) {
              return response.data;
            }
          } catch (error) {
            console.error('Error creating group:', error);
            throw error;
          }
        },

        // Update group in local state and localStorage
        updateGroup: (payload) => {
          const updatedGroups = updateToLS<Group>(
            {
              _id: payload.id,
              name: payload.groupName,
              members: payload.members,
            },
            'groups'
          );
          set({ groups: updatedGroups });
        },

        // Update group via API
        updateGroupApi: async (payload) => {
          const { id, payloadData } = payload;
          try {
            const response = await axios.put(
              `${API_BASE}/api/group/${id}`,
              payloadData
            );
            if (response.status === 200) {
              // Refresh groups after update
              await get().getAllGroups();
            }
          } catch (error) {
            console.error('Error updating group:', error);
            throw error;
          }
        },

        // Delete group via API
        deleteGroup: async (id: string) => {
          try {
            const response = await axios.delete(`${API_BASE}/api/group/${id}`);
            if (response.status === 200) {
              // Refresh groups after delete
              await get().getAllGroups();
            }
          } catch (error) {
            console.error('Error deleting group:', error);
            throw error;
          }
        },

        // Add expense
        addExpense: (expense: Expense) => {
          const newExpenses = updateToLS<Expense>(expense, 'expenses');
          const groupsWithNewExpenses = addExpenseToMembers(expense);
          set({
            expenses: newExpenses,
            groups: groupsWithNewExpenses,
          });
        },

        // Reset store
        reset: () => {
          set({
            groups: [],
            expenses: [],
            loading: false,
            error: null,
          });
        },
      }),
      {
        name: 'group-storage', // localStorage key
        partialize: (state) => ({
          // Only persist groups and expenses, not loading/error states
          groups: state.groups,
          expenses: state.expenses,
        }),
      }
    ),
    {
      name: 'GroupStore', // DevTools name
    }
  )
);

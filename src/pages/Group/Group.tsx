import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useMutation, useQuery } from 'convex/react';
import { api } from '../../../convex/_generated/api';
import type { Id } from 'src/indexTypes';
import { AddExpense, GroupModal, PageLayout, PageLoader } from 'src/components';
import { getGroupIdFromUrl } from 'src/utils';
import { useGroupData } from './useGroupData';
import { GroupView } from './GroupView';

/**
 * Group Page Container Component
 * 
 * This component handles:
 * - Route parameter extraction
 * - State management for modals
 * - Actions (delete, edit, add expense)
 * - Delegating data fetching to useGroupData hook
 * - Delegating presentation to GroupView component
 */
function Group() {
  // Extract group ID from URL
  const rawId = getGroupIdFromUrl();
  const id = rawId ? (rawId as Id<'groups'>) : undefined;

  // Data layer: fetch and parse all data
  const groupData = useGroupData(id);

  // State management
  const [showAddExpense, setShowAddExpense] = useState(false);
  const [openEditModal, setOpenEditModal] = useState(false);

  // Actions
  const navigate = useNavigate();
  const deleteGroup = useMutation(api.groups.remove);

  // Need to fetch raw group data for modals (they expect the original structure)
  const rawGroup = useQuery(
    api.groups.get,
    id ? { id } : 'skip'
  );

  // Action handlers
  const handleAddExpense = () => setShowAddExpense(true);
  const handleCloseAddExpense = () => setShowAddExpense(false);
  const handleEditGroup = () => setOpenEditModal(true);
  const handleDeleteGroup = () => {
    if (id) {
      deleteGroup({ id });
      navigate('/groups');
    }
  };

  return (
    <PageLayout contentClassName="font-sans px-6 py-8 max-w-7xl mx-auto">
      {groupData.loading && <PageLoader page="Group" />}

      {groupData.group && !groupData.loading && (
        <>
          <GroupView
            groupName={groupData.group.name}
            formattedTotal={groupData.formattedTotal}
            balances={groupData.balances}
            shares={groupData.shares}
            expenses={groupData.expenses}
            hasExpenses={groupData.hasExpenses}
            onAddExpense={handleAddExpense}
            onEditGroup={handleEditGroup}
            onDeleteGroup={handleDeleteGroup}
          />

          {/* Modals - these still use raw group data */}
          {rawGroup && (
            <>
              <AddExpense
                show={showAddExpense}
                handleClose={handleCloseAddExpense}
                group={rawGroup}
              />
              <GroupModal
                edit
                open={openEditModal}
                setOpen={setOpenEditModal}
                data={rawGroup}
              />
            </>
          )}
        </>
      )}
    </PageLayout>
  );
}

export { Group };

import { useState } from 'react';
import { GroupModal, PageLayout, PageLoader } from 'src/components';
import { useGroupsData } from './useGroupsData';
import { GroupsView } from './GroupsView';

function Groups() {
  const { groups, loading, hasGroups } = useGroupsData();
  const [openModal, setOpenModal] = useState<boolean>(false);

  return (
    <PageLayout contentClassName="font-sans px-6 py-8 max-w-7xl mx-auto">
      {loading && <PageLoader page="Groups" />}
      {!loading && (
        <GroupsView
          groups={groups ?? []}
          hasGroups={hasGroups}
          onCreateGroup={() => setOpenModal(true)}
        />
      )}
      <GroupModal open={openModal} setOpen={setOpenModal} />
    </PageLayout>
  );
}

export { Groups };

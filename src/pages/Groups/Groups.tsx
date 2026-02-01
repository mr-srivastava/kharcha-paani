import { useEffect, useState } from 'react';
import { Button } from '@/components/ui/button';
import { GroupModal, NavBar, PageLoader, GroupCard } from 'src/components';
import { Group } from 'src/indexTypes';
import { useGroupStore } from 'src/store/useGroupStore';
import NullImg from 'src/assets/images/groups_null.svg';

function Groups() {
  const groups = useGroupStore((state) => state.groups);
  const loading = useGroupStore((state) => state.loading);
  const getAllGroups = useGroupStore((state) => state.getAllGroups);

  const [editId, setEditId] = useState<string>('');
  const [openModal, setOpenModal] = useState<boolean>(false);
  const [openEditModal, setOpenEditModal] = useState<boolean>(false);

  useEffect(() => {
    getAllGroups();
  }, [getAllGroups]);

  const handleEditClick = (id: string) => {
    setEditId(id);
    setOpenEditModal(true);
  };

  return (
    <div>
      <NavBar showIcon />
      <div className="font-quando p-5">
        {loading && <PageLoader page="Groups" />}
        {!loading && (
          <>
            <div className="flex justify-between items-center mb-2">
              <h1 className="font-bold">GROUPS</h1>
              <Button
                className="bg-green-primary hover:opacity-90 hover:bg-green-primary"
                onClick={() => setOpenModal(true)}
              >
                Create
              </Button>
            </div>
            <hr className="my-4" />
            {groups && groups.length > 0 ? (
              <div className="grid grid-cols-[repeat(auto-fill,minmax(280px,1fr))] gap-5 items-stretch">
                {groups.map((group: Group) => (
                  <GroupCard
                    key={group._id}
                    data={group}
                    handleEditClick={handleEditClick}
                  />
                ))}
              </div>
            ) : (
              <div className="mt-8 flex flex-col justify-center items-center">
                <img src={NullImg} alt="" className="w-1/4" />
                <div className="null-text mt-2 flex flex-col justify-center items-center text-center">
                  <h2 className="text-xl font-semibold">No groups created.</h2>
                  <div className="text-muted-foreground">
                    Please create one to get started.
                  </div>
                </div>
                <Button
                  className="mt-4 bg-green-primary hover:opacity-90 hover:bg-green-primary"
                  onClick={() => setOpenModal(true)}
                >
                  Create
                </Button>
              </div>
            )}
          </>
        )}
      </div>
      <GroupModal open={openModal} setOpen={setOpenModal} />
      <GroupModal
        edit
        open={openEditModal}
        setOpen={setOpenEditModal}
        data={groups.find((g: Group) => g._id === editId)}
      />
    </div>
  );
}

export { Groups };

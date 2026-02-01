import { useEffect, useState } from 'react';
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
    <div className="min-h-screen bg-navy-800">
      <NavBar showIcon />
      <div className="font-sans px-6 py-8 max-w-7xl mx-auto">
        {loading && <PageLoader page="Groups" />}
        {!loading && (
          <div className="animate-fade-in">
            <div className="flex flex-wrap justify-between items-center gap-4 mb-8">
              <h1 className="font-serif text-4xl md:text-5xl font-bold tracking-tight text-white">
                Your <span className="text-teal-400">Groups</span>
              </h1>
              <button
                type="button"
                className="px-8 py-3 bg-teal-400 text-navy-900 font-sans font-semibold rounded-full shadow-glow hover:bg-teal-300 hover:-translate-y-1 transition-all duration-300"
                onClick={() => setOpenModal(true)}
              >
                Create Group
              </button>
            </div>
            <hr className="border-slate-600/50 mb-8" />
            {groups && groups.length > 0 ? (
              <div className="grid grid-cols-[repeat(auto-fill,minmax(280px,1fr))] gap-6 items-stretch">
                {groups.map((group: Group) => (
                  <GroupCard
                    key={group._id}
                    data={group}
                    handleEditClick={handleEditClick}
                  />
                ))}
              </div>
            ) : (
              <div className="mt-12 py-16 flex flex-col justify-center items-center text-center rounded-2xl border border-dashed border-slate-600 bg-navy-900/50">
                <img src={NullImg} alt="" className="w-48 h-auto opacity-80" />
                <h2 className="mt-6 text-2xl font-serif font-semibold text-white">No groups created.</h2>
                <p className="mt-2 text-slate-400 font-sans text-lg max-w-sm">
                  Please create one to get started.
                </p>
                <button
                  type="button"
                  className="mt-6 px-8 py-3 bg-teal-400 text-navy-900 font-sans font-semibold rounded-full shadow-glow hover:bg-teal-300 hover:-translate-y-1 transition-all duration-300"
                  onClick={() => setOpenModal(true)}
                >
                  Create Group
                </button>
              </div>
            )}
          </div>
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

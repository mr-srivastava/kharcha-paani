import { useState } from 'react';
import { useQuery } from 'convex/react';
import { api } from '../../../convex/_generated/api';
import { GroupModal, NavBar, PageLoader, GroupCard } from 'src/components';
import { Group, Id } from 'src/indexTypes';
import NullImg from 'src/assets/images/groups_null.svg';
import { Button } from '@/components/ui/button';
import { Separator } from '@/components/ui/separator';

function Groups() {
  const groups = useQuery(api.groups.list);
  const [editId, setEditId] = useState<Id<'groups'> | ''>('');
  const [openModal, setOpenModal] = useState<boolean>(false);
  const [openEditModal, setOpenEditModal] = useState<boolean>(false);

  const loading = groups === undefined;
  const handleEditClick = (id: Id<'groups'>) => {
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
              <Button
                type="button"
                className="px-8 py-3 bg-teal-400 text-navy-900 font-sans font-semibold rounded-full shadow-glow hover:bg-teal-300 hover:-translate-y-1 transition-all duration-300"
                onClick={() => setOpenModal(true)}
              >
                Create Group
              </Button>
            </div>
            <Separator className="mb-8 bg-slate-600/50" />
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
                <Button
                  type="button"
                  className="mt-6 px-8 py-3 bg-teal-400 text-navy-900 font-sans font-semibold rounded-full shadow-glow hover:bg-teal-300 hover:-translate-y-1 transition-all duration-300"
                  onClick={() => setOpenModal(true)}
                >
                  Create Group
                </Button>
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
        data={groups?.find((g: Group) => g._id === editId)}
      />
    </div>
  );
}

export { Groups };

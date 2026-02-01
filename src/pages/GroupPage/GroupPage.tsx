import { useEffect, useState } from 'react';
import { Button } from '@/components/ui/button';
import { AddExpense, ExpenseTable, NavBar, PageLoader } from 'src/components';
import { getGroupIdFromUrl, formatCurrency, getTotal } from 'src/utils';
import { useGroupStore } from 'src/store/useGroupStore';
import { Group } from 'src/indexTypes';

function GroupPage() {
  const expenses = useGroupStore((state) => state.expenses);
  const getGroupById = useGroupStore((state) => state.getGroupById);

  const id = getGroupIdFromUrl();

  const [group, setGroup] = useState<Group | null>(null);
  const [total, setTotal] = useState<number>(0);
  const [show, setShow] = useState<boolean>(false);
  const [loading, setLoading] = useState<boolean>(false);

  useEffect(() => {
    async function fetchGroup(groupId: string) {
      setLoading(true);
      const groupResp = await getGroupById(groupId);
      setLoading(false);
      setGroup(groupResp ?? null);
    }

    fetchGroup(id);
  }, [id, getGroupById]);

  useEffect(() => {
    setTotal(getTotal(id, expenses));
  }, [expenses, id]);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  return (
    <div>
      <NavBar showIcon />
      {loading && <PageLoader page="Group" />}
      {group && !loading && (
        <>
          <div className="p-2.5">
            <div className="flex justify-between items-center mb-2.5">
              <h1 className="text-xl font-semibold">Group : {group.name}</h1>
              <Button
                className="bg-green-primary hover:opacity-90 hover:bg-green-primary"
                onClick={handleShow}
              >
                Add Expense
              </Button>
            </div>
            <hr className="my-4" />
            <h2 className="text-lg font-semibold">
              TOTAL: {formatCurrency().format(total)}
            </h2>
            <div className="mt-4">
              <ExpenseTable group={group} />
            </div>
          </div>

          <AddExpense show={show} handleClose={handleClose} group={group} />
        </>
      )}
    </div>
  );
}

export { GroupPage };

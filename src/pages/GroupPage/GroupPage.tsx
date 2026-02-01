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
    <div className="min-h-screen bg-background">
      <NavBar showIcon />
      {loading && <PageLoader page="Group" />}
      {group && !loading && (
        <div className="animate-fade-in">
          <div className="px-6 py-8 max-w-7xl mx-auto">
            <div className="flex flex-wrap justify-between items-center gap-4 mb-6">
              <h1 className="text-2xl font-bold tracking-tight text-foreground">
                Group: {group.name}
              </h1>
              <Button
                className="bg-green-primary hover:bg-green-primary/90 transition-all duration-200 hover:scale-[1.02] active:scale-[0.98]"
                onClick={handleShow}
              >
                Add Expense
              </Button>
            </div>
            <hr className="border-border mb-6" />
            <div className="rounded-xl bg-muted/30 border border-border px-5 py-4 mb-6 inline-block">
              <span className="text-sm font-medium text-muted-foreground">TOTAL</span>
              <p className="text-2xl font-bold text-foreground mt-0.5">
                {formatCurrency().format(total)}
              </p>
            </div>
            <div className="mt-6">
              <ExpenseTable group={group} />
            </div>
          </div>

          <AddExpense show={show} handleClose={handleClose} group={group} />
        </div>
      )}
    </div>
  );
}

export { GroupPage };

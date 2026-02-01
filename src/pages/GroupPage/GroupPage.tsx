import { useMemo, useState } from 'react';
import { useQuery } from 'convex/react';
import { api } from '../../../convex/_generated/api';
import type { Id } from 'src/indexTypes';
import { AddExpense, ExpenseTable, NavBar, PageLoader } from 'src/components';
import { getGroupIdFromUrl, formatCurrency, getTotal } from 'src/utils';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader } from '@/components/ui/card';
import { Separator } from '@/components/ui/separator';

function GroupPage() {
  const rawId = getGroupIdFromUrl();
  const id = rawId ? (rawId as Id<'groups'>) : undefined;
  const group = useQuery(
    api.groups.get,
    id ? { id } : 'skip'
  );
  const expenses = useQuery(
    api.expenses.listByGroup,
    id ? { groupId: id } : 'skip'
  );

  const [show, setShow] = useState<boolean>(false);

  const loading = id ? group === undefined : false;
  const total = useMemo(
    () => (expenses && id ? getTotal(id, expenses) : 0),
    [expenses, id]
  );

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  return (
    <div className="min-h-screen bg-navy-800">
      <NavBar showIcon />
      <div className="font-sans px-6 py-8 max-w-7xl mx-auto">
        {loading && <PageLoader page="Group" />}
        {group && !loading && (
          <div className="animate-fade-in">
            <div className="flex flex-wrap justify-between items-center gap-4 mb-8">
              <h1 className="font-serif text-4xl md:text-5xl font-bold tracking-tight text-white">
                Group: <span className="text-teal-400">{group.name}</span>
              </h1>
              <Button
                type="button"
                className="px-8 py-3 bg-teal-400 text-navy-900 font-sans font-semibold rounded-full shadow-glow hover:bg-teal-300 hover:-translate-y-1 transition-all duration-300"
                onClick={handleShow}
              >
                Add Expense
              </Button>
            </div>
            <Separator className="mb-8 bg-slate-600/50" />
            <Card className="rounded-xl bg-navy-900/50 border-slate-600 px-5 py-4 mb-8 inline-block">
              <CardHeader className="p-0 space-y-0">
                <span className="text-sm font-medium text-slate-400">TOTAL</span>
              </CardHeader>
              <CardContent className="p-0 mt-0.5">
                <p className="text-2xl font-bold text-white">
                  {formatCurrency().format(total)}
                </p>
              </CardContent>
            </Card>
            <div className="mt-6">
              <ExpenseTable group={group} />
            </div>

            <AddExpense show={show} handleClose={handleClose} group={group} />
          </div>
        )}
      </div>
    </div>
  );
}

export { GroupPage };

import { useMemo, useState } from 'react';
import { useQuery } from 'convex/react';
import { api } from '../../../convex/_generated/api';
import type { Id } from 'src/indexTypes';
import { AddExpense, NavBar, PageLoader } from 'src/components';
import { getGroupIdFromUrl, formatCurrency, getTotal } from 'src/utils';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader } from '@/components/ui/card';
import {
  ItemGroup,
  Item,
  ItemContent,
  ItemTitle,
  ItemDescription,
  ItemSeparator,
} from '@/components/ui/item';
import { Separator } from '@/components/ui/separator';
import { Tabs, TabsList, TabsTrigger, TabsContent } from '@/components/ui/tabs';

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

            <Tabs defaultValue="balances" className="w-full">
              <TabsList className="mb-4 bg-navy-900/50 border border-slate-600 rounded-lg p-1">
                <TabsTrigger
                  value="balances"
                  className="data-[state=active]:bg-teal-400 data-[state=active]:text-navy-900 data-[state=active]:shadow text-slate-300 rounded-md px-4 py-2"
                >
                  Balances
                </TabsTrigger>
                <TabsTrigger
                  value="expenses"
                  className="data-[state=active]:bg-teal-400 data-[state=active]:text-navy-900 data-[state=active]:shadow text-slate-300 rounded-md px-4 py-2"
                >
                  Expenses
                </TabsTrigger>
                <TabsTrigger
                  value="shares"
                  className="data-[state=active]:bg-teal-400 data-[state=active]:text-navy-900 data-[state=active]:shadow text-slate-300 rounded-md px-4 py-2"
                >
                  Shares
                </TabsTrigger>
              </TabsList>
              <TabsContent value="balances" className="mt-0">
                <ItemGroup className="gap-2">
                  {group.members?.length > 0 &&
                    group.members.map((mem, idx) => {
                      const balance = mem.paid - mem.share;
                      const label =
                        balance >= 0
                          ? `Gets ${formatCurrency().format(balance)}`
                          : `Owes ${formatCurrency().format(Math.abs(balance))}`;
                      return (
                        <span key={mem.id ?? mem.name ?? idx}>
                          {idx > 0 && (
                            <ItemSeparator className="bg-slate-600/50" />
                          )}
                          <Item
                            variant="outline"
                            size="sm"
                            className="border-slate-600 bg-navy-900/50 text-white"
                          >
                            <ItemContent>
                              <ItemTitle className="text-white">
                                {mem.name}
                              </ItemTitle>
                              <ItemDescription className="text-slate-300">
                                {label}
                              </ItemDescription>
                            </ItemContent>
                          </Item>
                        </span>
                      );
                    })}
                </ItemGroup>
              </TabsContent>
              <TabsContent value="expenses" className="mt-0">
                <ItemGroup className="gap-2">
                  {expenses && expenses.length > 0 ? (
                    expenses.map((exp, idx) => (
                      <span key={exp._id}>
                        {idx > 0 && (
                          <ItemSeparator className="bg-slate-600/50" />
                        )}
                        <Item
                          variant="outline"
                          size="sm"
                          className="border-slate-600 bg-navy-900/50 text-white"
                        >
                          <ItemContent>
                            <ItemTitle className="text-white">
                              {exp.name}
                            </ItemTitle>
                            <ItemDescription className="text-slate-300">
                              {formatCurrency().format(exp.amount)} · Paid by:{' '}
                              {exp.paidBy.map((p) => p.name).join(', ')} ·
                              Shared by:{' '}
                              {exp.sharedBy.map((s) => s.name).join(', ')}
                            </ItemDescription>
                          </ItemContent>
                        </Item>
                      </span>
                    ))
                  ) : (
                    <Item variant="muted" size="sm" className="text-slate-400">
                      <ItemContent>
                        <ItemDescription>No expenses yet.</ItemDescription>
                      </ItemContent>
                    </Item>
                  )}
                </ItemGroup>
              </TabsContent>
              <TabsContent value="shares" className="mt-0">
                <ItemGroup className="gap-2">
                  {group.members?.length > 0 &&
                    group.members.map((mem, idx) => {
                      const share = mem.paid - mem.share;
                      return (
                        <span key={mem.id ?? mem.name ?? idx}>
                          {idx > 0 && (
                            <ItemSeparator className="bg-slate-600/50" />
                          )}
                          <Item
                            variant="outline"
                            size="sm"
                            className="border-slate-600 bg-navy-900/50 text-white"
                          >
                            <ItemContent>
                              <ItemTitle className="text-white">
                                {mem.name}
                              </ItemTitle>
                              <ItemDescription className="text-slate-300">
                                Share: {formatCurrency().format(share)}
                              </ItemDescription>
                            </ItemContent>
                          </Item>
                        </span>
                      );
                    })}
                </ItemGroup>
              </TabsContent>
            </Tabs>

            <AddExpense show={show} handleClose={handleClose} group={group} />
          </div>
        )}
      </div>
    </div>
  );
}

export { GroupPage };

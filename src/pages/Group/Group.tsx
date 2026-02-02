import { useMemo, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useQuery, useMutation } from 'convex/react';
import { api } from '../../../convex/_generated/api';
import type { Id } from 'src/indexTypes';
import { IoOptionsOutline, IoTrash } from 'react-icons/io5';
import { Ellipsis } from 'lucide-react';
import { AddExpense, GroupModal, PageLayout, PageLoader } from 'src/components';
import { getGroupIdFromUrl, formatCurrency, getTotal } from 'src/utils';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader } from '@/components/ui/card';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
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

function Group() {
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
  const [openEditModal, setOpenEditModal] = useState<boolean>(false);
  const navigate = useNavigate();
  const deleteGroup = useMutation(api.groups.remove);

  const loading = id ? group === undefined : false;
  const total = useMemo(
    () => (expenses && id ? getTotal(id, expenses) : 0),
    [expenses, id]
  );

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const onDeleteClick = () => {
    if (id) {
      deleteGroup({ id });
      navigate('/groups');
    }
  };

  return (
    <PageLayout contentClassName="font-sans px-6 py-8 max-w-7xl mx-auto">
      {loading && <PageLoader page="Group" />}
      {group && !loading && (
        <div className="animate-fade-in">
          <div className="flex flex-wrap justify-between items-center gap-4 mb-8">
            <div className="flex items-center gap-3">
              <h1 className="font-serif text-4xl md:text-5xl font-bold tracking-tight text-foreground">
                Group: <span className="text-primary">{group.name}</span>
              </h1>
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button
                    variant="ghost"
                    size="icon"
                    className="h-9 w-9 rounded-full bg-card border border-border text-muted-foreground hover:bg-accent hover:text-foreground"
                  >
                    <Ellipsis className="h-5 w-5" />
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent
                  align="start"
                  className="rounded-xl shadow-lg border border-border bg-card min-w-[180px]"
                >
                  <DropdownMenuItem
                    className="flex items-center gap-2 cursor-pointer text-foreground hover:text-primary focus:bg-accent transition-colors rounded-lg"
                    onSelect={() => setOpenEditModal(true)}
                  >
                    <IoOptionsOutline className="h-4 w-4 text-primary" />
                    <span>Edit group</span>
                  </DropdownMenuItem>
                  <DropdownMenuSeparator className="bg-border" />
                  <DropdownMenuItem
                    className="flex items-center gap-2 cursor-pointer text-red-400 focus:text-red-400 focus:bg-red-950/30 transition-colors rounded-lg"
                    onSelect={onDeleteClick}
                  >
                    <IoTrash className="h-4 w-4" />
                    <span>Delete</span>
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            </div>
            <Button
              type="button"
              className="px-8 py-3 bg-primary text-primary-foreground font-sans font-semibold rounded-full shadow-glow hover:bg-primary/90 hover:-translate-y-1 transition-all duration-300"
              onClick={handleShow}
            >
              Add Expense
            </Button>
          </div>
          <Separator className="mb-8 bg-border" />
          <Card className="rounded-xl bg-card border-border px-5 py-4 mb-8 inline-block">
            <CardHeader className="p-0 space-y-0">
              <span className="text-sm font-medium text-muted-foreground">TOTAL</span>
            </CardHeader>
            <CardContent className="p-0 mt-0.5">
              <p className="text-2xl font-bold text-foreground">
                {formatCurrency().format(total)}
              </p>
            </CardContent>
          </Card>

          <Tabs defaultValue="balances" className="w-full">
            <TabsList className="mb-4 bg-card border border-border rounded-lg p-1">
              <TabsTrigger
                value="balances"
                className="data-[state=active]:bg-primary data-[state=active]:text-primary-foreground data-[state=active]:shadow text-muted-foreground rounded-md px-4 py-2"
              >
                Balances
              </TabsTrigger>
              <TabsTrigger
                value="expenses"
                className="data-[state=active]:bg-primary data-[state=active]:text-primary-foreground data-[state=active]:shadow text-muted-foreground rounded-md px-4 py-2"
              >
                Expenses
              </TabsTrigger>
              <TabsTrigger
                value="shares"
                className="data-[state=active]:bg-primary data-[state=active]:text-primary-foreground data-[state=active]:shadow text-muted-foreground rounded-md px-4 py-2"
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
                          <ItemSeparator className="bg-border" />
                        )}
                        <Item
                          variant="outline"
                          size="sm"
                          className="border-border bg-card text-foreground"
                        >
                          <ItemContent>
                            <ItemTitle className="text-foreground">
                              {mem.name}
                            </ItemTitle>
                            <ItemDescription className="text-muted-foreground">
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
                        <ItemSeparator className="bg-border" />
                      )}
                      <Item
                        variant="outline"
                        size="sm"
                        className="border-border bg-card text-foreground"
                      >
                        <ItemContent>
                          <ItemTitle className="text-foreground">
                            {exp.name}
                          </ItemTitle>
                          <ItemDescription className="text-muted-foreground">
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
                  <Item variant="muted" size="sm" className="text-muted-foreground">
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
                          <ItemSeparator className="bg-border" />
                        )}
                        <Item
                          variant="outline"
                          size="sm"
                          className="border-border bg-card text-foreground"
                        >
                          <ItemContent>
                            <ItemTitle className="text-foreground">
                              {mem.name}
                            </ItemTitle>
                            <ItemDescription className="text-muted-foreground">
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
          <GroupModal
            edit
            open={openEditModal}
            setOpen={setOpenEditModal}
            data={group}
          />
        </div>
      )}
    </PageLayout>
  );
}

export { Group };

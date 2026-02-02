import { IoOptionsOutline, IoTrash } from 'react-icons/io5';
import { Ellipsis } from 'lucide-react';
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
import type { MemberBalance, MemberShare, ParsedExpense } from 'src/indexTypes';

// Pure presentation components
const MemberItem = ({ title, description }: { title: string; description: string }) => (
  <Item variant="outline" size="sm" className="border-border bg-card text-foreground">
    <ItemContent>
      <ItemTitle className="text-foreground">{title}</ItemTitle>
      <ItemDescription className="text-muted-foreground">{description}</ItemDescription>
    </ItemContent>
  </Item>
);

const ItemList = <T,>({
  items,
  renderItem,
}: {
  items: T[];
  renderItem: (item: T) => React.ReactNode;
}) => (
  <ItemGroup className="gap-2">
    {items.map((item: any, idx) => (
      <span key={item.id ?? idx}>
        {idx > 0 && <ItemSeparator className="bg-border" />}
        {renderItem(item)}
      </span>
    ))}
  </ItemGroup>
);

const EmptyState = ({ message }: { message: string }) => (
  <ItemGroup className="gap-2">
    <Item variant="muted" size="sm" className="text-muted-foreground">
      <ItemContent>
        <ItemDescription>{message}</ItemDescription>
      </ItemContent>
    </Item>
  </ItemGroup>
);

const TAB_CONFIG = [
  { value: 'balances', label: 'Balances' },
  { value: 'expenses', label: 'Expenses' },
  { value: 'shares', label: 'Shares' },
] as const;

const TAB_TRIGGER_CLASSES =
  'data-[state=active]:bg-primary data-[state=active]:text-primary-foreground data-[state=active]:shadow text-muted-foreground rounded-md px-4 py-2';

// Main presentation component
interface GroupViewProps {
  groupName: string;
  formattedTotal: string;
  balances: MemberBalance[];
  shares: MemberShare[];
  expenses: ParsedExpense[];
  hasExpenses: boolean;
  onAddExpense: () => void;
  onEditGroup: () => void;
  onDeleteGroup: () => void;
}

export function GroupView({
  groupName,
  formattedTotal,
  balances,
  shares,
  expenses,
  hasExpenses,
  onAddExpense,
  onEditGroup,
  onDeleteGroup,
}: GroupViewProps) {
  return (
    <div className="animate-fade-in">
      {/* Header Section */}
      <div className="flex flex-wrap justify-between items-center gap-4 mb-8">
        <div className="flex items-center gap-3">
          <h1 className="font-serif text-4xl md:text-5xl font-bold tracking-tight text-foreground">
            Group: <span className="text-primary">{groupName}</span>
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
                onSelect={onEditGroup}
              >
                <IoOptionsOutline className="h-4 w-4 text-primary" />
                <span>Edit group</span>
              </DropdownMenuItem>
              <DropdownMenuSeparator className="bg-border" />
              <DropdownMenuItem
                className="flex items-center gap-2 cursor-pointer text-red-400 focus:text-red-400 focus:bg-red-950/30 transition-colors rounded-lg"
                onSelect={onDeleteGroup}
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
          onClick={onAddExpense}
        >
          Add Expense
        </Button>
      </div>

      <Separator className="mb-8 bg-border" />

      {/* Total Card */}
      <Card className="rounded-xl bg-card border-border px-5 py-4 mb-8 inline-block">
        <CardHeader className="p-0 space-y-0">
          <span className="text-sm font-medium text-muted-foreground">TOTAL</span>
        </CardHeader>
        <CardContent className="p-0 mt-0.5">
          <p className="text-2xl font-bold text-foreground">{formattedTotal}</p>
        </CardContent>
      </Card>

      {/* Tabs Section */}
      <Tabs defaultValue="balances" className="w-full">
        <TabsList className="mb-4 bg-card border border-border rounded-lg p-1">
          {TAB_CONFIG.map(({ value, label }) => (
            <TabsTrigger key={value} value={value} className={TAB_TRIGGER_CLASSES}>
              {label}
            </TabsTrigger>
          ))}
        </TabsList>

        {/* Balances Tab */}
        <TabsContent value="balances" className="mt-0">
          {balances.length > 0 ? (
            <ItemList
              items={balances}
              renderItem={(balance) => (
                <MemberItem title={balance.name} description={balance.balanceLabel} />
              )}
            />
          ) : (
            <EmptyState message="No members yet." />
          )}
        </TabsContent>

        {/* Expenses Tab */}
        <TabsContent value="expenses" className="mt-0">
          {hasExpenses ? (
            <ItemList
              items={expenses}
              renderItem={(expense) => (
                <Item variant="outline" size="sm" className="border-border bg-card text-foreground">
                  <ItemContent>
                    <ItemTitle className="text-foreground">{expense.name}</ItemTitle>
                    <ItemDescription className="text-muted-foreground">
                      {expense.formattedAmount} · Paid by: {expense.paidByNames} · Shared by:{' '}
                      {expense.sharedByNames}
                    </ItemDescription>
                  </ItemContent>
                </Item>
              )}
            />
          ) : (
            <EmptyState message="No expenses yet." />
          )}
        </TabsContent>

        {/* Shares Tab */}
        <TabsContent value="shares" className="mt-0">
          {shares.length > 0 ? (
            <ItemList
              items={shares}
              renderItem={(share) => (
                <MemberItem title={share.name} description={`Share: ${share.formattedShare}`} />
              )}
            />
          ) : (
            <EmptyState message="No members yet." />
          )}
        </TabsContent>
      </Tabs>
    </div>
  );
}

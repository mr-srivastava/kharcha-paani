import { useEffect, useState } from 'react';
import { useMutation } from 'convex/react';
import { api } from '../../../convex/_generated/api';
import { ChevronsUpDown } from 'lucide-react';
import { Group } from 'src/indexTypes';
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
} from '@/components/ui/sheet';
import { Button } from '@/components/ui/button';
import { Checkbox } from '@/components/ui/checkbox';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@/components/ui/popover';
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
  CommandSeparator,
} from '@/components/ui/command';

type MemberWithFlags = { id?: string; name: string; share: number; paid: number };

interface AddExpenseProps {
  show: boolean;
  handleClose: () => void;
  group: Group;
}

function AddExpense({ show, handleClose, group }: AddExpenseProps) {
  const createExpense = useMutation(api.expenses.create);

  const [expenseName, setExpenseName] = useState<string>('');
  const [amount, setAmount] = useState<number | null>(null);
  const [members, setMembers] = useState<MemberWithFlags[]>([]);
  const [paidBy, setPaidBy] = useState<MemberWithFlags[]>([]);
  const [sharedBy, setSharedBy] = useState<MemberWithFlags[]>([]);
  const [disableAdd, setDisableAdd] = useState<boolean>(true);

  useEffect(() => {
    setMembers(group.members);
  }, [group.members, show]);

  useEffect(() => {
    const hasName = expenseName.trim() !== '';
    const hasAmount = !!amount;
    setDisableAdd(!(hasName && hasAmount));
  }, [expenseName, amount, paidBy, sharedBy]);

  const onCloseClick = () => {
    handleClose();
    setExpenseName('');
    setAmount(null);
    setPaidBy([]);
    setSharedBy([]);
  };

  const handleNameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setExpenseName(e.target.value);
  };

  const handleAmountChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const val = e.target.value;
    setAmount(val === '' ? null : parseInt(val, 10));
  };

  const memberKey = (mem: MemberWithFlags) => mem.id ?? mem.name;

  const isPaidBy = (mem: MemberWithFlags) =>
    paidBy.some((m) => memberKey(m) === memberKey(mem));
  const isSharedBy = (mem: MemberWithFlags) =>
    sharedBy.some((m) => memberKey(m) === memberKey(mem));

  const togglePaidBy = (mem: MemberWithFlags) => {
    setPaidBy((prev) =>
      isPaidBy(mem)
        ? prev.filter((m) => memberKey(m) !== memberKey(mem))
        : [...prev, mem]
    );
  };

  const toggleSharedBy = (mem: MemberWithFlags) => {
    setSharedBy((prev) =>
      isSharedBy(mem)
        ? prev.filter((m) => memberKey(m) !== memberKey(mem))
        : [...prev, mem]
    );
  };

  const handleSelectAllSharedBy = () => {
    setSharedBy([...members]);
  };

  const handleSubmit = async () => {
    try {
      await createExpense({
        groupId: group._id,
        name: expenseName,
        amount: amount ?? 0,
        paidBy: paidBy.map((mem) => ({ memberId: mem.id ?? mem.name, name: mem.name })),
        sharedBy: sharedBy.map((mem) => ({ memberId: mem.id ?? mem.name, name: mem.name })),
      });
      onCloseClick();
    } catch {
      onCloseClick();
    }
  };

  const paidByDisplay =
    paidBy.length > 0
      ? `${paidBy[0].name}${paidBy.length > 1 ? ` + ${paidBy.length - 1}` : ''}`
      : '';
  const sharedByDisplay =
    sharedBy.length > 0
      ? `${sharedBy[0].name}${sharedBy.length > 1 ? ` + ${sharedBy.length - 1}` : ''}`
      : '';

  return (
    <Sheet open={show} onOpenChange={(open) => !open && onCloseClick()}>
      <SheetContent side="right" className="flex flex-col w-full sm:max-w-md">
        <SheetHeader className="space-y-1.5 pb-4">
          <SheetTitle className="text-xl">Add Expense</SheetTitle>
        </SheetHeader>
        <div className="flex-1 overflow-auto py-2 scrollbar-thin transition-opacity duration-200">
          <div className="space-y-5 animate-in fade-in-0 duration-200">
            <div className="space-y-2">
              <Label htmlFor="expense-name" className="text-sm font-medium">
                Name of expense
              </Label>
              <Input
                id="expense-name"
                value={expenseName}
                placeholder="Enter a name for the expense."
                onChange={handleNameChange}
                aria-label="Expense name"
                className="transition-colors focus-visible:ring-2 focus-visible:ring-green-primary/50"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="expense-amount" className="text-sm font-medium">
                Amount
              </Label>
              <Input
                id="expense-amount"
                value={amount ?? ''}
                placeholder="Enter amount."
                onChange={handleAmountChange}
                type="number"
                aria-label="Amount"
                className="transition-colors focus-visible:ring-2 focus-visible:ring-green-primary/50"
              />
            </div>
            <div className="space-y-2">
              <Label className="text-sm font-medium">Paid by</Label>
              <Popover>
                <PopoverTrigger asChild>
                  <Button
                    variant="outline"
                    role="combobox"
                    className="w-full justify-between"
                  >
                    {paidByDisplay || 'Select members'}
                    <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
                  </Button>
                </PopoverTrigger>
                <PopoverContent className="w-[var(--radix-popover-trigger-width)] p-0" align="start">
                  <Command>
                    <CommandInput placeholder="Search members..." />
                    <CommandList>
                      <CommandEmpty>No member found.</CommandEmpty>
                      <CommandGroup>
                        {members.map((mem) => (
                          <CommandItem
                            key={memberKey(mem)}
                            value={mem.name}
                            onSelect={() => togglePaidBy(mem)}
                          >
                            <Checkbox
                              checked={isPaidBy(mem)}
                              className="pointer-events-none"
                            />
                            <span>{mem.name}</span>
                          </CommandItem>
                        ))}
                      </CommandGroup>
                    </CommandList>
                  </Command>
                </PopoverContent>
              </Popover>
            </div>
            <div className="space-y-2">
              <Label className="text-sm font-medium">Shared by</Label>
              <Popover>
                <PopoverTrigger asChild>
                  <Button
                    variant="outline"
                    role="combobox"
                    className="w-full justify-between"
                  >
                    {sharedByDisplay || 'Select members'}
                    <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
                  </Button>
                </PopoverTrigger>
                <PopoverContent className="w-[var(--radix-popover-trigger-width)] p-0" align="start">
                  <Command>
                    <CommandInput placeholder="Search members..." />
                    <CommandList>
                      <CommandEmpty>No member found.</CommandEmpty>
                      <CommandGroup>
                        <CommandItem onSelect={handleSelectAllSharedBy}>
                          <Checkbox
                            checked={sharedBy.length === members.length}
                            className="pointer-events-none"
                          />
                          <span>Select all</span>
                        </CommandItem>
                        <CommandSeparator />
                        {members.map((mem) => (
                          <CommandItem
                            key={memberKey(mem)}
                            value={mem.name}
                            onSelect={() => toggleSharedBy(mem)}
                          >
                            <Checkbox
                              checked={isSharedBy(mem)}
                              className="pointer-events-none"
                            />
                            <span>{mem.name}</span>
                          </CommandItem>
                        ))}
                      </CommandGroup>
                    </CommandList>
                  </Command>
                </PopoverContent>
              </Popover>
            </div>
            <div className="flex justify-end pt-4">
              <Button
                onClick={handleSubmit}
                disabled={disableAdd}
                className="bg-green-primary hover:bg-green-primary/90 transition-all duration-200 disabled:opacity-50"
              >
                Add
              </Button>
            </div>
          </div>
        </div>
      </SheetContent>
    </Sheet>
  );
}

export { AddExpense };

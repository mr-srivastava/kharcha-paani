import { useEffect, useState } from 'react';
import { v4 as uuidv4 } from 'uuid';
import { IoListOutline } from 'react-icons/io5';
import { useGroupStore } from 'src/store/useGroupStore';
import { Group } from 'src/indexTypes';
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
} from '@/components/ui/sheet';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';

type MemberWithFlags = { _id: string; name: string; share: number; paid: number; hasPaid?: boolean; hasShare?: boolean };

interface AddExpenseProps {
  show: boolean;
  handleClose: () => void;
  group: Group;
}

function AddExpense({ show, handleClose, group }: AddExpenseProps) {
  const addExpense = useGroupStore((state) => state.addExpense);

  const [expenseName, setExpenseName] = useState<string>('');
  const [amount, setAmount] = useState<number | null>(null);
  const [members, setMembers] = useState<MemberWithFlags[]>([]);
  const [paidBy, setPaidBy] = useState<MemberWithFlags[]>([]);
  const [sharedBy, setSharedBy] = useState<MemberWithFlags[]>([]);
  const [showSelectPaidBy, setShowSelectPaidBy] = useState<boolean>(false);
  const [showSelectSharedBy, setShowSelectSharedBy] = useState<boolean>(false);
  const [disableAdd, setDisableAdd] = useState<boolean>(true);

  useEffect(() => {
    const memberState: MemberWithFlags[] = group.members.map((mem) => ({
      ...mem,
      hasPaid: false,
      hasShare: false,
    }));
    setMembers(memberState);
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

  const handlePaidBySelect = (e: React.ChangeEvent<HTMLInputElement>, mem: MemberWithFlags) => {
    setMembers((prevState) =>
      prevState.map((el) =>
        el._id === mem._id ? { ...el, hasPaid: e.target.checked } : el
      )
    );
  };

  const handleSharedBySelect = (e: React.ChangeEvent<HTMLInputElement>, mem: MemberWithFlags) => {
    setMembers((prevState) =>
      prevState.map((el) =>
        el._id === mem._id ? { ...el, hasShare: e.target.checked } : el
      )
    );
  };

  const handleAddPaidBy = () => {
    setPaidBy(members.filter((mem) => mem.hasPaid));
    setShowSelectPaidBy(false);
  };

  const handleAddSharedBy = () => {
    setSharedBy(members.filter((mem) => mem.hasShare));
    setShowSelectSharedBy(false);
  };

  const handleSelectAllSharedBy = () => {
    setMembers((prev) => prev.map((el) => ({ ...el, hasShare: true })));
  };

  const handleSubmit = () => {
    const payload = {
      id: uuidv4(),
      groupId: group._id,
      name: expenseName,
      amount: amount ?? 0,
      paidBy: paidBy.map((mem) => ({ id: mem._id })),
      sharedBy: sharedBy.map((mem) => ({ id: mem._id })),
    };
    addExpense(payload);
    onCloseClick();
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
          <SheetTitle className="text-xl">
            {showSelectPaidBy || showSelectSharedBy
              ? 'Select Member(s)'
              : 'Add Expense'}
          </SheetTitle>
        </SheetHeader>
        <div className="flex-1 overflow-auto py-2 scrollbar-thin transition-opacity duration-200">
          {!showSelectPaidBy && !showSelectSharedBy && (
            <div className="space-y-5 animate-in fade-in-0 duration-200">
              <div className="space-y-2">
                <Label htmlFor="expense-name" className="text-sm font-medium">Name of expense</Label>
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
                <Label htmlFor="expense-amount" className="text-sm font-medium">Amount</Label>
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
                <div className="flex gap-3">
                  <Input
                    value={paidByDisplay}
                    placeholder="Select members"
                    readOnly
                    className="flex-1 bg-muted/80 border-border transition-colors"
                  />
                  <Button
                    onClick={() => setShowSelectPaidBy(true)}
                    variant="outline"
                    className="shrink-0 transition-all duration-200"
                  >
                    Select
                  </Button>
                </div>
              </div>
              <div className="space-y-2">
                <Label className="text-sm font-medium">Shared by</Label>
                <div className="flex gap-3">
                  <Input
                    value={sharedByDisplay}
                    placeholder="Select members"
                    readOnly
                    className="flex-1 bg-muted/80 border-border transition-colors"
                  />
                  <Button
                    onClick={() => setShowSelectSharedBy(true)}
                    variant="outline"
                    className="shrink-0 transition-all duration-200"
                  >
                    Select
                  </Button>
                </div>
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
          )}

          {showSelectPaidBy && (
            <div className="space-y-5 animate-in fade-in-0 duration-200">
              <div className="space-y-1">
                {members.map((mem) => (
                  <div
                    key={mem._id}
                    className="flex items-center gap-3 py-2.5 px-2 rounded-lg hover:bg-muted/50 border-b border-border/50 last:border-b-0 transition-colors"
                  >
                    <input
                      type="checkbox"
                      id={`paid-${mem._id}`}
                      onChange={(e) => handlePaidBySelect(e, mem)}
                      className="h-4 w-4 rounded border-input accent-green-primary transition-colors"
                    />
                    <Label htmlFor={`paid-${mem._id}`} className="flex-1 cursor-pointer font-medium">
                      {mem.name}
                    </Label>
                  </div>
                ))}
              </div>
              <div className="flex justify-end pt-2">
                <Button onClick={handleAddPaidBy} className="bg-green-primary hover:bg-green-primary/90 transition-all duration-200">
                  Done
                </Button>
              </div>
            </div>
          )}

          {showSelectSharedBy && (
            <div className="space-y-5 animate-in fade-in-0 duration-200">
              <button
                type="button"
                className="flex items-center justify-end gap-2 w-full py-2 px-2 rounded-lg cursor-pointer hover:text-green-primary hover:bg-muted/50 transition-all duration-200 font-medium"
                onClick={handleSelectAllSharedBy}
              >
                <IoListOutline className="h-4 w-4 text-green-primary" />
                <span>Select all</span>
              </button>
              <div className="space-y-1">
                {members.map((mem) => (
                  <div
                    key={mem._id}
                    className="flex items-center gap-3 py-2.5 px-2 rounded-lg hover:bg-muted/50 border-b border-border/50 last:border-b-0 transition-colors"
                  >
                    <input
                      type="checkbox"
                      id={`share-${mem._id}`}
                      checked={mem.hasShare ?? false}
                      onChange={(e) => handleSharedBySelect(e, mem)}
                      className="h-4 w-4 rounded border-input accent-green-primary transition-colors"
                    />
                    <Label htmlFor={`share-${mem._id}`} className="flex-1 cursor-pointer font-medium">
                      {mem.name}
                    </Label>
                  </div>
                ))}
              </div>
              <div className="flex justify-end pt-2">
                <Button onClick={handleAddSharedBy} className="bg-green-primary hover:bg-green-primary/90 transition-all duration-200">
                  Done
                </Button>
              </div>
            </div>
          )}
        </div>
      </SheetContent>
    </Sheet>
  );
}

export { AddExpense };

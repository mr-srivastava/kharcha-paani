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
      <SheetContent side="right" className="flex flex-col">
        <SheetHeader>
          <SheetTitle>
            {showSelectPaidBy || showSelectSharedBy
              ? 'Select Member(s)'
              : 'Add Expense'}
          </SheetTitle>
        </SheetHeader>
        <div className="flex-1 overflow-auto py-4">
          {!showSelectPaidBy && !showSelectSharedBy && (
            <div className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="expense-name">Name of expense</Label>
                <Input
                  id="expense-name"
                  value={expenseName}
                  placeholder="Enter a name for the expense."
                  onChange={handleNameChange}
                  aria-label="Expense name"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="expense-amount">Amount</Label>
                <Input
                  id="expense-amount"
                  value={amount ?? ''}
                  placeholder="Enter amount."
                  onChange={handleAmountChange}
                  type="number"
                  aria-label="Amount"
                />
              </div>
              <div className="space-y-2">
                <Label>Paid by</Label>
                <div className="flex gap-2">
                  <Input
                    value={paidByDisplay}
                    placeholder="Select members"
                    readOnly
                    className="flex-1 bg-muted"
                  />
                  <Button onClick={() => setShowSelectPaidBy(true)}>
                    Select
                  </Button>
                </div>
              </div>
              <div className="space-y-2">
                <Label>Shared by</Label>
                <div className="flex gap-2">
                  <Input
                    value={sharedByDisplay}
                    placeholder="Select members"
                    readOnly
                    className="flex-1 bg-muted"
                  />
                  <Button onClick={() => setShowSelectSharedBy(true)}>
                    Select
                  </Button>
                </div>
              </div>
              <div className="flex justify-end pt-2">
                <Button
                  onClick={handleSubmit}
                  disabled={disableAdd}
                  className="bg-green-primary hover:bg-green-primary/90"
                >
                  Add
                </Button>
              </div>
            </div>
          )}

          {showSelectPaidBy && (
            <div className="space-y-4">
              <div className="space-y-2">
                {members.map((mem) => (
                  <div
                    key={mem._id}
                    className="flex items-center gap-2 py-2 border-b last:border-b-0"
                  >
                    <input
                      type="checkbox"
                      id={`paid-${mem._id}`}
                      onChange={(e) => handlePaidBySelect(e, mem)}
                      className="h-4 w-4 rounded border-input"
                    />
                    <Label htmlFor={`paid-${mem._id}`} className="ml-2 cursor-pointer">
                      {mem.name}
                    </Label>
                  </div>
                ))}
              </div>
              <div className="flex justify-end">
                <Button onClick={handleAddPaidBy}>Done</Button>
              </div>
            </div>
          )}

          {showSelectSharedBy && (
            <div className="space-y-4">
              <button
                type="button"
                className="flex items-center justify-end gap-2 w-full mb-3 cursor-pointer hover:text-green-primary transition-colors"
                onClick={handleSelectAllSharedBy}
              >
                <IoListOutline className="h-4 w-4" stroke="#41b4a5" />
                <span>Select all</span>
              </button>
              <div className="space-y-2">
                {members.map((mem) => (
                  <div
                    key={mem._id}
                    className="flex items-center gap-2 py-2 border-b last:border-b-0"
                  >
                    <input
                      type="checkbox"
                      id={`share-${mem._id}`}
                      checked={mem.hasShare ?? false}
                      onChange={(e) => handleSharedBySelect(e, mem)}
                      className="h-4 w-4 rounded border-input"
                    />
                    <Label htmlFor={`share-${mem._id}`} className="ml-2 cursor-pointer">
                      {mem.name}
                    </Label>
                  </div>
                ))}
              </div>
              <div className="flex justify-end">
                <Button onClick={handleAddSharedBy}>Done</Button>
              </div>
            </div>
          )}
        </div>
      </SheetContent>
    </Sheet>
  );
}

export { AddExpense };

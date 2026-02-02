import { useMemo } from 'react';
import { useQuery } from 'convex/react';
import { api } from '../../../convex/_generated/api';
import type {
  Id,
  GroupData,
  MemberBalance,
  MemberShare,
  ParsedExpense,
  ExpenseParticipant,
} from 'src/indexTypes';
import { getTotal, formatCurrency } from 'src/utils';

/**
 * Custom hook that handles all data fetching and parsing for the Group page.
 * Returns fully parsed and formatted data ready for presentation.
 */
export function useGroupData(groupId: Id<'groups'> | undefined): GroupData {
  // Fetch raw data
  const group = useQuery(api.groups.get, groupId ? { id: groupId } : 'skip');

  const expenses = useQuery(
    api.expenses.listByGroup,
    groupId ? { groupId } : 'skip'
  );

  const loading = groupId ? group === undefined : false;

  // Parse and compute all derived data
  const total = useMemo(
    () => (expenses && groupId ? getTotal(groupId, expenses) : 0),
    [expenses, groupId]
  );

  const balances = useMemo<MemberBalance[]>(() => {
    if (!group?.members || group.members.length === 0) return [];

    return group.members.map((member) => {
      const balance = member.paid - member.share;
      const formattedBalance = formatCurrency().format(Math.abs(balance));
      const balanceLabel =
        balance >= 0 ? `Gets ${formattedBalance}` : `Owes ${formattedBalance}`;

      return {
        id: member.id ?? member.name,
        name: member.name,
        balance,
        formattedBalance,
        balanceLabel,
      };
    });
  }, [group]);

  const shares = useMemo<MemberShare[]>(() => {
    if (!group?.members || group.members.length === 0) return [];

    return group.members.map((member) => {
      const share = member.paid - member.share;

      return {
        id: member.id ?? member.name,
        name: member.name,
        share,
        formattedShare: formatCurrency().format(share),
      };
    });
  }, [group]);

  const parsedExpenses = useMemo<ParsedExpense[]>(() => {
    if (!expenses || expenses.length === 0) return [];

    return expenses.map((expense) => {
      const paidByNames = expense.paidBy
        .map((p: ExpenseParticipant) => p.name)
        .join(', ');

      // Check if expense is shared by all members
      const isSharedByAll =
        group?.members &&
        group.members.length > 0 &&
        expense.sharedBy.length === group.members.length &&
        group.members.every((m) =>
          expense.sharedBy.some(
            (s: ExpenseParticipant) => s.memberId === (m.id ?? m.name)
          )
        );

      const sharedByNames = isSharedByAll
        ? 'All'
        : expense.sharedBy.map((s: ExpenseParticipant) => s.name).join(', ');

      return {
        id: expense._id,
        name: expense.name,
        amount: expense.amount,
        formattedAmount: formatCurrency().format(expense.amount),
        paidByNames,
        sharedByNames,
      };
    });
  }, [expenses, group]);

  return {
    group: group ? { id: groupId!, name: group.name } : null,
    total,
    formattedTotal: formatCurrency().format(total),
    balances,
    shares,
    expenses: parsedExpenses,
    hasExpenses: parsedExpenses.length > 0,
    loading,
  };
}

import type { Doc, Id } from '../convex/_generated/dataModel';

// --- Domain types (Convex-backed or shared) ---

interface Currency {
  name: string;
  cc: string;
  symbol: string;
}

/** Group member (schema: groups.members item) */
type Member = {
  id?: string;
  name: string;
  share: number;
  paid: number;
};

/** Expense paidBy / sharedBy array item */
type ExpenseParticipant = {
  memberId: string;
  name: string;
};

/** Full group document from Convex */
type Group = Doc<'groups'>;

/** Full expense document from Convex */
type Expense = Doc<'expenses'>;

/** Minimal group info for presentation (e.g. header) */
type GroupSummary = {
  id: Id<'groups'>;
  name: string;
};

// --- Hook / presentation types (parsed or derived) ---

/** Parsed member balance for Group page Balances tab */
type MemberBalance = {
  id: string;
  name: string;
  balance: number;
  formattedBalance: string;
  balanceLabel: string;
};

/** Parsed member share for Group page Shares tab */
type MemberShare = {
  id: string;
  name: string;
  share: number;
  formattedShare: string;
};

/** Parsed expense for Group page Expenses tab */
type ParsedExpense = {
  id: string;
  name: string;
  amount: number;
  formattedAmount: string;
  paidByNames: string;
  sharedByNames: string;
};

/** Return type of useGroupData hook */
type GroupData = {
  group: GroupSummary | null;
  total: number;
  formattedTotal: string;
  balances: MemberBalance[];
  shares: MemberShare[];
  expenses: ParsedExpense[];
  hasExpenses: boolean;
  loading: boolean;
};

/** Return type of useGroupsData hook */
type GroupsData = {
  groups: Group[] | undefined;
  loading: boolean;
  hasGroups: boolean;
};

export type {
  Currency,
  Group,
  GroupSummary,
  Expense,
  ExpenseParticipant,
  Member,
  MemberBalance,
  MemberShare,
  ParsedExpense,
  GroupData,
  GroupsData,
};
export type { Id };

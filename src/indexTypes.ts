import type { Doc, Id } from '../convex/_generated/dataModel';

interface Currency {
  name: string;
  cc: string;
  symbol: string;
}

type Member = {
  id?: string;
  name: string;
  share: number;
  paid: number;
};

type Group = Doc<'groups'>;

type Expense = Doc<'expenses'>;

export type { Currency, Group, Expense, Member };
export type { Id };

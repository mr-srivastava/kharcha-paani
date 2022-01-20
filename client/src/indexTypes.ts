interface Currency {
  name: string;
  cc: string;
  symbol: string;
}

type Member = {
  id: string;
  name: string;
  share: number;
  paid: number;
};

interface Group {
  id: string;
  name: string;
  members: Member[];
}

interface Expense {
  id: string;
  groupId: string;
  name: string;
  amount: number;
  paidBy: any[];
  sharedBy: any[];
}

export type { Currency, Group, Expense, Member };
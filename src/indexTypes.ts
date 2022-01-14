interface Currency {
  name: string;
  cc: string;
  symbol: string;
}

interface Group {
  id: string;
  name: string;
  members: any[];
}

interface Expense {
  id: string;
  name: string;
  amount: number;
  paidBy: any[];
  sharedBy: any[];
}

export type { Currency, Group, Expense };

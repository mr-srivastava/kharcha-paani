interface Currency {
  name: string;
  cc: string;
  symbol: string;
}

const formatCurrency = (curr: Currency) => {
  return `${curr.name} (${curr.symbol})`;
};

export { formatCurrency };

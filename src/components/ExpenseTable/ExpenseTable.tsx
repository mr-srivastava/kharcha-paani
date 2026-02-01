import { formatCurrency } from 'src/utils';
import { Group } from 'src/indexTypes';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';

interface ExpenseTableProps {
  group: Group;
}

function ExpenseTable({ group }: ExpenseTableProps) {
  return (
    <div className="w-full rounded-xl border bg-card overflow-hidden shadow-card">
      <Table>
        <TableHeader>
          <TableRow className="border-b border-border hover:bg-transparent">
            <TableHead className="h-12 px-4 font-semibold text-foreground">Member</TableHead>
            <TableHead className="h-12 px-4 font-semibold text-foreground">Share</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {group.members?.length > 0 &&
            group.members.map((mem, idx) => (
              <TableRow
                key={mem.id ?? mem.name ?? idx}
                className={`transition-colors duration-150 hover:bg-muted/60 ${idx % 2 === 1 ? 'bg-muted/20' : ''}`}
              >
                <TableCell className="px-4 py-3 font-medium">{mem.name}</TableCell>
                <TableCell className="px-4 py-3 tabular-nums">
                  {formatCurrency().format(mem.paid - mem.share)}
                </TableCell>
              </TableRow>
            ))}
        </TableBody>
      </Table>
    </div>
  );
}

export { ExpenseTable };

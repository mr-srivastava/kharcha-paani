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
    <div className="w-full">
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Member</TableHead>
            <TableHead>Share</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {group.members?.length > 0 &&
            group.members.map((mem) => (
              <TableRow key={mem._id} className="hover:bg-muted/50">
                <TableCell>{mem.name}</TableCell>
                <TableCell>
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

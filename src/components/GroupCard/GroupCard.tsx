import { IoOpenOutline, IoOptionsOutline, IoTrash } from 'react-icons/io5';
import { useNavigate } from 'react-router-dom';
import { useQuery, useMutation } from 'convex/react';
import { api } from '../../../convex/_generated/api';
import { Ellipsis } from 'lucide-react';
import { Group, Id } from 'src/indexTypes';
import { formatCurrency, getTotal } from 'src/utils';
import { Card, CardContent, CardTitle } from '@/components/ui/card';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { Button } from '@/components/ui/button';
import { Separator } from '@/components/ui/separator';

interface GroupCardProps {
  data: Group;
  handleEditClick: (id: Id<'groups'>) => void;
}

function GroupCard(props: GroupCardProps) {
  const expenses = useQuery(api.expenses.listByGroup, {
    groupId: props.data._id,
  });
  const deleteGroup = useMutation(api.groups.remove);
  const navigate = useNavigate();
  const { data, handleEditClick } = props;

  const onLinkClick = () => {
    navigate(`/group/${data._id}`);
  };

  const onDeleteClick = () => {
    deleteGroup({ id: data._id });
  };

  const total = expenses ? getTotal(data._id, expenses) : 0;

  return (
    <Card className="max-w-[300px] min-h-[200px] shadow-xl rounded-2xl overflow-hidden transition-all duration-200 ease-smooth hover:shadow-2xl hover:-translate-y-1 hover:shadow-card-hover">
      <CardContent className="relative bg-blue-dark rounded-2xl text-white p-6 overflow-hidden">
        <div className="absolute inset-0 rounded-2xl bg-gradient-to-br from-white/10 via-transparent to-transparent pointer-events-none" />
        <CardTitle className="relative flex justify-between items-center mb-0">
          <div className="font-semibold text-lg truncate pr-2">{data.name}</div>
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button
                variant="ghost"
                size="icon"
                className="relative p-0 h-auto w-auto bg-transparent hover:bg-white/10 hover:text-green-primary text-white rounded-lg transition-colors duration-200"
              >
                <Ellipsis className="h-5 w-5" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end" className="rounded-xl shadow-lg border border-border/50 min-w-[180px]">
              <DropdownMenuItem
                className="flex items-center gap-2 cursor-pointer hover:text-green-primary focus:bg-muted transition-colors rounded-lg"
                onSelect={() => handleEditClick(data._id)}
              >
                <IoOptionsOutline className="h-4 w-4 text-green-primary" />
                <span>Edit group</span>
              </DropdownMenuItem>
              <DropdownMenuItem
                className="flex items-center gap-2 cursor-pointer hover:text-green-primary focus:bg-muted transition-colors rounded-lg"
                onSelect={onLinkClick}
              >
                <IoOpenOutline className="h-4 w-4 text-green-primary" />
                <span>Go to group</span>
              </DropdownMenuItem>
              <DropdownMenuSeparator />
              <DropdownMenuItem
                className="flex items-center gap-2 cursor-pointer text-red-500 focus:text-red-500 focus:bg-red-50 dark:focus:bg-red-950/30 transition-colors rounded-lg"
                onSelect={onDeleteClick}
              >
                <IoTrash className="h-4 w-4" />
                <span>Delete</span>
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </CardTitle>
        <Separator className="relative my-4 bg-white/20" />

        <div className="relative flex flex-col items-center gap-5">
          <div className="text-center px-2">
            <div className="text-4xl font-semibold tracking-tight">
              {formatCurrency().format(total)}
            </div>
            <div className="text-xs text-white/70 mt-1">Total expenses</div>
          </div>
          <div className="text-center px-2">
            <div className="text-4xl font-semibold">{data.members.length}</div>
            <div className="text-xs text-white/70 mt-1">Members</div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}

export { GroupCard };

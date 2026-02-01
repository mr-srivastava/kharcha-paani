import { IoOpenOutline, IoOptionsOutline, IoTrash } from 'react-icons/io5';
import { useNavigate } from 'react-router-dom';
import { Ellipsis } from 'lucide-react';
import { Group } from 'src/indexTypes';
import { useGroupStore } from 'src/store/useGroupStore';
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

interface GroupCardProps {
  data: Group;
  handleEditClick: (id: string) => void;
}

function GroupCard(props: GroupCardProps) {
  const expenses = useGroupStore((state) => state.expenses);
  const deleteGroup = useGroupStore((state) => state.deleteGroup);
  const navigate = useNavigate();
  const { data, handleEditClick } = props;

  const onLinkClick = () => {
    navigate(`/group/${data._id}`);
  };

  const onDeleteClick = () => {
    deleteGroup(data._id);
  };

  return (
    <Card className="max-w-[300px] min-h-[200px] shadow-lg rounded-2xl overflow-hidden">
      <CardContent className="bg-blue-dark rounded-2xl text-white p-6">
        <CardTitle className="flex justify-between items-center mb-0">
          <div>{data.name}</div>
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button
                variant="ghost"
                size="icon"
                className="p-0 h-auto w-auto bg-transparent hover:bg-transparent hover:text-green-primary text-white"
              >
                <Ellipsis className="h-5 w-5" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              <DropdownMenuItem
                className="flex items-center gap-2 cursor-pointer hover:text-green-primary"
                onSelect={() => handleEditClick(data._id)}
              >
                <IoOptionsOutline className="h-4 w-4" stroke="#41b4a5" />
                <span>Edit group</span>
              </DropdownMenuItem>
              <DropdownMenuItem
                className="flex items-center gap-2 cursor-pointer hover:text-green-primary"
                onSelect={onLinkClick}
              >
                <IoOpenOutline className="h-4 w-4" stroke="#41b4a5" />
                <span>Go to group</span>
              </DropdownMenuItem>
              <DropdownMenuSeparator />
              <DropdownMenuItem
                className="flex items-center gap-2 cursor-pointer text-red-500 focus:text-red-500"
                onSelect={onDeleteClick}
              >
                <IoTrash className="h-4 w-4" stroke="red" fill="red" />
                <span>Delete</span>
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </CardTitle>
        <hr className="border-white/20 my-3" />

        <div className="flex flex-col items-center gap-4">
          <div className="text-center">
            <div className="text-4xl">
              {formatCurrency().format(getTotal(data._id, expenses))}
            </div>
            <div className="text-xs text-[#b5bad0]">Total expenses</div>
          </div>
          <div className="text-center">
            <div className="text-4xl">{data.members.length}</div>
            <div className="text-xs text-[#b5bad0]">Members</div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}

export { GroupCard };

import { useNavigate } from 'react-router-dom';
import { useQuery } from 'convex/react';
import { api } from '../../../convex/_generated/api';
import { Group } from 'src/indexTypes';
import { formatCurrency, getTotal } from 'src/utils';
import { Card, CardContent, CardTitle } from '@/components/ui/card';
import { Separator } from '@/components/ui/separator';

interface GroupCardProps {
  data: Group;
}

function GroupCard(props: GroupCardProps) {
  const expenses = useQuery(api.expenses.listByGroup, {
    groupId: props.data._id,
  });
  const navigate = useNavigate();
  const { data } = props;

  const onLinkClick = () => {
    navigate(`/group/${data._id}`);
  };

  const total = expenses ? getTotal(data._id, expenses) : 0;

  return (
    <Card className="max-w-[300px] min-h-[200px] shadow-xl rounded-2xl overflow-hidden transition-all duration-200 ease-smooth hover:-translate-y-1 hover:shadow-card-hover" onClick={onLinkClick}>
      <CardContent className="relative bg-card rounded-2xl text-card-foreground p-6 overflow-hidden">
        <div className="absolute inset-0 rounded-2xl bg-gradient-to-br from-white/10 via-transparent to-transparent pointer-events-none" />
        <CardTitle className="relative flex justify-between items-center mb-0">
          <div className="font-semibold text-lg truncate pr-2">{data.name}</div>
        </CardTitle>
        <Separator className="relative my-4 bg-foreground/20" />

        <div className="relative flex flex-col items-center gap-5">
          <div className="text-center px-2">
            <div className="text-4xl font-semibold tracking-tight">
              {formatCurrency().format(total)}
            </div>
            <div className="text-xs text-card-foreground/70 mt-1">Total expenses</div>
          </div>
          <div className="text-center px-2">
            <div className="text-4xl font-semibold">{data.members.length}</div>
            <div className="text-xs text-card-foreground/70 mt-1">Members</div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}

export { GroupCard };

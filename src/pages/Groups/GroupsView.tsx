import { GroupCard } from 'src/components';
import type { Group } from 'src/indexTypes';
import NullImg from 'src/assets/images/groups_null.svg';
import { Button } from '@/components/ui/button';
import { Separator } from '@/components/ui/separator';

interface GroupsViewProps {
  groups: Group[];
  hasGroups: boolean;
  onCreateGroup: () => void;
}

function GroupsView({ groups, hasGroups, onCreateGroup }: GroupsViewProps) {
  return (
    <div className="animate-fade-in">
      <div className="flex flex-wrap justify-between items-center gap-4 mb-8">
        <h1 className="font-serif text-4xl md:text-5xl font-bold tracking-tight text-foreground">
          Your <span className="text-primary">Groups</span>
        </h1>
        <Button
          type="button"
          className="px-8 py-3 bg-primary text-primary-foreground font-sans font-semibold rounded-full shadow-glow hover:bg-primary/90 hover:-translate-y-1 transition-all duration-300"
          onClick={onCreateGroup}
        >
          Create Group
        </Button>
      </div>
      <Separator className="mb-8 bg-border" />
      {hasGroups ? (
        <div className="grid grid-cols-[repeat(auto-fill,minmax(280px,1fr))] gap-6 items-stretch">
          {groups.map((group) => (
            <GroupCard key={group._id} data={group} />
          ))}
        </div>
      ) : (
        <div className="mt-12 py-16 flex flex-col justify-center items-center text-center rounded-2xl border border-dashed border-border bg-card">
          <img src={NullImg} alt="" className="w-48 h-auto opacity-80" />
          <h2 className="mt-6 text-2xl font-serif font-semibold text-foreground">
            No groups created.
          </h2>
          <p className="mt-2 text-muted-foreground font-sans text-lg max-w-sm">
            Please create one to get started.
          </p>
          <Button
            type="button"
            className="mt-6 px-8 py-3 bg-primary text-primary-foreground font-sans font-semibold rounded-full shadow-glow hover:bg-primary/90 hover:-translate-y-1 transition-all duration-300"
            onClick={onCreateGroup}
          >
            Create Group
          </Button>
        </div>
      )}
    </div>
  );
}

export { GroupsView };

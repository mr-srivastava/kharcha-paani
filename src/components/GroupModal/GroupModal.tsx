import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useMutation } from 'convex/react';
import { api } from '../../../convex/_generated/api';
import {
  IoPerson,
  IoInformationCircleOutline,
  IoCloseOutline,
  IoClose,
} from 'react-icons/io5';
import type { Group, Member } from 'src/indexTypes';
import { remove } from 'lodash';
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { ScrollArea } from '@/components/ui/scroll-area';

type GroupModalProps = {
  edit?: boolean;
  open: boolean;
  setOpen: (open: boolean) => void;
  data?: Group;
};

function GroupModal({ open, setOpen, data, edit }: GroupModalProps) {
  const navigate = useNavigate();
  const createGroup = useMutation(api.groups.create);
  const updateGroup = useMutation(api.groups.update);

  const [groupName, setGroupName] = useState<string>('');
  const [memberText, setMemberText] = useState<string>('');
  const [members, setMembers] = useState<Member[]>([]);

  useEffect(() => {
    if (data) {
      setGroupName(data.name);
      setMembers(data.members);
    }
  }, [data]);

  const handleClose = () => setOpen(false);

  const onDoneClick = async () => {
    try {
      if (edit && data) {
        await updateGroup({
          id: data._id,
          name: groupName,
          members,
        });
        handleClose();
      } else {
        const groupId = await createGroup({
          name: groupName,
          members,
        });
        handleClose();
        if (groupId) {
          navigate(`/group/${groupId}`);
        }
      }
    } catch {
      handleClose();
    }
  };

  const handleGroupNameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setGroupName(e.target.value);
  };

  const handleMemberTextChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setMemberText(e.target.value);
  };

  const handleMemberAdd = () => {
    const newMember = {
      name: memberText,
      share: 0,
      paid: 0,
    };
    setMembers((prev) => [...prev, newMember]);
    setMemberText('');
  };

  const handleMemberRemove = (idx: number) => {
    const updatedMembers = remove([...members], (_, i) => i !== idx);
    setMembers(updatedMembers);
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogContent
        className="rounded-2xl max-w-lg shadow-xl animate-in fade-in-0 zoom-in-95 duration-200"
        onPointerDownOutside={(e) => e.preventDefault()}
        onEscapeKeyDown={(e) => e.preventDefault()}
      >
        <DialogHeader className="space-y-1.5 pb-2">
          <DialogTitle className="text-xl">{`${edit ? 'Edit' : 'Create'} Group`}</DialogTitle>
        </DialogHeader>
        <div className="space-y-5 py-2">
          <div className="space-y-2">
            <Label htmlFor="group-name" className="text-sm font-medium">Name of group</Label>
            <Input
              id="group-name"
              value={groupName}
              placeholder="Enter a name for the group."
              onChange={handleGroupNameChange}
              aria-label="GroupName"
              className="transition-colors focus-visible:ring-2 focus-visible:ring-primary/50"
            />
          </div>
          <div className="space-y-3">
            <div className="flex items-center gap-3">
              <div className="flex-1">
                <Label htmlFor="add-member" className="sr-only">
                  Add Members
                </Label>
                <Input
                  id="add-member"
                  value={memberText}
                  placeholder="Add member"
                  onChange={handleMemberTextChange}
                  onKeyDown={(e) => {
                    if (e.key === 'Enter' && memberText.trim() !== '') {
                      e.preventDefault();
                      handleMemberAdd();
                    }
                  }}
                  aria-label="Add member"
                  className="transition-colors focus-visible:ring-2 focus-visible:ring-primary/50"
                />
              </div>
              <Button
                type="button"
                variant="outline"
                onClick={handleMemberAdd}
                disabled={memberText.trim() === ''}
                className="transition-all duration-200 shrink-0"
              >
                Add
              </Button>
            </div>
            <Alert className="rounded-xl bg-amber-50 dark:bg-amber-950/30 text-amber-800 dark:text-amber-200 border-amber-200 dark:border-amber-800">
              <IoInformationCircleOutline className="h-5 w-5 shrink-0" />
              <AlertDescription className="text-sm">
                Add at least one member in the group
              </AlertDescription>
            </Alert>
            <ScrollArea className="h-[206px] border rounded-xl bg-muted/30">
              <div className="p-1">
                {members.map((mem, idx) => (
                  <div
                    key={`${mem.name}_${idx}`}
                    className="flex items-center justify-between px-3 py-2.5 hover:bg-muted/60 dark:hover:bg-muted/40 border-b border-border/50 last:border-b-0 transition-colors duration-150"
                  >
                    <div className="flex items-center gap-2.5">
                      <IoPerson className="h-4 w-4 text-muted-foreground" />
                      <span className="font-medium">{mem.name}</span>
                    </div>
                    <Button
                      type="button"
                      variant="ghost"
                      size="icon"
                      className="group h-9 w-9 rounded-lg hover:bg-destructive/10 text-muted-foreground hover:text-destructive transition-all duration-150"
                      onClick={() => handleMemberRemove(idx)}
                      aria-label="Remove member"
                    >
                      <IoCloseOutline className="h-5 w-5 block group-hover:hidden" />
                      <IoClose className="h-5 w-5 hidden group-hover:block" />
                    </Button>
                  </div>
                ))}
              </div>
            </ScrollArea>
          </div>
        </div>
        <DialogFooter className="gap-2 pt-4 sm:pt-4">
          <Button variant="outline" onClick={handleClose} className="transition-all duration-200">
            Cancel
          </Button>
          <Button onClick={onDoneClick} className="bg-primary hover:bg-primary/90 transition-all duration-200">
            Save
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}

export { GroupModal };

import { useQuery } from 'convex/react';
import { api } from '../../../convex/_generated/api';
import type { Group, GroupsData } from 'src/indexTypes';

/**
 * Custom hook that fetches groups list and derives loading/empty state.
 * Returns data ready for presentation.
 */
export function useGroupsData(): GroupsData {
  const groups = useQuery(api.groups.list);
  const loading = groups === undefined;
  const hasGroups = Boolean(groups?.length);

  return {
    groups,
    loading,
    hasGroups,
  };
}

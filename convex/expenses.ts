import { query, mutation } from './_generated/server';
import { v } from 'convex/values';

const paidByValidator = v.array(
  v.object({
    memberId: v.string(),
    name: v.string(),
  })
);
const sharedByValidator = v.array(
  v.object({
    memberId: v.string(),
    name: v.string(),
  })
);

export const listByGroup = query({
  args: { groupId: v.id('groups') },
  handler: async (ctx, args) => {
    return await ctx.db
      .query('expenses')
      .withIndex('by_group', (q) => q.eq('groupId', args.groupId))
      .collect();
  },
});

export const get = query({
  args: { id: v.id('expenses') },
  handler: async (ctx, args) => {
    return await ctx.db.get(args.id);
  },
});

export const create = mutation({
  args: {
    groupId: v.id('groups'),
    name: v.string(),
    amount: v.number(),
    paidBy: paidByValidator,
    sharedBy: sharedByValidator,
  },
  handler: async (ctx, args) => {
    const expenseId = await ctx.db.insert('expenses', {
      groupId: args.groupId,
      name: args.name,
      amount: args.amount,
      paidBy: args.paidBy,
      sharedBy: args.sharedBy,
    });

    const group = await ctx.db.get(args.groupId);
    if (!group) return expenseId;

    const paidPerPerson =
      args.paidBy.length > 0 ? Math.round(args.amount / args.paidBy.length) : 0;
    const sharePerPerson =
      args.sharedBy.length > 0
        ? Math.round(args.amount / args.sharedBy.length)
        : 0;

    const updatedMembers = group.members.map((mem) => {
      const paid = args.paidBy.some((p) => p.memberId === (mem.id ?? mem.name))
        ? (mem.paid ?? 0) + paidPerPerson
        : mem.paid ?? 0;
      const share = args.sharedBy.some(
        (s) => s.memberId === (mem.id ?? mem.name)
      )
        ? (mem.share ?? 0) + sharePerPerson
        : mem.share ?? 0;
      return { ...mem, paid, share };
    });

    await ctx.db.patch(args.groupId, { members: updatedMembers });
    return expenseId;
  },
});

import { query, mutation } from './_generated/server';
import { v } from 'convex/values';

export const list = query({
  handler: async (ctx) => {
    return await ctx.db.query('groups').collect();
  },
});

export const get = query({
  args: { id: v.id('groups') },
  handler: async (ctx, args) => {
    return await ctx.db.get(args.id);
  },
});

const memberValidator = v.object({
  id: v.optional(v.string()),
  name: v.string(),
  share: v.number(),
  paid: v.number(),
});

export const create = mutation({
  args: {
    name: v.string(),
    members: v.array(memberValidator),
  },
  handler: async (ctx, args) => {
    const membersWithIds = args.members.map((m) => ({
      ...m,
      id: m.id ?? crypto.randomUUID(),
    }));
    const groupId = await ctx.db.insert('groups', {
      name: args.name,
      members: membersWithIds,
    });
    return groupId;
  },
});

export const update = mutation({
  args: {
    id: v.id('groups'),
    name: v.string(),
    members: v.array(memberValidator),
  },
  handler: async (ctx, args) => {
    await ctx.db.patch(args.id, {
      name: args.name,
      members: args.members,
    });
    return args.id;
  },
});

export const remove = mutation({
  args: { id: v.id('groups') },
  handler: async (ctx, args) => {
    await ctx.db.delete(args.id);
  },
});

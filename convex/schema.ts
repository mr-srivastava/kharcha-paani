import { defineSchema, defineTable } from 'convex/server';
import { v } from 'convex/values';

export default defineSchema({
  groups: defineTable({
    name: v.string(),
    members: v.array(
      v.object({
        id: v.optional(v.string()),
        name: v.string(),
        share: v.number(),
        paid: v.number(),
      })
    ),
  }).index('by_name', ['name']),

  expenses: defineTable({
    groupId: v.id('groups'),
    name: v.string(),
    amount: v.number(),
    paidBy: v.array(
      v.object({
        memberId: v.string(),
        name: v.string(),
      })
    ),
    sharedBy: v.array(
      v.object({
        memberId: v.string(),
        name: v.string(),
      })
    ),
  }).index('by_group', ['groupId']),
});

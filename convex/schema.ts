import { defineSchema, defineTable } from "convex/server";
import { v } from "convex/values";

export default defineSchema({
  contacts: defineTable({
    name: v.string(),
    email: v.string(),
    phone: v.string(),
    description: v.string(),
    timestamp: v.string(),
    type: v.string(),
    status: v.optional(v.string()),
  }),
  
  zoomRequests: defineTable({
    type: v.string(),
    timestamp: v.string(),
    status: v.string(),
    email: v.optional(v.string()),
    name: v.optional(v.string()),
  }),
});
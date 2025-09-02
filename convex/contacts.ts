import { v } from "convex/values";
import { mutation, query } from "./_generated/server";

export const submitContact = mutation({
  args: {
    name: v.string(),
    email: v.string(),
    phone: v.string(),
    description: v.string(),
    timestamp: v.string(),
    type: v.string(),
  },
  handler: async (ctx, args) => {
    const contactId = await ctx.db.insert("contacts", {
      ...args,
      status: "new",
    });
    return contactId;
  },
});

export const submitZoomRequest = mutation({
  args: {
    type: v.string(),
    timestamp: v.string(),
    status: v.string(),
    email: v.optional(v.string()),
    name: v.optional(v.string()),
  },
  handler: async (ctx, args) => {
    const zoomRequestId = await ctx.db.insert("zoomRequests", args);
    return zoomRequestId;
  },
});

export const getAllContacts = query({
  handler: async (ctx) => {
    return await ctx.db.query("contacts").order("desc").collect();
  },
});

export const getAllZoomRequests = query({
  handler: async (ctx) => {
    return await ctx.db.query("zoomRequests").order("desc").collect();
  },
});
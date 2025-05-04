import { httpRouter } from "convex/server";
import { httpAction } from "./_generated/server";
import { Webhook } from "svix";
import type { WebhookEvent } from "@clerk/nextjs/server";
import { api } from "./_generated/api";
import stripe from "app/lib/stripe";

const http = httpRouter();

const clerkWebhook = httpAction(async (ctx, request) => {
  const secret = process.env.CLERK_WEBHOOK_SECRET;
  if (!secret) {
    throw new Error("Missing CLERK_WEBHOOK_SECRET");
  }

  // Raw body for exact signature verification
  const rawBody = await request.text();
  const svixHeaders = {
    "svix-id": request.headers.get("svix-id") || "",
    "svix-signature": request.headers.get("svix-signature") || "",
    "svix-timestamp": request.headers.get("svix-timestamp") || "",
  };
  if (
    !svixHeaders["svix-id"] ||
    !svixHeaders["svix-signature"] ||
    !svixHeaders["svix-timestamp"]
  ) {
    return new Response("Missing Svix headers", { status: 400 });
  }

  let event: WebhookEvent;
  try {
    const wh = new Webhook(secret);
    event = wh.verify(rawBody, svixHeaders) as WebhookEvent;
  } catch (err) {
    console.error("⚠️ Svix verification failed:", err);
    return new Response("Invalid signature", { status: 400 });
  }

  // Only handle new users
  if (event.type === "user.created") {
    const {
      id: userId,
      email_addresses,
      username,
      first_name,
      last_name,
      image_url,
    } = event.data;

    // Idempotency guard: skip if we’ve already processed this user
    const existing = await ctx.runQuery(api.users.getUserById, { userId });
    if (existing) {
      return new Response("User already exists", { status: 200 });
    }

    const email = email_addresses?.[0]?.email_address ?? "";
    const name = username || `${first_name || ""} ${last_name || ""}`.trim();
    const profileImage = image_url || "";

    try {
      // Create the Stripe customer with an idempotency key
      const customer = await stripe.customers.create(
        {
          name: name,
          email: email,
          metadata: { clerkUserId: userId },
        },
        { idempotencyKey: `clerk_user_${userId}` },
      );

      // Insert into Convex
      await ctx.runMutation(api.users.createUser, {
        userId,
        name,
        email,
        profileImage,
        stripeCustomerId: customer.id,
      });
    } catch (err) {
      console.error("❌ Error processing user.created webhook:", err);
      return new Response(`Webhook failed: ${err}`, { status: 500 });
    }
  }

  if (event.type === "user.updated") {
    const {
      id: userId,
      email_addresses,
      username,
      first_name,
      last_name,
      image_url,
    } = event.data;

    const existing = await ctx.runQuery(api.users.getUserById, { userId });
    if (!existing) {
      return new Response("User not found", { status: 404 });
    }

    const email = email_addresses?.[0]?.email_address ?? "";
    const name = username || `${first_name || ""} ${last_name || ""}`.trim();
    const profileImage = image_url || "";

    // Update the user in Convex
    try {
      await ctx.runMutation(api.users.updateUser, {
        userId,
        name,
        email,
        profileImage,
      });
    } catch (err) {
      console.error("❌ Error processing user.updated webhook:", err);
      return new Response(`Webhook failed: ${err}`, { status: 500 });
    }
  }

  return new Response("Webhook processed successfully", {
    status: 200,
  });
});

http.route({
  path: "/clerk-webhook",
  method: "POST",
  handler: clerkWebhook,
});

export default http;

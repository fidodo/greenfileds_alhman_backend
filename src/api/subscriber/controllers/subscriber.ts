// src/api/subscriber/controllers/subscriber.ts
import { factories } from "@strapi/strapi";

export default factories.createCoreController(
  "api::subscriber.subscriber",
  ({ strapi }) => ({
    // Keep all the default core actions (find, findOne, create, update, delete)
    ...factories.createCoreController("api::subscriber.subscriber").prototype,

    // Add your custom subscribe function
    async subscribe(ctx) {
      try {
        const { email } = ctx.request.body as { email: string };

        if (!email) {
          return ctx.badRequest("Email is required");
        }

        // Check if already subscribed
        const existing = await strapi.db
          .query("api::subscriber.subscriber")
          .findOne({
            where: { email },
          });

        if (existing) {
          if (!existing.isActive) {
            await strapi.db.query("api::subscriber.subscriber").update({
              where: { id: existing.id },
              data: { isActive: true, subscribedAt: new Date() },
            });
            return ctx.send({
              success: true,
              message: "Welcome back! You have been resubscribed.",
            });
          }
          return ctx.send({
            success: false,
            message: "This email is already subscribed!",
          });
        }

        // Create new subscriber
        await strapi.db.query("api::subscriber.subscriber").create({
          data: {
            email,
            isActive: true,
            subscribedAt: new Date(),
            publishedAt: new Date(),
          },
        });

        return ctx.send({
          success: true,
          message: "Thank you for subscribing!",
        });
      } catch (error) {
        console.error("Subscription error:", error);
        return ctx.internalServerError(
          "Something went wrong. Please try again.",
        );
      }
    },
  }),
);

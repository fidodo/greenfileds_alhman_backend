export default {
  async subscribe(ctx) {
    try {
      const { email } = ctx.request.body;

      if (!email) {
        return ctx.badRequest("Email is required");
      }

      const existing = await strapi.db
        .query("api::newsletter-subscriber.newsletter-subscriber")
        .findOne({
          where: { email },
        });

      if (existing) {
        if (!existing.isActive) {
          await strapi.db
            .query("api::newsletter-subscriber.newsletter-subscriber")
            .update({
              where: { id: existing.id },
              data: { isActive: true },
            });
          return ctx.send({
            success: true,
            message: "Subscribed successfully!",
          });
        }
        return ctx.badRequest("Already subscribed");
      }

      await strapi.db
        .query("api::newsletter-subscriber.newsletter-subscriber")
        .create({
          data: {
            email,
            subscribedAt: new Date(),
            isActive: true,
            publishedAt: new Date(),
          },
        });

      return ctx.send({ success: true, message: "Subscribed successfully!" });
    } catch (error) {
      console.error("Newsletter error:", error);
      return ctx.internalServerError("Something went wrong");
    }
  },
};

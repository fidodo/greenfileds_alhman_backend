// export default {
//   async subscribe(ctx) {
//     try {
//       const { email } = ctx.request.body;

//       if (!email) {
//         return ctx.badRequest("Email is required");
//       }

//       const existing = await strapi.db
//         .query("api::newsletter-subscriber.newsletter-subscriber")
//         .findOne({
//           where: { email },
//         });

//       if (existing) {
//         if (!existing.isActive) {
//           await strapi.db
//             .query("api::newsletter-subscriber.newsletter-subscriber")
//             .update({
//               where: { id: existing.id },
//               data: { isActive: true },
//             });
//           return ctx.send({
//             success: true,
//             message: "Subscribed successfully!",
//           });
//         }
//         return ctx.badRequest("Already subscribed");
//       }

//       await strapi.db
//         .query("api::newsletter-subscriber.newsletter-subscriber")
//         .create({
//           data: {
//             email,
//             subscribedAt: new Date(),
//             isActive: true,
//             publishedAt: new Date(),
//           },
//         });

//       return ctx.send({ success: true, message: "Subscribed successfully!" });
//     } catch (error) {
//       console.error("Newsletter error:", error);
//       return ctx.internalServerError("Something went wrong");
//     }
//   },
// };
"use strict";

module.exports = {
  async subscribe(ctx) {
    try {
      const { email } = ctx.request.body;

      if (!email) {
        return ctx.badRequest("Email is required");
      }

      // Check if already subscribed in the REAL collection
      const existing = await strapi.db
        .query("api::newsletter-subscriber.newsletter-subscriber")
        .findOne({
          where: { email },
        });

      if (existing) {
        return ctx.send({
          success: false,
          message: "This email is already subscribed!",
        });
      }

      // Create new subscriber in the REAL collection
      const newSubscriber = await strapi.db
        .query("api::newsletter-subscriber.newsletter-subscriber")
        .create({
          data: {
            email: email,
            isActive: true,
            subscribedAt: new Date(),
            publishedAt: new Date(),
          },
        });

      console.log("Saved to collection:", newSubscriber);

      return ctx.send({
        success: true,
        message: "Thank you for subscribing!",
      });
    } catch (error) {
      console.error("Newsletter error:", error);
      return ctx.internalServerError("Something went wrong");
    }
  },
};

export default {
  async get(ctx) {
    try {
      const cows = await strapi.db.query("api::cow.cow").count();
      const events = await strapi.db.query("api::event.event").count();
      const testimonials = await strapi.db
        .query("api::testimonial.testimonial")
        .count();
      const feedbacks = await strapi.db.query("api::feedback.feedback").count();

      return ctx.send({
        hectares: 16,
        students: 500,
        animals: cows,
        events: events,
        feedbacks: feedbacks,
        testimonials: testimonials,
        averageRating: 4.8,
      });
    } catch (error) {
      console.error("Stats error:", error);
      return ctx.send({
        hectares: 16,
        students: 500,
        animals: 25,
        events: 12,
        feedbacks: 150,
        testimonials: 50,
        averageRating: 4.8,
      });
    }
  },
};

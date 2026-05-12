export default {
  async find(ctx) {
    try {
      const { query } = ctx;
      const cows = await strapi.db.query("api::cow.cow").findMany({
        where: {
          ...query.filters,
          publishedAt: { $notNull: true }, // Only published cows
        },
        populate: { image: true },
        orderBy: { name: "asc" },
      });
      return ctx.send(cows);
    } catch (error) {
      console.error("Find cows error:", error);
      return ctx.internalServerError("Failed to fetch cows");
    }
  },

  async findOne(ctx) {
    try {
      const { id } = ctx.params;
      const cow = await strapi.db.query("api::cow.cow").findOne({
        where: {
          id: parseInt(id),
          publishedAt: { $notNull: true }, // Only published cows
        },
        populate: { image: true },
      });

      if (!cow) {
        return ctx.notFound("Cow not found");
      }

      return ctx.send(cow);
    } catch (error) {
      console.error("Find cow error:", error);
      return ctx.internalServerError("Failed to fetch cow");
    }
  },

  async adopt(ctx) {
    try {
      const { cowId, name, email, phone, message, monthlyAmount } =
        ctx.request.body;

      if (!cowId || !name || !email) {
        return ctx.badRequest(
          "Missing required fields: cowId, name, and email are required",
        );
      }

      const service = strapi.service("api::cow.cow");
      const result = await service.adoptCow(parseInt(cowId), {
        name,
        email,
        phone,
        message,
        monthlyAmount,
      });

      if (result.error) {
        return ctx.badRequest(result.error);
      }

      return ctx.send(result);
    } catch (error) {
      console.error("Adoption error:", error);
      return ctx.internalServerError(
        "Failed to process adoption. Please try again.",
      );
    }
  },

  async create(ctx) {
    try {
      const { data } = ctx.request.body;
      const cow = await strapi.db.query("api::cow.cow").create({
        data: {
          ...data,
          publishedAt: new Date(),
        },
      });
      return ctx.send(cow);
    } catch (error) {
      console.error("Create cow error:", error);
      return ctx.internalServerError("Failed to create cow");
    }
  },

  async update(ctx) {
    try {
      const { id } = ctx.params;
      const { data } = ctx.request.body;
      const cow = await strapi.db.query("api::cow.cow").update({
        where: { id: parseInt(id) },
        data,
      });
      return ctx.send(cow);
    } catch (error) {
      console.error("Update cow error:", error);
      return ctx.internalServerError("Failed to update cow");
    }
  },

  async delete(ctx) {
    try {
      const { id } = ctx.params;
      await strapi.db.query("api::cow.cow").delete({
        where: { id: parseInt(id) },
      });
      return ctx.send({ success: true });
    } catch (error) {
      console.error("Delete cow error:", error);
      return ctx.internalServerError("Failed to delete cow");
    }
  },
};

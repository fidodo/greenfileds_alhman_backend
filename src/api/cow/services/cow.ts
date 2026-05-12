export default ({ strapi }) => ({
  async adoptCow(cowId, userData) {
    try {
      // 1. Find the cow (ensure correct v5 syntax and published status)
      const cow = await strapi.db.query("api::cow.cow").findOne({
        where: {
          id: Number(cowId),
          publishedAt: { $notNull: true }, // Only fetch published cows
        },
      });

      if (!cow) {
        return { error: "Cow not found" };
      }

      // 2. Safely get the adoption counts (handle null values)
      const currentAdopters = cow.currentAdopters ?? 0; // Treat null as 0
      const maxAdopters = cow.maxAdopters ?? 25; // Treat null as 25

      if (currentAdopters >= maxAdopters) {
        return { error: `Adoption limit reached for ${cow.name}.` };
      }

      // 3. Update the cow
      const updatedCow = await strapi.db.query("api::cow.cow").update({
        where: { id: Number(cowId) },
        data: {
          currentAdopters: currentAdopters + 1,
          isAvailable: currentAdopters + 1 < maxAdopters,
        },
      });

      return { success: true, cow: updatedCow };
    } catch (error) {
      console.error("Adoption service error:", error);
      return { error: "Failed to process adoption due to a server error." };
    }
  },

  async getAvailableCows() {
    return await strapi.db.query("api::cow.cow").findMany({
      where: { isAvailable: true },
      populate: { image: true },
      orderBy: { name: "asc" },
    });
  },
});

export default ({ strapi }) => ({
  async adoptCow(cowId, userData) {
    const cow = await strapi.db.query("api::cow.cow").findOne({
      where: { id: cowId },
    });

    if (!cow) {
      return { error: "Cow not found" };
    }

    if (cow.currentAdopters >= cow.maxAdopters) {
      return { error: "Adoption limit reached" };
    }

    const updatedCow = await strapi.db.query("api::cow.cow").update({
      where: { id: cowId },
      data: {
        currentAdopters: cow.currentAdopters + 1,
        isAvailable: cow.currentAdopters + 1 >= cow.maxAdopters ? false : true,
      },
    });

    return { success: true, cow: updatedCow };
  },

  async getAvailableCows() {
    return await strapi.db.query("api::cow.cow").findMany({
      where: { isAvailable: true },
      populate: { image: true },
      orderBy: { name: "asc" },
    });
  },
});

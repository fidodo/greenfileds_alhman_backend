// src/api/subscriber/routes/subscriber.ts
import { factories } from "@strapi/strapi";

export default {
  routes: [
    // Default core routes
    {
      method: "GET",
      path: "/subscribers",
      handler: "subscriber.find",
      config: { auth: false },
    },
    {
      method: "GET",
      path: "/subscribers/:id",
      handler: "subscriber.findOne",
      config: { auth: false },
    },
    {
      method: "POST",
      path: "/subscribers",
      handler: "subscriber.create",
      config: { auth: false },
    },
    {
      method: "PUT",
      path: "/subscribers/:id",
      handler: "subscriber.update",
      config: { auth: false },
    },
    {
      method: "DELETE",
      path: "/subscribers/:id",
      handler: "subscriber.delete",
      config: { auth: false },
    },
    // YOUR CUSTOM ROUTE
    {
      method: "POST",
      path: "/subscribers/subscribe",
      handler: "subscriber.subscribe",
      config: { auth: false },
    },
  ],
};

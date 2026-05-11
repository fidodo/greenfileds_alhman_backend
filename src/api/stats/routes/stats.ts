export default {
  routes: [
    {
      method: 'GET',
      path: '/stats',
      handler: 'stats.get',
      config: {
        auth: false,
        policies: [],
        middlewares: [],
      },
    },
  ],
};
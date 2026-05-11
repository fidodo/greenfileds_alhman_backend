export default {
  routes: [
    {
      method: 'GET',
      path: '/cows',
      handler: 'cow.find',
      config: {
        auth: false,
        policies: [],
        middlewares: [],
      },
    },
    {
      method: 'GET',
      path: '/cows/available',
      handler: 'cow.find',
      config: {
        auth: false,
        policies: [],
        middlewares: [],
        query: {
          filters: { isAvailable: { $eq: true } }
        }
      },
    },
    {
      method: 'GET',
      path: '/cows/:id',
      handler: 'cow.findOne',
      config: {
        auth: false,
        policies: [],
        middlewares: [],
      },
    },
    {
      method: 'POST',
      path: '/cows/adopt',
      handler: 'cow.adopt',
      config: {
        auth: false,
        policies: [],
        middlewares: [],
      },
    },
    {
      method: 'POST',
      path: '/cows',
      handler: 'cow.create',
      config: {
        auth: false,
        policies: [],
        middlewares: [],
      },
    },
    {
      method: 'PUT',
      path: '/cows/:id',
      handler: 'cow.update',
      config: {
        auth: false,
        policies: [],
        middlewares: [],
      },
    },
    {
      method: 'DELETE',
      path: '/cows/:id',
      handler: 'cow.delete',
      config: {
        auth: false,
        policies: [],
        middlewares: [],
      },
    },
  ],
};
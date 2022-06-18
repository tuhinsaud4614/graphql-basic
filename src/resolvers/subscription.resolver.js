export const Subscription = {
  count: {
    subscribe(parent, args, ctx, info) {
      const { pubSub } = ctx;
      let count = 0;
      setInterval(() => {
        // count++;
        pubSub.publish("count", { count: ++count });
      }, 1000);
      return pubSub.subscribe("count");
    },
  },
};

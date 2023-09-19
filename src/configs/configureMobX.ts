export const config = {
  useProxies: 'ifavailable',
  computedRequiresReaction: true,
  reactionRequiresObservable: true,
  observableRequiresReaction: true,
} as {
  useProxies: 'ifavailable' | 'always' | 'never' | undefined;
  computedRequiresReaction: boolean | undefined;
  reactionRequiresObservable: boolean | undefined;
  observableRequiresReaction: boolean | undefined;
};

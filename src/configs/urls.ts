export const urls = {
  root: '/',
  recipe: {
    mask: '/recipe/:id',
    create: (id: number | string) => `/recipe/${id}`,
  },
  ingredients: 'ingredients',
  products: 'products',
};

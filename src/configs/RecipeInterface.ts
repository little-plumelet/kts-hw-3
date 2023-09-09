export interface IRecipeData {
  id: number;
  title: string;
  readyInMinutes: number;
  preparationMinutes: number;
  cookingMinutes: number;
  image: string;
  servings: number;
  aggregateLikes: number;
  nutrition: {
    nutrients: Array<INutrient>;
    ingredients: Array<IIngerdient>;
  };
  summary: string;
  analyzedInstructions: [
    {
      name: string;
      steps: Array<{
        number: number;
        step: string;
      }>;
    },
  ];
}

export interface INutrient {
  name: string;
  amount: number;
  unit: string;
}

export interface IIngerdient {
  id: number;
  name: string;
  amount: number;
  unit: string;
}

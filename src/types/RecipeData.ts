export type RecipeData = {
  id: number;
  title: string;
  readyInMinutes: number;
  preparationMinutes: number;
  cookingMinutes: number;
  image: string;
  servings: number;
  aggregateLikes: number;
  nutrition: {
    nutrients: Nutrient[];
    ingredients: Ingerdient[];
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
};

export type Nutrient = {
  name: string;
  amount: number;
  unit: string;
};

export type Ingerdient = {
  id: number;
  name: string;
  amount: number;
  unit: string;
};

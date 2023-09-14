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
  analyzedInstructions: Instruction[];
};

export type Instruction = {
  name: string;
  steps: InstructionStep[];
};

export type InstructionStep = {
  number: number;
  step: string;
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

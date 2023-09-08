export interface IRecepiData {
  id: number;
  title: string;
  readyInMinutes: number;
  image: string;
  nutrition: {
    nutrients: Array<INutrient>;
    ingredients: Array<IIngerdient>;
  };
}

export interface INutrient {
  name: string;
  amount: number;
  unit: string;
}

export interface IIngerdient {
  id: number;
  name: string;
}

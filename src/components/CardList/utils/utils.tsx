import Button from 'components/Button';
import { CardProps } from 'components/Card';
import { IRecepiData } from 'configs/RecipeInterface';

export function mapper(data: Array<IRecepiData>) {
  return data.map(
    (recipe) =>
      ({
        title: recipe.title,
        image: recipe.image,
        subtitle: recipe?.nutrition?.ingredients.map((ingredient) => ingredient.name).join(' + '),
        captionSlot: recipe?.readyInMinutes ? recipe?.readyInMinutes + ' minutes' : 'unknown',
        actionSlot: <Button>Save</Button>,
        contentSlot: recipe?.nutrition?.nutrients?.find((nutrient) => nutrient.name === 'Calories')?.amount,
        key: recipe.id,
      }) as unknown as CardProps & { key: string },
  );
}

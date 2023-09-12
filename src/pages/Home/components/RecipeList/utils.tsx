import { Link } from 'react-router-dom';
import Button from 'components/Button';
import { CardProps } from 'components/Card';
import Text from 'components/Text';
import { IRecipeData } from 'configs/RecipeInterface';

type recipeProps = Pick<IRecipeData, 'id' | 'title' | 'readyInMinutes' | 'image' | 'nutrition'>;

export function mapper(data: Array<recipeProps>): CardProps[] {
  return data.map((recipe) => ({
    title: recipe.title,
    image: recipe.image,
    subtitle: recipe?.nutrition?.ingredients.map((ingredient) => ingredient.name).join(' + '),
    captionSlot: recipe?.readyInMinutes ? recipe?.readyInMinutes + ' minutes' : 'unknown',
    actionSlot: (
      <Link to={`/recipes/${recipe.id}`} style={{ textDecoration: 'none' }}>
        <Button>Details</Button>
      </Link>
    ),
    contentSlot: (
      <Text color="accent" maxLines={1}>
        {recipe?.nutrition?.nutrients?.find((nutrient) => nutrient.name === 'Calories')?.amount + ' kcal'}
      </Text>
    ),
    key: recipe.id,
  }));
}

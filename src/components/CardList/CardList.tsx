import * as React from 'react';
import { Link } from 'react-router-dom';
import Button from 'components/Button';
import Card from 'components/Card';
import Text from 'components/Text';
import { URLS } from 'configs/urls';
import { RecipeData } from 'types/RecipeData';

type CardListProps = {
  cardsData: RecipeData[];
};

export const CardList: React.FC<CardListProps> = ({ cardsData }) => {
  return (
    <>
      {cardsData.map((card) => (
        <Card
          title={card.title}
          image={card.image}
          subtitle={card?.nutrition?.ingredients.map((ingredient) => ingredient.name).join(' + ')}
          captionSlot={card?.readyInMinutes ? card?.readyInMinutes + ' minutes' : 'unknown'}
          actionSlot={
            <Link to={`${URLS.recipe + '/' + card.id}`} style={{ textDecoration: 'none' }}>
              <Button>Details</Button>
            </Link>
          }
          contentSlot={
            <Text color="accent" maxLines={1}>
              {card?.nutrition?.nutrients?.find((nutrient) => nutrient.name === 'Calories')?.amount + ' kcal'}
            </Text>
          }
          key={card.id.toString()}
        />
      ))}
    </>
  );
};

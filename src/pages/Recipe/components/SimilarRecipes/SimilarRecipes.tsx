import cn from 'classnames';
import * as React from 'react';
import { Link } from 'react-router-dom';
import plate from '@assets/plate.png';
import Button from '@components/Button';
import Card from '@components/Card';
import Text from '@components/Text';
import { urls } from '@configs/urls';
import { RecipeData } from '@customTypes/RecipeData';
import { TextViewType } from '@customTypes/common';
import styles from './styles.module.scss';

type SimilarRecipesProps = {
  recipes: RecipeData[];
  className?: string;
};
export const SimilarRecipes: React.FC<SimilarRecipesProps> = ({ recipes, className }) => {
  return (
    <>
      {recipes.length && (
        <section className={cn(className, styles['similar-section'])}>
          <Text view={TextViewType.p20} className={styles.title}>
            Similar recipes
          </Text>
          <div className={styles['card-list']}>
            {recipes.map((recipe) => (
              <Card
                key={recipe.id}
                title={recipe.title}
                image={plate}
                captionSlot={recipe?.readyInMinutes ? recipe?.readyInMinutes + ' minutes' : 'unknown'}
                actionSlot={
                  <Link to={urls.recipe.create(recipe.id)} style={{ textDecoration: 'none' }}>
                    <Button>Details</Button>
                  </Link>
                }
              ></Card>
            ))}
          </div>
        </section>
      )}
    </>
  );
};

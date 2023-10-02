import cn from 'classnames';
import { observer, useLocalStore } from 'mobx-react-lite';
import { useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { ErrorCp } from '@components/ErrorCp';
import Loader from '@components/Loader';
import { Lid } from '@components/icons/Lid';
import { SoupLaddle } from '@components/icons/SoupLaddle';
import { SizeType } from '@customTypes/common';
import RecipeStore from '@store/local/RecipeStore';
import { RecipeBasicInfo } from '../RecipeBasicInfo';
import { RecipeDescription } from '../RecipeDescription';
import { RecipeHeader } from '../RecipeHeader';
import { RecipeInstruction } from '../RecipeInstruction';
import { RecipePropertyList } from '../RecipePropertyList';
import { WinePairing } from '../WinePairing';
import styles from './styles.module.scss';

export const RecipeCard: React.FC = observer(() => {
  const { id: recipeId } = useParams();
  const recipeStore = useLocalStore(() => new RecipeStore());
  const { loading, recipeData: data, error } = recipeStore;

  useEffect(() => {
    recipeStore.fetchRecipeData(recipeId ?? '');
  }, [recipeId, recipeStore]);

  if (loading) {
    return (
      <div className={styles['loader-container']}>
        <Loader size={SizeType.l} className={styles.loader} />
      </div>
    );
  }

  if (error) {
    return <ErrorCp errorMessage={error} />;
  }

  return (
    <>
      {data && !loading && (
        <div className={styles.wrapper}>
          <RecipeHeader title={data.title} className={styles['wrapper-item']} />
          <RecipeBasicInfo
            className={cn(styles.section, styles['wrapper-item'])}
            image={data.image}
            preparationMinutes={data.preparationMinutes}
            readyInMinutes={data.readyInMinutes}
            cookingMinutes={data.cookingMinutes}
            aggregateLikes={data.aggregateLikes}
            servings={data.servings}
          />
          <RecipeDescription className={styles['wrapper-item']} description={data.summary} />

          <section className={cn(styles['composition-section'], styles['wrapper-item'])}>
            <RecipePropertyList
              title="Ingredients"
              properties={data.nutrition?.ingredients}
              className={styles['composition-section-part']}
            >
              <Lid className={styles.icon} />
            </RecipePropertyList>
            <RecipePropertyList
              title="Nutrients"
              properties={data.nutrition?.nutrients}
              className={styles['composition-section-part']}
            >
              <SoupLaddle className={styles.icon} />
            </RecipePropertyList>
          </section>
          <RecipeInstruction steps={data.analyzedInstructions?.[0]?.steps} className={styles['wrapper-item']} />
          <WinePairing pairedWines={data.winePairing.pairedWines} className={styles['wrapper-item']} />
        </div>
      )}
      {!data && loading && <>NO data</>}
    </>
  );
});

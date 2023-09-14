import axios, { AxiosError } from 'axios';
import * as cn from 'classnames';
import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { ErrorCp } from 'components/ErrorCp';
import Loader from 'components/Loader';
import { BASE_URL, API_KEY } from 'configs/constants';
import { RecipeData } from 'types/RecipeData';
import { SizeType } from 'types/common';
import { RecipeBasicInfo } from '../RecipeBasicInfo';
import { RecipeDescription } from '../RecipeDescription';
import { RecipeHeader } from '../RecipeHeader';
import { RecipeInstruction } from '../RecipeInstruction';
import { RecipePropertyList } from '../RecipePropertyList';
import styles from './styles.module.scss';

export const RecipeCard: React.FC = () => {
  const { id: recipeId } = useParams();

  const [loading, setLoading] = useState(false);
  const [data, setData] = useState<RecipeData | null>(null);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      try {
        const response = await axios.get(`${BASE_URL}/recipes/${recipeId}/information`, {
          params: {
            apiKey: API_KEY,
            includeNutrition: true,
          },
        });
        setData(response?.data);
        setLoading(false);
      } catch (error) {
        setLoading(false);
        if (error instanceof AxiosError) {
          setError(error.message);
        } else {
          setError('Unknown error occurred');
        }
      }
    };
    fetchData();
  }, [recipeId]);

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
            />
            <RecipePropertyList
              title="Nutrients"
              properties={data.nutrition?.nutrients}
              className={styles['composition-section-part']}
            />
          </section>
          <RecipeInstruction steps={data.analyzedInstructions?.[0]?.steps} className={styles['wrapper-item']} />
        </div>
      )}
      {!data && !loading && <>NO data</>}
    </>
  );
};

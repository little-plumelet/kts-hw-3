import axios, { AxiosError } from 'axios';
import { useEffect, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import Loader from 'components/Loader';
import Text from 'components/Text';
import ArrowDownIcon from 'components/icons/ArrowDownIcon';
import { BASE_URL, API_KEY } from 'configs/constants';
import { RecipeData } from 'types/RecipeData';
import styles from './styles.module.scss';

export const RecipeCard: React.FC = () => {
  const { id: recipeId } = useParams();

  const [loading, setLoading] = useState(false);
  const [data, setData] = useState<RecipeData | null>(null);

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
          throw Error(error.message);
        } else {
          throw Error('Unknown error occurred');
        }
      }
    };
    fetchData();
  }, [recipeId]);

  if (loading) {
    return (
      <div className={styles.loaderContainer}>
        <Loader size="l" className={styles.loader} />
      </div>
    );
  }

  return (
    <div className={styles.wrapper}>
      <section className={styles.recipeTitle}>
        <Link to={'..'} className={styles.recipeTitleLink}>
          <ArrowDownIcon className={styles.recipeTitleLinkIcon} color="accent" />
        </Link>
        <Text view="title">{data?.title}</Text>
      </section>
      <section className={styles.section}>
        <div className={styles.basicInfoWrapper}>
          <img src={data?.image} className={styles.image} />
        </div>
        <div className={styles.basicInfoWrapper}>
          <div className={styles.basicInfo}>
            <div className={styles.basicInfoSection}>
              <Text maxLines={1}>Preparation</Text>
              <Text maxLines={1} color="accent">
                {data?.preparationMinutes === -1 ? data?.readyInMinutes * 0.1 : data?.preparationMinutes} minutes
              </Text>
            </div>
            <div className={styles.basicInfoSection}>
              <Text maxLines={1}>Cooking</Text>
              <Text maxLines={1} color="accent">
                {data?.cookingMinutes === -1 ? data?.readyInMinutes * 0.9 : data?.cookingMinutes} minutes
              </Text>
            </div>
            <div className={styles.basicInfoSection}>
              <Text maxLines={1}>Total</Text>
              <Text maxLines={1} color="accent">
                {data?.readyInMinutes} minutes
              </Text>
            </div>
            <div className={styles.basicInfoSection}>
              <Text maxLines={1}>Rating</Text>
              <Text maxLines={1} color="accent">
                {data?.aggregateLikes} likes
              </Text>
            </div>
            <div className={styles.basicInfoSection}>
              <Text maxLines={1}>Serving</Text>
              <Text maxLines={1} color="accent">
                {data?.servings} servings
              </Text>
            </div>
          </div>
        </div>
      </section>
      <section>
        <div className={styles.description} dangerouslySetInnerHTML={{ __html: data?.summary }}></div>
      </section>

      <section className={styles.compositionSection}>
        <div className={styles.compositionSectionPart}>
          <Text view="p-20" className={styles.ingredientsTitle}>
            Ingredients
          </Text>
          <ul className={styles.ingredients}>
            {data?.nutrition?.ingredients?.map((ingredient) => (
              <li
                key={ingredient?.id}
                className={styles.ingredientsPoint}
              >{`${ingredient?.name} - ${ingredient?.amount} ${ingredient?.unit}`}</li>
            ))}
          </ul>
        </div>
        <div className={styles.compositionSectionPart}>
          <Text view="p-20" className={styles.nutrientsTitle}>
            Nutrients
          </Text>
          <ul className={styles.nutrients}>
            {data?.nutrition?.nutrients?.map((nutrient) => (
              <li
                key={nutrient?.name}
                className={styles.nutrientsPoint}
              >{`${nutrient?.name} - ${nutrient?.amount} ${nutrient?.unit}`}</li>
            ))}
          </ul>
        </div>
      </section>
      <section className={styles.instructionSection}>
        <Text view="p-20" className={styles.instructionsTitle}>
          Instructions
        </Text>
        <ul className={styles.instructions}>
          {data?.analyzedInstructions?.[0].steps?.map((step) => (
            <li key={step.number} className={styles.instructionsPoint}>
              <Text view="p-16" color="primary">
                Step {step.number}
              </Text>
              <p>{step?.step}</p>
            </li>
          ))}
        </ul>
      </section>
    </div>
  );
};

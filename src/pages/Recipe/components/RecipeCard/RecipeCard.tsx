import axios, { AxiosError } from 'axios';
import * as cn from 'classnames';
import { useEffect, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import Loader from 'components/Loader';
import Text from 'components/Text';
import ArrowDownIcon from 'components/icons/ArrowDownIcon';
import { BASE_URL, API_KEY } from 'configs/constants';
import { RecipeData } from 'types/RecipeData';
import { ColorType, SizeType, TextViewType } from 'types/common';
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
      <div className={styles['loader-container']}>
        <Loader size={SizeType.l} className={styles.loader} />
      </div>
    );
  }

  return (
    <div className={styles.wrapper}>
      <section className={cn(styles['recipe-title'], styles['wrapper-item'])}>
        <Link to={'..'} className={styles['recipe-title-link']}>
          <ArrowDownIcon className={styles['recipe-title-link-icon']} color={ColorType.accent} />
        </Link>
        <Text view={TextViewType.title}>{data?.title}</Text>
      </section>
      <section className={cn(styles.section, styles['wrapper-item'])}>
        <div className={styles['basic-info-wrapper']}>
          <img src={data?.image} className={styles.image} />
        </div>
        <div className={styles['basic-info-wrapper']}>
          <div className={styles['basic-info']}>
            <div className={styles['basic-info-section']}>
              <Text maxLines={1}>Preparation</Text>
              <Text maxLines={1} color={ColorType.accent}>
                {data?.preparationMinutes === -1 ? data?.readyInMinutes * 0.1 : data?.preparationMinutes} minutes
              </Text>
            </div>
            <div className={styles['basic-info-section']}>
              <Text maxLines={1}>Cooking</Text>
              <Text maxLines={1} color={ColorType.accent}>
                {data?.cookingMinutes === -1 ? data?.readyInMinutes * 0.9 : data?.cookingMinutes} minutes
              </Text>
            </div>
            <div className={styles['basic-info-section']}>
              <Text maxLines={1}>Total</Text>
              <Text maxLines={1} color={ColorType.accent}>
                {data?.readyInMinutes} minutes
              </Text>
            </div>
            <div className={styles['basic-info-section']}>
              <Text maxLines={1}>Rating</Text>
              <Text maxLines={1} color={ColorType.accent}>
                {data?.aggregateLikes} likes
              </Text>
            </div>
            <div className={styles['basic-info-section']}>
              <Text maxLines={1}>Serving</Text>
              <Text maxLines={1} color={ColorType.accent}>
                {data?.servings} servings
              </Text>
            </div>
          </div>
        </div>
      </section>
      <section className={styles['wrapper-item']}>
        <div className={styles.description} dangerouslySetInnerHTML={{ __html: data?.summary ?? '' }}></div>
      </section>

      <section className={cn(styles['composition-section'], styles['wrapper-item'])}>
        <div className={styles['composition-section-part']}>
          <Text view={TextViewType.p20} className={styles['ingredients-title']}>
            Ingredients
          </Text>
          <ul className={styles.ingredients}>
            {data?.nutrition?.ingredients?.map((ingredient) => (
              <li
                key={ingredient?.id}
                className={styles['ingredients-point']}
              >{`${ingredient?.name} - ${ingredient?.amount} ${ingredient?.unit}`}</li>
            ))}
          </ul>
        </div>
        <div className={styles['composition-section-part']}>
          <Text view={TextViewType.p20} className={styles['nutrients-title']}>
            Nutrients
          </Text>
          <ul className={styles.nutrients}>
            {data?.nutrition?.nutrients?.map((nutrient) => (
              <li
                key={nutrient?.name}
                className={styles['nutrients-point']}
              >{`${nutrient?.name} - ${nutrient?.amount} ${nutrient?.unit}`}</li>
            ))}
          </ul>
        </div>
      </section>
      <section className={cn(styles['instruction-section'], styles['wrapper-item'])}>
        <Text view={TextViewType.p20} className={styles['instructions-title']}>
          Instructions
        </Text>
        <ul className={styles.instructions}>
          {data?.analyzedInstructions?.[0].steps?.map((step) => (
            <li key={step.number} className={styles['instructions-point']}>
              <Text view={TextViewType.p16} color={ColorType.primary}>
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

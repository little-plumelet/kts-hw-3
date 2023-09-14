import * as cn from 'classnames';
import * as React from 'react';
import Text from 'components/Text';
import { ColorType } from 'types/common';
import styles from './styles.module.scss';

type RecipeBasicInfoProps = {
  image: string;
  preparationMinutes: number;
  readyInMinutes: number;
  cookingMinutes: number;
  aggregateLikes: number;
  servings: number;
  className?: string;
};

export const RecipeBasicInfo: React.FC<RecipeBasicInfoProps> = ({
  image,
  preparationMinutes,
  readyInMinutes,
  cookingMinutes,
  aggregateLikes,
  servings,
  className,
}) => {
  return (
    <section className={cn(styles.section, className)}>
      <div className={styles['basic-info-wrapper']}>
        <img src={image} className={styles.image} />
      </div>
      <div className={styles['basic-info-wrapper']}>
        <div className={styles['basic-info']}>
          <div className={styles['basic-info-section']}>
            <Text maxLines={1}>Preparation</Text>
            <Text maxLines={1} color={ColorType.accent}>
              {preparationMinutes === -1 ? readyInMinutes * 0.1 : preparationMinutes} minutes
            </Text>
          </div>
          <div className={styles['basic-info-section']}>
            <Text maxLines={1}>Cooking</Text>
            <Text maxLines={1} color={ColorType.accent}>
              {cookingMinutes === -1 ? readyInMinutes * 0.9 : cookingMinutes} minutes
            </Text>
          </div>
          <div className={styles['basic-info-section']}>
            <Text maxLines={1}>Total</Text>
            <Text maxLines={1} color={ColorType.accent}>
              {readyInMinutes} minutes
            </Text>
          </div>
          <div className={styles['basic-info-section']}>
            <Text maxLines={1}>Rating</Text>
            <Text maxLines={1} color={ColorType.accent}>
              {aggregateLikes} likes
            </Text>
          </div>
          <div className={styles['basic-info-section']}>
            <Text maxLines={1}>Serving</Text>
            <Text maxLines={1} color={ColorType.accent}>
              {servings} servings
            </Text>
          </div>
        </div>
      </div>
    </section>
  );
};

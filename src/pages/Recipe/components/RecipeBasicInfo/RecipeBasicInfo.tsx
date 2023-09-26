import cn from 'classnames';
import * as React from 'react';
import { BasicInfoSection } from '../BasicInfoSection';
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
          <BasicInfoSection
            title="Preparation"
            subtitle={`${preparationMinutes === -1 ? readyInMinutes * 0.1 : preparationMinutes} minutes`}
            maxLines={1}
          />
          <BasicInfoSection
            title="Cooking"
            subtitle={`${cookingMinutes === -1 ? readyInMinutes * 0.9 : cookingMinutes} minutes`}
            maxLines={1}
          />
          <BasicInfoSection title="Total" subtitle={`${readyInMinutes} minutes`} maxLines={1} />
          <BasicInfoSection title="Rating" subtitle={`${aggregateLikes} likes`} maxLines={1} />
          <BasicInfoSection title="Serving" subtitle={`${servings} servings`} maxLines={1} />
        </div>
      </div>
    </section>
  );
};

import * as React from 'react';
import Text from '@components/Text';
import { Ingerdient, Nutrient } from '@customTypes/RecipeData';
import { TextViewType } from '@customTypes/common';
import styles from './styles.module.scss';

type RecipePropertyListProps = {
  title: string;
  properties: Nutrient[] | Ingerdient[];
  className?: string;
  children?: React.ReactNode;
};

export const RecipePropertyList: React.FC<RecipePropertyListProps> = ({ title, properties, className, children }) => {
  return (
    <div className={className}>
      <Text view={TextViewType.p20} className={styles.title}>
        {title}
      </Text>
      <ul className={styles.properties}>
        {properties.map((property) => (
          <li key={'id' in property ? property?.id : property?.name} className={styles['properties-point']}>
            {children} {` ${property?.name} - ${property?.amount} ${property?.unit}`}
          </li>
        ))}
      </ul>
    </div>
  );
};

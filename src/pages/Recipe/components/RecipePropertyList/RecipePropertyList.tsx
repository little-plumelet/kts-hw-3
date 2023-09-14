import * as React from 'react';
import Text from 'components/Text';
import { Ingerdient, Nutrient } from 'types/RecipeData';
import { TextViewType } from 'types/common';
import styles from './styles.module.scss';

type RecipePropertyListProps = {
  title: string;
  properties: Nutrient[] | Ingerdient[];
  className?: string;
};

export const RecipePropertyList: React.FC<RecipePropertyListProps> = ({ title, properties, className }) => {
  return (
    <div className={className}>
      <Text view={TextViewType.p20} className={styles.title}>
        {title}
      </Text>
      <ul className={styles.properties}>
        {properties.map((property) => (
          <li
            key={'id' in property ? property?.id : property?.name}
            className={styles['properties-point']}
          >{`${property?.name} - ${property?.amount} ${property?.unit}`}</li>
        ))}
      </ul>
    </div>
  );
};
